import { Image } from 'lucide-react';
import { ModelCategory } from '../../types/models';

export const ModelImagePlaceholder = ({ category }: { category: ModelCategory }) => {
  // Generate a color based on category
  const getColorForCategory = (cat: ModelCategory) => {
    const colors = {
      'mobs': '#5d8a68',      // Green for creatures
      'armor': '#8a5d5d',      // Red for weapons
      'weapon': '#8a7c5d',     // Brown for weapons
      'food': '#5d7c8a',      // Blue for wearables
      'misc': '#8a5d7c',  // Purple for wearables
      'default': '#6b6b6b'    // Gray default
    };
    
    return colors[cat as keyof typeof colors] || colors.default;
  };
  
  return (
    <div 
      className="w-full h-48 md:h-64 rounded-md flex items-center justify-center bg-gray-100 overflow-hidden"
      style={{ backgroundColor: getColorForCategory(category) + '33' }} // Adding transparency
    >
      <div className="flex flex-col items-center text-gray-500">
        <Image className="w-12 h-12 mb-2 opacity-50" />
        <p className="text-sm">{category} model</p>
      </div>
    </div>
  );
};