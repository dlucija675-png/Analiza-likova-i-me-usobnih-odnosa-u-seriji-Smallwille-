import React, { useState, useMemo, useCallback, useRef } from 'react';
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
  Info
} from 'lucide-react';
import { initialData } from './initialData';
import { Person, Connection, NetworkData } from './types';

export default function App() {
  const [data, setData] = useState<NetworkData>(initialData);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Person | null>(null);
  const graphRef = useRef<any>();

  // Add person state
  const [searchQuery, setSearchQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newGroup, setNewGroup] = useState('');

  // Add connection state
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');

  const filteredNodes = useMemo(() => {
    if (!searchQuery) return data.nodes;
    return data.nodes.filter(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [data.nodes, searchQuery]);

  const addPerson = () => {
    if (!newName) return;
    const newNode: Person = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      group: newGroup || 'Default'
    };
    setData(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
    setNewName('');
  };

  const addLink = () => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    const newLink: Connection = {
      source: sourceId,
      target: targetId,
      strength: 1
    };
    setData(prev => ({
      ...prev,
      links: [...prev.links, newLink]
    }));
    setSourceId('');
    setTargetId('');
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
    setSelectedNode(node);
    // Center at node
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 400);
      graphRef.current.zoom(4, 400);
    }
  }, []);

  const resetZoom = () => {
    if (graphRef.current) {
      graphRef.current.zoomToFit(400);
    }
  };

  const getGroupColor = (group: string) => {
    switch (group) {
      case 'Kents': return '#fbbf24'; // Gold/Yellow
      case 'Luthors': return '#10b981'; // Green/Emerald (Kryptonite)
      case 'Friends': return '#3b82f6'; // Blue
      case 'Justice League': return '#ef4444'; // Red
      case 'Kryptonians': return '#8b5cf6'; // Purple
      default: return '#94a3b8';
    }
  };

  return (
    <div className="flex h-screen w-full bg-black overflow-hidden font-sans">
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-80 h-full border-r border-neutral-800 bg-neutral-950/80 backdrop-blur-xl z-20 flex flex-col"
          >
            <div className="relative h-40 overflow-hidden">
              <img 
                src="/src/assets/images/smallville_cartoon_hero_1779109056949.png" 
                alt="Smallville Cartoon" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-red-600 rounded flex items-center justify-center shadow-lg shadow-red-500/20">
                  <span className="text-white font-black text-xl italic">S</span>
                </div>
                <h1 className="text-xl font-black tracking-tighter text-white">SMALLVILLE</h1>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-neutral-400 hover:text-white transition-colors backdrop-blur-sm shadow-xl"
                id="close-sidebar"
              >
                <Minimize2 size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Search */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                  <Maximize2 size={14} className="rotate-45" />
                  Pretraži
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Traži lika (npr. Clark)..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  id="search-input"
                />
              </section>

              {/* Add Person */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                  <UserPlus size={14} />
                  Dodaj Osobu
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ime i prezime"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    id="input-name"
                  />
                  <input
                    type="text"
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value)}
                    placeholder="Grupa / Cluster"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    id="input-group"
                  />
                  <button
                    onClick={addPerson}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg text-sm transition-colors shadow-lg shadow-blue-900/20"
                    id="btn-add-person"
                  >
                    Dodaj u mapu
                  </button>
                </div>
              </section>

              {/* Add Connection */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                  <LinkIcon size={14} />
                  Poveži Ljude
                </div>
                <div className="space-y-2">
                  <select
                    value={sourceId}
                    onChange={(e) => setSourceId(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none"
                    id="select-source"
                  >
                    <option value="">Odaberi prvu osobu</option>
                    {data.nodes.map(n => <option key={n.id} value={n.id}>{n.name} ({n.group})</option>)}
                  </select>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none"
                    id="select-target"
                  >
                    <option value="">Odaberi drugu osobu</option>
                    {data.nodes.filter(n => n.id !== sourceId).map(n => <option key={n.id} value={n.id}>{n.name} ({n.group})</option>)}
                  </select>
                  <button
                    onClick={addLink}
                    className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2 rounded-lg text-sm transition-colors border border-neutral-700"
                    id="btn-add-link"
                  >
                    Stvori vezu
                  </button>
                </div>
              </section>

              {/* Node List */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                  <Users size={14} />
                  Lista Ljudi ({filteredNodes.length})
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {filteredNodes.map(node => (
                    <motion.div
                      layout
                      key={node.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/50 border border-neutral-800 group"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate text-neutral-200">{node.name}</div>
                        <div className="text-[10px] text-neutral-500 uppercase tracking-tighter">{node.group}</div>
                      </div>
                      <button 
                        onClick={() => removeNode(node.id)}
                        className="text-neutral-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        id={`delete-${node.id}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            <div className="p-6 border-t border-neutral-800 text-[10px] text-neutral-500 flex items-center justify-between">
              <span>VEZE: {data.links.length}</span>
              <div className="flex items-center gap-1">
                <Settings2 size={10} />
                V1.0.4 - BETA
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Graph Area */}
      <main className="flex-1 relative bg-black">
        <div className="absolute top-6 left-6 z-10 flex gap-2">
          {!sidebarOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setSidebarOpen(true)}
              className="p-3 bg-neutral-900 border border-neutral-800 rounded-full text-blue-500 hover:bg-neutral-800 transition-colors shadow-2xl"
              id="open-sidebar"
            >
              <Maximize2 size={20} />
            </motion.button>
          )}
          <button
            onClick={resetZoom}
            className="p-3 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shadow-2xl"
            title="Resetiraj Zoom"
            id="reset-zoom"
          >
            <Maximize2 size={20} className="rotate-45" />
          </button>
        </div>

        {/* Floating Info */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-neutral-900/90 backdrop-blur border border-neutral-700 p-4 rounded-2xl shadow-2xl min-w-64 max-w-sm flex items-start gap-4"
          >
            <div 
              className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: `hsl(${parseInt(selectedNode.id) * 45 % 360}, 70%, 50%)` }}
            >
              {selectedNode.name[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white leading-tight">{selectedNode.name}</h3>
                <button onClick={() => setSelectedNode(null)} className="text-neutral-500 hover:text-white">
                  <Minimize2 size={16} />
                </button>
              </div>
              <p className="text-neutral-400 text-sm mt-1">{selectedNode.role || 'Bez opisane uloge'}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-widest font-bold">
                  {selectedNode.group}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 bg-neutral-950/80 backdrop-blur border border-neutral-800 p-4 rounded-xl shadow-2xl">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Info size={12} />
            Legenda Klastera
          </div>
          {[
            { label: 'Obitelj Kent', color: '#fbbf24', group: 'Kents' },
            { label: 'Obitelj Luthor', color: '#10b981', group: 'Luthors' },
            { label: 'Prijatelji', color: '#3b82f6', group: 'Friends' },
            { label: 'Justice League', color: '#ef4444', group: 'Justice League' },
            { label: 'Kriptonci', color: '#8b5cf6', group: 'Kryptonians' }
          ].map(item => (
            <div key={item.group} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}80` }} />
              <span className="text-xs text-neutral-300 font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 cursor-crosshair">
          <ForceGraph2D
            ref={graphRef}
            graphData={data}
            nodeLabel="name"
            nodeRelSize={6}
            nodeVal={d => (d.group === 'Kents' || d.group === 'Luthors') ? 2.5 : 1.5}
            nodeAutoColorBy="group"
            linkLabel={d => (d as any).type || ''}
            linkDirectionalParticles={1}
            linkDirectionalParticleSpeed={d => (d as any).strength * 0.01 || 0.01}
            linkWidth={d => (d as any).strength || 1}
            linkColor={d => 'rgba(255, 255, 255, 0.2)'}
            backgroundColor="#000000"
            onNodeClick={handleNodeClick}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.name as string;
              const fontSize = 14/globalScale;
              const groupColor = getGroupColor((node as any).group);
              
              ctx.font = `${fontSize}px Inter`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.4);

              // Node Shadow/Glow
              ctx.shadowColor = groupColor;
              ctx.shadowBlur = 15 / globalScale;

              // Node circle
              ctx.beginPath();
              ctx.arc(node.x!, node.y!, 6, 0, 2 * Math.PI, false);
              ctx.fillStyle = groupColor;
              ctx.fill();
              
              // Reset shadow for text
              ctx.shadowBlur = 0;

              // Text Background (Pill shape)
              const pillHeight = fontSize * 1.5;
              const pillWidth = textWidth + fontSize;
              ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
              ctx.beginPath();
              ctx.roundRect(node.x! - pillWidth / 2, node.y! + 10, pillWidth, pillHeight, 5);
              ctx.fill();
              ctx.strokeStyle = groupColor;
              ctx.lineWidth = 1/globalScale;
              ctx.stroke();

              // Text
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = 'white';
              ctx.fontWeight = '600';
              ctx.fillText(label, node.x!, node.y! + 10 + pillHeight/2);
            }}
            nodePointerAreaPaint={(node, color, ctx) => {
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(node.x!, node.y!, 5, 0, 2 * Math.PI, false);
              ctx.fill();
            }}
          />
        </div>
      </main>
    </div>
  );
}
