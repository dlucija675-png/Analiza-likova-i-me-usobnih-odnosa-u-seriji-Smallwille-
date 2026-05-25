import { Person, Connection } from '../types';

export interface CentralityResult {
  nodeId: string;
  degree: number;
  normalizedDegree: number;
  closeness: number;
  betweenness: number;
}

/**
 * Calculates centrality metrics for an undirected, unweighted graph.
 * Handles disconnected components where standard closeness would fail by using component-local closeness.
 */
export function calculateCentrality(nodes: Person[], links: Connection[]): Record<string, CentralityResult> {
  const nodeIds = nodes.map(n => n.id);
  const N = nodes.length;

  // Initialize results
  const results: Record<string, CentralityResult> = {};
  for (const n of nodes) {
    results[n.id] = {
      nodeId: n.id,
      degree: 0,
      normalizedDegree: 0,
      closeness: 0,
      betweenness: 0,
    };
  }

  if (N <= 1) return results;

  // Build Adjacency List for undirected representation
  const adj: Record<string, string[]> = {};
  for (const id of nodeIds) adj[id] = [];

  for (const link of links) {
    const sId = typeof link.source === 'string' ? link.source : (link.source as any).id;
    const tId = typeof link.target === 'string' ? link.target : (link.target as any).id;
    
    if (adj[sId] && adj[tId] && sId !== tId) {
      // Avoid duplicate parallel links in adjacency list
      if (!adj[sId].includes(tId)) adj[sId].push(tId);
      if (!adj[tId].includes(sId)) adj[tId].push(sId);
    }
  }

  // 1. Degree Centrality
  for (const id of nodeIds) {
    const deg = adj[id].length;
    results[id].degree = deg;
    results[id].normalizedDegree = N > 1 ? deg / (N - 1) : 0;
  }

  // 2. Closeness Centrality using BFS for each node
  for (const start of nodeIds) {
    const dist: Record<string, number> = {};
    for (const id of nodeIds) dist[id] = -1;
    dist[start] = 0;

    const queue: string[] = [start];
    let head = 0;
    while (head < queue.length) {
      const curr = queue[head++];
      for (const neighbor of adj[curr]) {
        if (dist[neighbor] === -1) {
          dist[neighbor] = dist[curr] + 1;
          queue.push(neighbor);
        }
      }
    }

    let reachableCount = 0;
    let sumOfDistances = 0;
    for (const id of nodeIds) {
      if (id !== start && dist[id] > 0) {
        reachableCount++;
        sumOfDistances += dist[id];
      }
    }

    // Wasserman-Faust normalization for disconnected graphs
    if (sumOfDistances > 0 && N > 1) {
      const rawCloseness = reachableCount / sumOfDistances;
      const factor = reachableCount / (N - 1);
      results[start].closeness = rawCloseness * factor;
    } else {
      results[start].closeness = 0;
    }
  }

  // 3. Betweenness Centrality using Brandes' Algorithm (Undirected)
  const betweenness: Record<string, number> = {};
  for (const id of nodeIds) betweenness[id] = 0;

  for (const s of nodeIds) {
    const S: string[] = [];
    const P: Record<string, string[]> = {};
    const sigma: Record<string, number> = {};
    const d: Record<string, number> = {};

    for (const id of nodeIds) {
      P[id] = [];
      sigma[id] = 0;
      d[id] = -1;
    }

    sigma[s] = 1;
    d[s] = 0;

    const Q: string[] = [s];
    let head = 0;
    while (head < Q.length) {
      const v = Q[head++];
      S.push(v);
      for (const w of adj[v]) {
        // Path discovery
        if (d[w] < 0) {
          d[w] = d[v] + 1;
          Q.push(w);
        }
        // Path counting
        if (d[w] === d[v] + 1) {
          sigma[w] += sigma[v];
          P[w].push(v);
        }
      }
    }

    // Accumulation of dependency
    const delta: Record<string, number> = {};
    for (const id of nodeIds) delta[id] = 0;

    while (S.length > 0) {
      const w = S.pop()!;
      for (const v of P[w]) {
        delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]);
      }
      if (w !== s) {
        betweenness[w] += delta[w];
      }
    }
  }

  // For undirected graphs, betweenness values are halved to avoid double counting paths (s -> t and t -> s)
  // Also normalize relative to maximum possible value (N-1)*(N-2)/2 if applicable
  const scaleFactor = (N > 2) ? (N - 1) * (N - 2) / 2 : 1;
  for (const id of nodeIds) {
    const rawBetweenness = betweenness[id] / 2;
    results[id].betweenness = rawBetweenness; // Keep raw for display
  }

  return results;
}
