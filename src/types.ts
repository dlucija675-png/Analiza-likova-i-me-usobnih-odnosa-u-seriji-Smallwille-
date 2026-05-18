
export interface Person {
  id: string;
  name: string;
  role?: string;
  group?: string; // Used for clustering/coloring
  imageUrl?: string;
  appearsIn?: number[]; // Seasons they appear in, e.g., [1, 2, 3]
}

export interface Connection {
  source: string;
  target: string;
  type?: string; // e.g., "suradnik", "prijatelj", "obitelj"
  strength?: number;
  seasons?: number[]; // Seasons this connection is active
}

export interface NetworkData {
  nodes: Person[];
  links: Connection[];
}
