export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  color: string;
  season: Season[];
  occasion: Occasion[];
  imageUrl: string;
  favorite: boolean;
  lastWorn?: Date;
}

export interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
  occasion: Occasion[];
  season: Season[];
  favorite: boolean;
  lastWorn?: Date;
  planned?: Date;
}

export type ClothingCategory = 
  | 'tops' 
  | 'bottoms' 
  | 'dresses' 
  | 'outerwear' 
  | 'shoes' 
  | 'accessories';

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export type Occasion = 
  | 'casual' 
  | 'formal' 
  | 'business' 
  | 'workout' 
  | 'special';

export interface CalendarEvent {
  date: Date;
  outfit: Outfit;
}