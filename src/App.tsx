import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Share2, 
  UserPlus, 
  Link as LinkIcon, 
  Trash2, 
  Settings2,
  Maximize2,
  Minimize2,
  Info,
  BarChart3,
  Network,
  Activity,
  Award,
  Sliders,
  Sparkles,
  Shield,
  UserCheck
} from 'lucide-react';
import { initialData } from './initialData';
import { Person, Connection, NetworkData, ConnectionCategory } from './types';
import { MermaidChart } from './components/MermaidChart';
import { CharacterPortrait } from './components/CharacterPortrait';
import { calculateCentrality, CentralityResult } from './utils/centrality';

export default function App() {
  const [data, setData] = useState<NetworkData>(initialData);
  
  // Dynamic Era & Season selection
  const [selectedEra, setSelectedEra] = useState<'all' | 'highschool' | 'transition' | 'dailyplanet'>('all');
  const [currentSeason, setCurrentSeason] = useState(10);
  const [singleSeasonMode, setSingleSeasonMode] = useState(false); // Default: show entire Era merged

  // Simulation Controls (Gravity)
  const [nodeRepulsion, setNodeRepulsion] = useState(-350);
  const [linkDistance, setLinkDistance] = useState(70);
  const [gravityStrength, setGravityStrength] = useState(0.12);

  // Layout & UI views
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Person | null>(null);
  const [view, setView] = useState<'graph' | 'charts' | 'metrics'>('graph');
  const graphRef = useRef<any>();

  // Hover Highlight State
  const [hoverNode, setHoverNode] = useState<any>(null);
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set());
  const [highlightLinks, setHighlightLinks] = useState<Set<any>>(new Set());

  // Form states to Add Node
  const [searchQuery, setSearchQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newGroup, setNewGroup] = useState('Friends');
  const [newOrigin, setNewOrigin] = useState<'Čovek' | 'Kriptonac' | 'UI' | 'Kiborg' | 'Klon' | 'Kometni mutant'>('Čovek');
  const [newMorality, setNewMorality] = useState<'Heroj' | 'Anti-heroj' | 'Negativac' | 'Neutralan'>('Heroj');
  const [newActor, setNewActor] = useState('');

  // Form states to Add Link
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [newLinkType, setNewLinkType] = useState('Prijatelji');
  const [newLinkCategory, setNewLinkCategory] = useState<ConnectionCategory>('Prijateljstvo');
  const [newLinkStrength, setNewLinkStrength] = useState(2);

  // Active season range based on Era
  const activeSeasonRange = useMemo(() => {
    if (singleSeasonMode) {
      return [currentSeason];
    }
    switch (selectedEra) {
      case 'highschool': return [1, 2, 3, 4];
      case 'transition': return [5, 6, 7];
      case 'dailyplanet': return [8, 9, 10];
      case 'all':
      default: return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
  }, [selectedEra, currentSeason, singleSeasonMode]);

  // Restructure nodes and links dynamically
  const seasonalData = useMemo(() => {
    const visibleNodes = data.nodes.filter(n => {
      if (!n.appearsIn) return true;
      return n.appearsIn.some(s => activeSeasonRange.includes(s));
    });
    
    const nodeIds = new Set(visibleNodes.map(n => n.id));
    
    const visibleLinks = data.links.filter(l => {
      const sId = typeof l.source === 'string' ? l.source : (l.source as any).id;
      const tId = typeof l.target === 'string' ? l.target : (l.target as any).id;
      const hasSeasonOverlap = !l.seasons || l.seasons.some(s => activeSeasonRange.includes(s));
      return hasSeasonOverlap && nodeIds.has(sId) && nodeIds.has(tId);
    });

    return {
      nodes: visibleNodes,
      links: visibleLinks
    };
  }, [data, activeSeasonRange]);

  // Compute metrics in real-time
  const centralityMetrics = useMemo(() => {
    return calculateCentrality(seasonalData.nodes, seasonalData.links);
  }, [seasonalData]);

  // Adjust forces on changes
  useEffect(() => {
    if (graphRef.current) {
      const fg = graphRef.current;
      fg.d3Force('charge').strength(nodeRepulsion);
      fg.d3Force('link').distance(linkDistance);
      fg.d3Force('center').strength(gravityStrength);
      fg.d3ReheatSimulation();
    }
  }, [nodeRepulsion, linkDistance, gravityStrength, seasonalData]);

  const filteredNodes = useMemo(() => {
    if (!searchQuery) return seasonalData.nodes;
    return seasonalData.nodes.filter(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [seasonalData.nodes, searchQuery]);

  // Compute Adjacent highlights
  const handleNodeHover = useCallback((node: any) => {
    const nodes = new Set<string>();
    const links = new Set<any>();

    if (node) {
      nodes.add(node.id);
      seasonalData.links.forEach((link: any) => {
        const sId = typeof link.source === 'string' ? link.source : link.source.id;
        const tId = typeof link.target === 'string' ? link.target : link.target.id;
        if (sId === node.id) {
          nodes.add(tId);
          links.add(link);
        } else if (tId === node.id) {
          nodes.add(sId);
          links.add(link);
        }
      });
    }

    setHoverNode(node);
    setHighlightNodes(nodes);
    setHighlightLinks(links);
  }, [seasonalData]);

  // Actions
  const addPerson = () => {
    if (!newName) return;
    const newNodeId = Math.random().toString(36).substr(2, 9);
    const newNode: Person = {
      id: newNodeId,
      name: newName,
      group: newGroup,
      origin: newOrigin,
      morality: newMorality,
      actor: newActor || 'Nepoznat glumac',
      appearsIn: activeSeasonRange
    };
    setData(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
    setNewName('');
    setNewActor('');
  };

  const addLink = () => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    const newLink: Connection = {
      source: sourceId,
      target: targetId,
      type: newLinkType,
      category: newLinkCategory,
      strength: newLinkStrength,
      seasons: activeSeasonRange
    };
    setData(prev => ({
      ...prev,
      links: [...prev.links, newLink]
    }));
    setSourceId('');
    setTargetId('');
    setNewLinkType('Prijatelji');
  };

  const removeNode = (id: string) => {
    setData(prev => ({
      nodes: prev.nodes.filter(n => n.id !== id),
      links: prev.links.filter(l => 
        (typeof l.source === 'string' ? l.source : (l.source as any).id) !== id && 
        (typeof l.target === 'string' ? l.target : (l.target as any).id) !== id
      )
    }));
    if (selectedNode?.id === id) setSelectedNode(null);
  };

  const handleNodeClick = useCallback((node: any) => {
    const person = data.nodes.find(n => n.id === node.id);
    if (person) setSelectedNode(person);
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 400);
      graphRef.current.zoom(3.5, 400);
    }
  }, [data.nodes]);

  const resetZoom = () => {
    if (graphRef.current) {
      graphRef.current.zoomToFit(400);
    }
  };

  const getGroupColor = (group: string) => {
    switch (group) {
      case 'Kents': return '#fbbf24'; // Gold
      case 'Luthors': return '#10b981'; // Green
      case 'Friends': return '#3b82f6'; // Blue
      case 'Justice League': return '#ef4444'; // Red
      case 'Kryptonians': return '#8b5cf6'; // Purple
      default: return '#94a3b8';
    }
  };

  const getMoralityColor = (morality: string) => {
    switch (morality) {
      case 'Heroj': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Anti-heroj': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Negativac': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-neutral-400 bg-neutral-500/10 border-neutral-500/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Prijateljstvo': return '#3b82f6';
      case 'Obitelj': return '#fbbf24';
      case 'Rivalstvo': return '#f97316';
      case 'Savez': return '#10b981';
      case 'Neprijateljstvo': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  // Generate Leaderboard items
  const leaderboard = useMemo(() => {
    return Object.keys(centralityMetrics)
      .map(key => {
        const m = centralityMetrics[key];
        const char = data.nodes.find(n => n.id === m.nodeId);
        return {
          nodeId: m.nodeId,
          degree: m.degree,
          normalizedDegree: m.normalizedDegree,
          closeness: m.closeness,
          betweenness: m.betweenness,
          name: char ? char.name : 'Unknown',
          group: char ? char.group : 'Other',
          origin: char ? char.origin : 'Čovek'
        };
      })
      .sort((a, b) => b.degree - a.degree);
  }, [centralityMetrics, data]);

  return (
    <div className="flex h-screen w-full bg-black overflow-hidden font-sans text-neutral-200 antialiased">
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -350, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -350, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 180 }}
            className="w-80 h-full border-r border-neutral-800 bg-neutral-950/95 backdrop-blur-xl z-20 flex flex-col flex-shrink-0"
          >
            {/* Header banner */}
            <div className="relative h-32 overflow-hidden flex-shrink-0">
              <img 
                src="/src/assets/images/smallville_cast_hero_1779108589498.png" 
                alt="Smallville Cast" 
                className="w-full h-full object-cover opacity-60 filter saturate-50 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30">
                  <span className="text-white font-black text-lg italic">S</span>
                </div>
                <div>
                  <h1 className="text-sm font-black tracking-widest text-neutral-50">SMALLVILLE</h1>
                  <span className="text-[9px] text-blue-400 uppercase tracking-widest font-bold">Watchtower analitika</span>
                </div>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-neutral-400 hover:text-white transition-colors backdrop-blur-sm border border-neutral-800 shadow-md"
                id="close-sidebar"
              >
                <Minimize2 size={14} />
              </button>
            </div>

            {/* Navigation tabs */}
            <div className="flex border-b border-neutral-800 bg-neutral-950 flex-shrink-0">
              <button 
                onClick={() => setView('graph')}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${view === 'graph' ? 'text-blue-500 border-b border-blue-500 bg-blue-500/5' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                <Network size={14} />
                Mreža
              </button>
              <button 
                onClick={() => setView('metrics')}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${view === 'metrics' ? 'text-blue-500 border-b border-blue-500 bg-blue-500/5' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                <Activity size={14} />
                Metrike
              </button>
              <button 
                onClick={() => setView('charts')}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${view === 'charts' ? 'text-blue-500 border-b border-blue-500 bg-blue-500/5' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                <BarChart3 size={14} />
                Dijagrami
              </button>
            </div>

            {/* Content area based on tab */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-neutral-800">
              {view === 'graph' && (
                <>
                  {/* Search */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Opća pretraga</label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Traži lika (npr. Clark)..."
                      className="w-full bg-neutral-900/60 border border-neutral-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-all text-neutral-200 placeholder-neutral-600"
                      id="search-input"
                    />
                  </div>

                  {/* Predefined Eras selector */}
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Odabir Razdoblja Serije</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'all', label: 'Sve Sezone' },
                        { id: 'highschool', label: 'Srednja Škola (S1-S4)' },
                        { id: 'transition', label: 'Metropolis (S5-S7)' },
                        { id: 'dailyplanet', label: 'Savez Heroja (S8-S10)' }
                      ].map(era => (
                        <button
                          key={era.id}
                          onClick={() => {
                            setSelectedEra(era.id as any);
                            setSingleSeasonMode(false);
                            // Set suitable default representative season
                            if (era.id === 'highschool') setCurrentSeason(3);
                            else if (era.id === 'transition') setCurrentSeason(6);
                            else if (era.id === 'dailyplanet') setCurrentSeason(9);
                            else setCurrentSeason(10);
                          }}
                          className={`p-2.5 rounded-xl border text-[10px] font-medium text-left leading-tight transition-all uppercase tracking-tight ${selectedEra === era.id && !singleSeasonMode ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/5' : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'}`}
                        >
                          {era.label}
                        </button>
                      ))}
                    </div>

                    {/* Quick fine season pills inside era */}
                    <div className="bg-neutral-950 p-2 rounded-xl border border-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-neutral-500 uppercase">Pojedinačna sezona</span>
                        <button 
                          onClick={() => setSingleSeasonMode(!singleSeasonMode)}
                          className={`text-[8px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded border ${singleSeasonMode ? 'bg-blue-600 border-blue-500 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400'}`}
                        >
                          {singleSeasonMode ? "Aktivno" : "Isključeno"}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(selectedEra === 'highschool' ? [1,2,3,4] : selectedEra === 'transition' ? [5,6,7] : selectedEra === 'dailyplanet' ? [8,9,10] : [1,2,3,4,5,6,7,8,9,10]).map(s => (
                          <button
                            key={s}
                            onClick={() => {
                              setCurrentSeason(s);
                              setSingleSeasonMode(true);
                            }}
                            className={`w-7 h-7 text-[10px] font-black rounded-lg border transition-all ${singleSeasonMode && currentSeason === s ? 'bg-blue-500 text-white border-blue-400' : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border-neutral-800'}`}
                          >
                            S{s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Physics Simulation controls */}
                  <div className="bg-neutral-900/30 p-3 rounded-xl border border-neutral-800 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                      <Sliders size={12} className="text-blue-500" />
                      Gravitacijska Simulacija
                    </div>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold text-neutral-500">
                          <span>Odbijanje čvorova</span>
                          <span>{nodeRepulsion}</span>
                        </div>
                        <input
                          type="range"
                          min="-1000"
                          max="-50"
                          step="50"
                          value={nodeRepulsion}
                          onChange={(e) => setNodeRepulsion(parseInt(e.target.value))}
                          className="w-full h-1 bg-neutral-800 rounded accent-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold text-neutral-500">
                          <span>Udaljenost veza</span>
                          <span>{linkDistance}px</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="200"
                          step="5"
                          value={linkDistance}
                          onChange={(e) => setLinkDistance(parseInt(e.target.value))}
                          className="w-full h-1 bg-neutral-800 rounded accent-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Add Person */}
                  <div className="bg-neutral-900/30 p-3 rounded-xl border border-neutral-800 space-y-2.5">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                      <UserPlus size={12} className="text-blue-500" />
                      Dodaj Osobu u Mrežu
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Ime i prezime lika"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500 text-neutral-200"
                      />
                      <input
                        type="text"
                        value={newActor}
                        onChange={(e) => setNewActor(e.target.value)}
                        placeholder="Ime glumca"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500 text-neutral-200"
                      />
                      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                        <div>
                          <label className="text-[8px] text-neutral-500 uppercase block mb-1">Pripadnost</label>
                          <select
                            value={newGroup}
                            onChange={(e) => setNewGroup(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-1 py-1 focus:outline-none text-neutral-200"
                          >
                            <option value="Friends">Friends</option>
                            <option value="Kents">Kents</option>
                            <option value="Luthors">Luthors</option>
                            <option value="Justice League">Justice League</option>
                            <option value="Kryptonians">Kryptonians</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[8px] text-neutral-500 uppercase block mb-1">Vrsta / Podrijetlo</label>
                          <select
                            value={newOrigin}
                            onChange={(e) => setNewOrigin(e.target.value as any)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-1 py-1 focus:outline-none text-neutral-200"
                          >
                            <option value="Čovek">Čovek</option>
                            <option value="Kriptonac">Kriptonac</option>
                            <option value="UI">UI / Robot</option>
                            <option value="Kiborg">Kiborg</option>
                            <option value="Klon">Klon</option>
                            <option value="Kometni mutant">Kometni mutant</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[8px] text-neutral-500 uppercase block">Moralno usmjerenje</label>
                        <div className="grid grid-cols-4 gap-1 text-[9px] font-bold text-center">
                          {['Heroj', 'Anti-heroj', 'Negativac', 'Neutralan'].map(m => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setNewMorality(m as any)}
                              className={`py-1 border rounded transition-all ${newMorality === m ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-neutral-900 border-neutral-800 text-neutral-500'}`}
                            >
                              {m.split('-')[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={addPerson}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded-lg text-xs transition-colors shadow-lg shadow-blue-900/25"
                      >
                        Potvrdi i dodaj
                      </button>
                    </div>
                  </div>

                  {/* Add Connection */}
                  <div className="bg-neutral-900/30 p-3 rounded-xl border border-neutral-800 space-y-2.5">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                      <LinkIcon size={12} className="text-blue-500" />
                      Poveži Ljude (Veza)
                    </div>
                    <div className="space-y-2">
                      <select
                        value={sourceId}
                        onChange={(e) => setSourceId(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none text-neutral-200"
                      >
                        <option value="">Početni lik</option>
                        {seasonalData.nodes.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                      </select>
                      <select
                        value={targetId}
                        onChange={(e) => setTargetId(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none text-neutral-200"
                      >
                        <option value="">Ciljni lik</option>
                        {seasonalData.nodes.filter(n => n.id !== sourceId).map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                      </select>
                      <input
                        type="text"
                        value={newLinkType}
                        onChange={(e) => setNewLinkType(e.target.value)}
                        placeholder="Npr. Partneri u borbi, Otac"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500 text-neutral-200"
                      />
                      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                        <div>
                          <label className="text-[8px] text-neutral-500 uppercase block mb-1">Kategorija</label>
                          <select
                            value={newLinkCategory}
                            onChange={(e) => setNewLinkCategory(e.target.value as any)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-1 py-1 focus:outline-none text-neutral-200"
                          >
                            <option value="Prijateljstvo">Prijateljstvo</option>
                            <option value="Obitelj">Obitelj</option>
                            <option value="Savez">Savez</option>
                            <option value="Rivalstvo">Rivalstvo</option>
                            <option value="Neprijateljstvo">Neprijateljstvo</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[8px] text-neutral-500 uppercase block mb-1">Snaga odnosa</label>
                          <select
                            value={newLinkStrength}
                            onChange={(e) => setNewLinkStrength(parseInt(e.target.value))}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-1 py-1 focus:outline-none text-neutral-200"
                          >
                            <option value="1">1 (Udaljeno/Slaba)</option>
                            <option value="2">2 (Umjerena)</option>
                            <option value="3">3 (Čvrsta)</option>
                            <option value="4">4 (Neraskidiva / Ključna)</option>
                          </select>
                        </div>
                      </div>
                      <button
                        onClick={addLink}
                        className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-1.5 rounded-lg text-xs transition-colors border border-neutral-750"
                      >
                        Uspostavi vezu
                      </button>
                    </div>
                  </div>

                  {/* Nodes list */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                      <span>Lista Ljudi ({filteredNodes.length})</span>
                    </div>
                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                      {filteredNodes.map(node => (
                        <div
                          key={node.id}
                          onClick={() => {
                            setSelectedNode(node);
                          }}
                          className="flex items-center justify-between p-2 rounded-xl bg-neutral-900/40 border border-neutral-850 hover:border-neutral-700 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-1.5 h-1.5 rounded-full" 
                              style={{ backgroundColor: getGroupColor(node.group || '') }} 
                            />
                            <div>
                              <div className="text-xs font-bold text-neutral-200">{node.name}</div>
                              <div className="text-[9px] text-neutral-500 uppercase tracking-wider">{node.group} • {node.origin}</div>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNode(node.id);
                            }}
                            className="text-neutral-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1 rounded"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {view === 'metrics' && (
                <div className="space-y-4">
                  <div className="bg-neutral-900/40 border border-neutral-800 p-3 rounded-xl space-y-1.5">
                    <h4 className="text-xs font-black uppercase tracking-widest text-blue-400">Izračunate Metrike</h4>
                    <p className="text-[10px] text-neutral-500 leading-relaxed">
                      Slijedeći mrežni deskriptori kalkuliraju se uživo na temelju trenutnog grafičkog prikaza (filtriranog razdoblja).
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Utjecajni Lideri (Degree)</div>
                    <div className="space-y-2.5">
                      {leaderboard.slice(0, 6).map((item, idx) => (
                        <div 
                          key={item.nodeId}
                          onClick={() => {
                            const found = data.nodes.find(n => n.id === item.nodeId);
                            if (found) setSelectedNode(found);
                          }}
                          className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-850 hover:border-neutral-750 cursor-pointer transition-all space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] text-yellow-500 font-extrabold">#{idx + 1}</span>
                              <span className="text-xs font-bold text-neutral-100">{item.name}</span>
                            </div>
                            <span className="text-[10px] font-black text-blue-500 italic bg-blue-500/10 px-1.5 py-0.5 rounded">
                              {item.degree} veza
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-[9px] text-neutral-400 font-medium">
                            <span className="truncate">Bliskost (Closeness): {item.closeness.toFixed(2)}</span>
                            <span className="truncate">Između (Betweenness): {item.betweenness.toFixed(1)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {view === 'charts' && (
                <div className="flex flex-col items-center justify-center h-48 text-neutral-600 space-y-2 opacity-50">
                  <BarChart3 size={32} />
                  <span className="text-xs font-medium uppercase tracking-widest text-center leading-tight">
                    Pregledajte mermaid dijagrame<br />u glavnom modulu.
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-neutral-800 text-[9px] text-neutral-500 flex items-center justify-between bg-neutral-950 flex-shrink-0">
              <span className="font-bold">AKTIVNI ČVOROVI: {seasonalData.nodes.length}</span>
              <div className="flex items-center gap-1 font-mono">
                <Settings2 size={10} />
                WATCHTOWER OS V2.0
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative bg-black h-full overflow-hidden flex flex-col">
        {view === 'graph' ? (
          <>
            {/* Top Toolbar overlay */}
            <div className="absolute top-6 left-6 z-10 flex gap-2">
              {!sidebarOpen && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSidebarOpen(true)}
                  className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-blue-500 hover:bg-neutral-800 transition-all shadow-xl"
                  id="open-sidebar"
                >
                  <Maximize2 size={18} />
                </motion.button>
              )}
              <button
                onClick={resetZoom}
                className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all shadow-xl"
                title="Resetiraj Zoom"
                id="reset-zoom"
              >
                <Maximize2 size={18} className="rotate-45" />
              </button>
            </div>

            {/* Character Info Panel Overlay (Confidential Watchtower File) */}
            <AnimatePresence>
              {selectedNode && (() => {
                const metrics = centralityMetrics[selectedNode.id] || { degree: 0, closeness: 0, betweenness: 0, normalizedDegree: 0 };
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 15, x: '-50%' }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-neutral-950/95 backdrop-blur-xl border-2 border-neutral-800 p-5 rounded-2xl shadow-2xl w-full max-w-sm border-t-blue-500"
                  >
                    <div className="flex items-start gap-4">
                      {/* Stylized vector portrait badge */}
                      <CharacterPortrait id={selectedNode.id} name={selectedNode.name} group={selectedNode.group || 'Friends'} size="md" />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-black text-neutral-50 truncate leading-tight tracking-tight">
                            {selectedNode.name}
                          </h3>
                          <button 
                            onClick={() => setSelectedNode(null)} 
                            className="text-neutral-500 hover:text-neutral-300 transition-colors p-1"
                          >
                            <Minimize2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-blue-400 font-bold truncate tracking-tight">{selectedNode.role || 'Bez opisane uloge'}</p>
                        
                        <div className="mt-1 flex flex-wrap gap-1">
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase tracking-widest font-black">
                            {selectedNode.origin}
                          </span>
                          <span className={`text-[8px] px-1.5 py-0.5 rounded border uppercase tracking-widest font-black ${getMoralityColor(selectedNode.morality)}`}>
                            {selectedNode.morality}
                          </span>
                        </div>
                        
                        <div className="mt-2 text-[9px] text-neutral-500 font-medium">
                          Glumac: <span className="text-neutral-300 font-bold">{selectedNode.actor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Centrality metrics with progress meters */}
                    <div className="mt-4 border-t border-neutral-900 pt-3 space-y-2">
                      <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Activity size={10} className="text-blue-500" />
                        Analitička snaga čvora
                      </div>
                      
                      {/* Degree Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-neutral-400 font-bold">
                          <span>Broj direktnih veza (Degree)</span>
                          <span className="text-blue-400 font-black">{metrics.degree}</span>
                        </div>
                        <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                            style={{ width: `${Math.min(100, (metrics.degree / 12) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Closeness Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-neutral-400 font-bold">
                          <span>Mrežna bliskost (Closeness CL)</span>
                          <span className="text-emerald-400 font-black">{metrics.closeness.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                            style={{ width: `${Math.min(100, metrics.closeness * 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Betweenness Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-neutral-400 font-bold">
                          <span>Kontrola protoka (Betweenness BT)</span>
                          <span className="text-purple-400 font-black">{metrics.betweenness.toFixed(1)}</span>
                        </div>
                        <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-purple-500 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                            style={{ width: `${Math.min(100, (metrics.betweenness / 15) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Legend card */}
            <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-4 rounded-xl shadow-2xl">
              <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Info size={12} className="text-blue-500" />
                Interaktivni Savezi
              </div>
              {[
                { label: 'Obitelj Kent', color: '#fbbf24', group: 'Kents' },
                { label: 'Obitelj Luthor', color: '#10b981', group: 'Luthors' },
                { label: 'Prijatelji i javnost', color: '#3b82f6', group: 'Friends' },
                { label: 'Liga Pravde', color: '#ef4444', group: 'Justice League' },
                { label: 'Kriptonci / Villains', color: '#8b5cf6', group: 'Kryptonians' }
              ].map(item => (
                <div key={item.group} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}bb` }} />
                  <span className="text-[11px] text-neutral-300 font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Force directed Canvas element */}
            <div className="absolute inset-0 cursor-crosshair">
              <ForceGraph2D
                ref={graphRef}
                graphData={seasonalData}
                nodeLabel="name"
                nodeRelSize={7}
                nodeVal={d => (d.group === 'Kents' || d.group === 'Luthors') ? 3.5 : 2.5}
                nodeAutoColorBy="group"
                linkLabel={d => `${(d as any).type || ''} (${(d as any).category})`}
                linkDirectionalParticles={2}
                linkDirectionalParticleSpeed={d => (d as any).strength * 0.012 || 0.015}
                linkWidth={link => {
                  const sId = typeof link.source === 'string' ? link.source : (link.source as any).id;
                  const tId = typeof link.target === 'string' ? link.target : (link.target as any).id;
                  const isHighlighted = highlightLinks.has(link) || selectedNode?.id === sId || selectedNode?.id === tId;
                  
                  if (highlightLinks.size > 0 && !isHighlighted) return 0.5;
                  return ((link as any).strength || 1.5) + 0.5;
                }}
                linkColor={link => {
                  const sId = typeof link.source === 'string' ? link.source : (link.source as any).id;
                  const tId = typeof link.target === 'string' ? link.target : (link.target as any).id;
                  const isHighlighted = highlightLinks.has(link) || selectedNode?.id === sId || selectedNode?.id === tId;
                  
                  if (highlightLinks.size > 0 && !isHighlighted) return 'rgba(63, 63, 70, 0.15)';
                  return getCategoryColor((link as any).category || '');
                }}
                backgroundColor="#000000"
                onNodeClick={handleNodeClick}
                onNodeHover={handleNodeHover}
                nodeCanvasObject={(node, ctx, globalScale) => {
                  const label = node.name as string;
                  const fontSize = 13 / globalScale;
                  const groupColor = getGroupColor((node as any).group);
                  
                  const isSelected = selectedNode?.id === node.id;
                  const isHighlighted = highlightNodes.size === 0 || highlightNodes.has(node.id);

                  ctx.font = `600 ${fontSize}px Inter`;
                  const textWidth = ctx.measureText(label).width;

                  // Dim node if another is highlighted
                  const opacity = isHighlighted ? 1.0 : 0.15;

                  // Highlighting or selected ring glow
                  if (isSelected || hoverNode?.id === node.id) {
                    ctx.beginPath();
                    ctx.arc(node.x!, node.y!, 9, 0, 2 * Math.PI, false);
                    ctx.fillStyle = isSelected ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255,255,255,0.2)';
                    ctx.fill();
                    ctx.strokeStyle = isSelected ? '#3b82f6' : 'white';
                    ctx.lineWidth = 1.5 / globalScale;
                    ctx.stroke();
                  }

                  // Node Circle core
                  ctx.shadowColor = groupColor;
                  ctx.shadowBlur = (isSelected ? 20 : 10) / globalScale;
                  ctx.beginPath();
                  ctx.arc(node.x!, node.y!, isSelected ? 8 : 5.5, 0, 2 * Math.PI, false);
                  ctx.fillStyle = `rgba(${parseInt(groupColor.slice(1,3), 16)}, ${parseInt(groupColor.slice(3,5), 16)}, ${parseInt(groupColor.slice(5,7), 16)}, ${opacity})`;
                  ctx.fill();
                  ctx.shadowBlur = 0; // Turn off shadows for labels

                  // Pill metadata box under
                  const pillHeight = fontSize * 1.5;
                  const pillWidth = textWidth + fontSize;
                  ctx.fillStyle = `rgba(10, 10, 10, ${isSelected ? 0.95 : 0.75})`;
                  ctx.beginPath();
                  ctx.roundRect(node.x! - pillWidth / 2, node.y! + 12, pillWidth, pillHeight, 6);
                  ctx.fill();
                  ctx.strokeStyle = `rgba(${parseInt(groupColor.slice(1,3), 16)}, ${parseInt(groupColor.slice(3,5), 16)}, ${parseInt(groupColor.slice(5,7), 16)}, ${opacity})`;
                  ctx.lineWidth = 1 / globalScale;
                  ctx.stroke();

                  // Character Text label
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillStyle = isHighlighted ? 'white' : 'rgba(163, 163, 163, 0.15)';
                  ctx.fillText(label, node.x!, node.y! + 12 + pillHeight / 2);
                }}
                nodePointerAreaPaint={(node, color, ctx) => {
                  ctx.fillStyle = color;
                  ctx.beginPath();
                  ctx.arc(node.x!, node.y!, 7, 0, 2 * Math.PI, false);
                  ctx.fill();
                }}
              />
            </div>

            {/* Current Season Floating Box */}
            <div className="absolute bottom-10 right-10 z-10 w-80 bg-neutral-950/90 backdrop-blur-xl border border-neutral-800 p-4 rounded-2xl shadow-2xl space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] font-black italic shadow">S</div>
                  <span className="text-[11px] font-black tracking-wider text-neutral-400 uppercase">Sezonska kronika</span>
                </div>
                <span className="text-lg font-black text-blue-400 italic">
                  {singleSeasonMode ? `SEZONA ${currentSeason}` : "INTEGRIRANO ERA"}
                </span>
              </div>

              {!singleSeasonMode ? (
                <div className="text-[10px] text-neutral-400 font-bold bg-blue-500/5 border border-blue-500/10 p-2.5 rounded-xl leading-relaxed">
                  Prikazan je zbroj svih odnosa i likova aktivnih u odabranom razdoblju:
                  <span className="block mt-1 text-blue-300 font-extrabold text-[11px]">
                    {selectedEra === 'highschool' && "Srednja škola (1-4) - Clark čuva tajnu, Lex istražuje."}
                    {selectedEra === 'transition' && "Metropolis tranzicija (5-7) - Uspon tvrđave i pad Lexa."}
                    {selectedEra === 'dailyplanet' && "Daily Planet i savez (8-10) - Formiranje Lige Pravde i Zod."}
                    {selectedEra === 'all' && "Cjelokupna Smallville serija (Sezone 1-10)"}
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative h-2 flex items-center">
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={currentSeason} 
                      onChange={(e) => {
                        setCurrentSeason(parseInt(e.target.value));
                        setSingleSeasonMode(true);
                      }}
                      className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-neutral-500 font-extrabold px-1">
                    <span>S1</span>
                    <span>S3</span>
                    <span>S5</span>
                    <span>S7</span>
                    <span>S10</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 bg-neutral-900/60 p-2.5 rounded-xl leading-relaxed">
                    {currentSeason <= 4 && `Razdoblje Srednje Škole (S${currentSeason}): Clark otkriva podrijetlo i rješava probleme inficirane meteorima.`}
                    {currentSeason > 4 && currentSeason <= 7 && `Razdoblje Metropolis tranzicije (S${currentSeason}): Početak rada u Daily Planetu, dolazak Lois i optužbe.`}
                    {currentSeason > 7 && `Savez Heroja i Liga Pravde (S${currentSeason}): Formiranje Watchtowera, Clark postaje The Blur.`}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : view === 'charts' ? (
          <div className="h-full overflow-y-auto p-12 space-y-12 bg-neutral-950">
            <header className="max-w-4xl mx-auto space-y-2 border-b border-neutral-900 pb-5">
              <h2 className="text-3xl font-black text-white tracking-widest uppercase italic">Mrežna Evolucija i Protok Savjeta</h2>
              <p className="text-xs text-neutral-400">Vizualne sheme i dijagrami koji predočuju evoluciju Clarkovog mrežnog utjecaja.</p>
            </header>

            <div className="max-w-4xl mx-auto space-y-16">
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500 border border-red-500/20">
                    <Share2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Metamorfoza duela Kent vs Luthor</h3>
                    <p className="text-xs text-neutral-400">Prijelomne točke u kojima se mijenja topologija saveza.</p>
                  </div>
                </div>
                <MermaidChart chart={`
                  graph LR
                      A[Prijateljstvo u Smallvilleu] -- Sumnje i Istraga --> B(Rastuća Opsesija)
                      B -- Clarkova tajna šutnja --> C{Prijelomna Točka S5}
                      C -- Izdaja --> D[Smrtonosni Rivali S6-S7]
                      C -- LuthorCorp Nasljeđe --> E[Lexov pad u bezdan]
                      D -- Znanstveni eksperiment --> F[Luthor dinastija i klonovi]
                `} />
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider font-sans">Konfiguracija i Hijerarhija Lige</h3>
                    <p className="text-xs text-neutral-400">Podjela odgovornosti i krovni centar Watchtower.</p>
                  </div>
                </div>
                <MermaidChart chart={`
                  graph TD
                      JL((Liga Pravde - S8-S10)) --> L[Strateško Liderstvo]
                      JL --> M[Borbeni operativci]
                      JL --> S[Tehnička inteligencija]

                      L --> CK[Clark Kent / The Blur]
                      L --> OQ[Oliver Queen / Green Arrow]

                      M --> AC[Aquaman]
                      M --> VS[Cyborg]
                      M --> BA[Impulse]

                      S --> CS[Chloe Sullivan / Watchtower]
                `} />
              </section>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-12 space-y-12 bg-neutral-950">
            <header className="max-w-4xl mx-auto space-y-2 border-b border-neutral-900 pb-5">
              <h2 className="text-3xl font-black text-white tracking-widest uppercase italic">Mrežna Centralnost i Rang Lidera</h2>
              <p className="text-xs text-neutral-400">Analitička ljestvica i raspodjela utjecaja na temelju odabranog vremenskog razdoblja.</p>
            </header>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-neutral-900/40 p-5 rounded-2xl border border-neutral-800 space-y-3">
                <h3 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                  <Award size={18} className="text-yellow-500" />
                  Mrežni Poredak (Rang Lista)
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Svaki puta kada promijenite sezonu ili povijesno razdoblje u lijevom izborniku, grafička mreža se mijenja a s njom i ove vrijednosti. 
                  Sustav dynamic-BFS Brandes mjeri tri glavne ljestvice centralnosti.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Degree Leaderboard card */}
                <div className="bg-neutral-900/20 p-4 border border-neutral-850 rounded-xl space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 border-b border-neutral-850 pb-2 flex items-center justify-between">
                    <span>Stupanj (Degree)</span>
                    <span className="text-[10px] text-neutral-500.">Veze</span>
                  </h4>
                  <div className="space-y-3">
                    {leaderboard.slice(0, 10).map((n, idx) => (
                      <div key={n.nodeId} className="flex items-center justify-between text-xs font-medium">
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px] text-neutral-500">#{idx+1}</span>
                          <span className="text-neutral-200 truncate">{n.name}</span>
                        </div>
                        <span className="text-[11px] text-blue-400 font-extrabold">{n.degree}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Closeness Leaderboard card */}
                <div className="bg-neutral-900/20 p-4 border border-neutral-850 rounded-xl space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 border-b border-neutral-850 pb-2 flex items-center justify-between">
                    <span>Bliskost (Closeness)</span>
                    <span className="text-[10px] text-neutral-500.">Clout</span>
                  </h4>
                  <div className="space-y-3">
                    {[...leaderboard].sort((a,b)=>b.closeness - a.closeness).slice(0, 10).map((n, idx) => (
                      <div key={n.nodeId} className="flex items-center justify-between text-xs font-medium">
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px] text-neutral-500">#{idx+1}</span>
                          <span className="text-neutral-200 truncate">{n.name}</span>
                        </div>
                        <span className="text-[11px] text-emerald-400 font-extrabold">{n.closeness.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Betweenness Leaderboard card */}
                <div className="bg-neutral-900/20 p-4 border border-neutral-850 rounded-xl space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-purple-400 border-b border-neutral-850 pb-2 flex items-center justify-between">
                    <span>između (Betweenness)</span>
                    <span className="text-[10px] text-neutral-500.">Control</span>
                  </h4>
                  <div className="space-y-3">
                    {[...leaderboard].sort((a,b)=>b.betweenness - a.betweenness).slice(0, 10).map((n, idx) => (
                      <div key={n.nodeId} className="flex items-center justify-between text-xs font-medium">
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px] text-neutral-500">#{idx+1}</span>
                          <span className="text-neutral-200 truncate">{n.name}</span>
                        </div>
                        <span className="text-[11px] text-purple-400 font-extrabold">{n.betweenness.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
