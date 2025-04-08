export type ModelCategory = 
  | 'mobs'
  | 'food'
  | 'weapon'
  | 'armor'
  | 'misc'


export interface Model3D {
  id: string;
  name: string;
  description: string;
  category: ModelCategory;
  modelUrl: string;
  dateAdded: string;
}

export const ALL_CATEGORIES: ModelCategory[] = [
  'mobs', 'food', 'weapon', 'armor', 'misc'
];

export interface uploadReq{
  modelFile: File,
  modelName: string,
  category: ModelCategory,
  description: string
}