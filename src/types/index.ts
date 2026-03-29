export interface Bakery {
  id: string;
  name: string;
  address: string;
  arrondissement: number;
  coordinates: [number, number]; // [lat, lng]
  description: string;
  tags: string[];
  website?: string;
  phone?: string;
  openingHours?: string;
}

export type FilterState = {
  arrondissement: number | null;
  searchQuery: string;
};
