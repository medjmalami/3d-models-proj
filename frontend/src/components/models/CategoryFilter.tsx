import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ModelCategory, ALL_CATEGORIES } from '../../types/models';

interface CategoryFilterProps {
  selectedCategory: ModelCategory | 'all';
  setSelectedCategory: (category: ModelCategory | 'all') => void;
}

export const CategoryFilter = ({ selectedCategory, setSelectedCategory }: CategoryFilterProps) => {
  return (
    <div className="w-full sm:w-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-0 sm:mr-4">Models</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            <span className="truncate">Category: {selectedCategory}</span>
            <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
            All Categories
          </DropdownMenuItem>
          {ALL_CATEGORIES.map((category) => (
            <DropdownMenuItem 
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};