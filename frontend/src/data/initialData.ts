import { Model3D } from '../types/models';

export const INITIAL_MODELS: Model3D[] = [
  {
    id: '1',
    name: 'Creeper',
    description: 'Classic Minecraft creeper mob',
    category: 'mobs',
    modelUrl: '/models/creeper.glb',
    dateAdded: '2025-02-19'
  },
  {
    id: '2',
    name: 'Enchanted Sword',
    description: 'Powerful diamond sword with enchantments',
    category: 'sword',
    modelUrl: '/models/sword.glb',
    dateAdded: '2025-02-18'
  },
  {
    id: '3',
    name: 'Wizard Hat',
    description: 'Magical wizard hat with stars',
    category: 'hats',
    modelUrl: '/models/hat.glb',
    dateAdded: '2025-02-17'
  }
];