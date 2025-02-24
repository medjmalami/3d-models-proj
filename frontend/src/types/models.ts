export type ModelCategory = 
  | 'mobs'
  | 'guns'
  | 'wands/staffs'
  | 'sword'
  | 'hats'
  | 'backpack'
  | 'fourniture'
  | 'miscellaneous'
  | 'vehicules'
  | 'prefix'
  | 'brooms'
  | 'decorations'
  | 'herbology'
  | 'food'
  | 'logos'
  | 'bundle'
  | 'bundle-gamer';

export interface Model3D {
  id: string;
  name: string;
  description: string;
  category: ModelCategory;
  modelUrl: string;
  dateAdded: string;
}

export const ALL_CATEGORIES: ModelCategory[] = [
  'mobs', 'guns', 'wands/staffs', 'sword', 'hats', 'backpack', 
  'fourniture', 'miscellaneous', 'vehicules', 'prefix', 'brooms', 
  'decorations', 'herbology', 'food', 'logos', 'bundle', 'bundle-gamer'
];