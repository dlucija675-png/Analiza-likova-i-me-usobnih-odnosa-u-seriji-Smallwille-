
export interface Person {
  id: string;
  name: string;
  role?: string;
  group?: string; // Used for clustering/coloring
  imageUrl?: string;
}

export interface Connection {
  source: string;
  target: string;
  type?: string; // e.g., "suradnik", "prijatelj", "obitelj"
  strength?: number;
}

export interface NetworkData {
  nodes: Person[];
  links: Connection[];
}
