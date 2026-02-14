
export interface Message {
  role: 'user' | 'model';
  text: string;
  groundingLinks?: GroundingLink[];
  timestamp: Date;
}

export interface GroundingLink {
  title: string;
  uri: string;
  coordinates?: { lat: number; lng: number };
}

export interface Location {
  lat: number;
  lng: number;
  name?: string;
}

export interface Destination {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
}
