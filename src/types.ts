export interface Person {
  id: string;
  name: string;
  role?: string;
  group?: string; // Used for clustering/coloring
  origin: 'Čovek' | 'Kriptonac' | 'UI' | 'Kiborg' | 'Klon' | 'Kometni mutant'; // Kind/Origin
  morality: 'Heroj' | 'Anti-heroj' | 'Negativac' | 'Neutralan'; // Morality
  actor: string; // Actor names
  appearsIn?: number[]; // Seasons they appear in, e.g., [1, 2, ..., 10]
  imageUrl?: string;
}

export type ConnectionCategory = 'Prijateljstvo' | 'Obitelj' | 'Rivalstvo' | 'Savez' | 'Neprijateljstvo';

export interface Connection {
  source: string;
  target: string;
  type?: string; // Descriptive type (e.g. "Romance", "Arhneuz")
  category: ConnectionCategory; // Structural category
  strength: number; // 1 to 4
  seasons: number[]; // Seasons this connection is active
}

export interface NetworkData {
  nodes: Person[];
  links: Connection[];
}

export interface CentralityMetrics {
  degree: number;
  normalizedDegree: number;
  closeness: number;
  betweenness: number;
}
