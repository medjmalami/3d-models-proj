import { Trash2 } from 'lucide-react';
import { Model3D } from '../../types/models';
import { ModelImagePlaceholder } from './ModelImagePlaceholder';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ModelCardProps {
  model: Model3D;
  isAdmin: boolean;
  onDelete: (id: string) => void;
}

export const ModelCard = ({ model, isAdmin, onDelete }: ModelCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg sm:text-xl">{model.name}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {model.category}
            </CardDescription>
          </div>
          {isAdmin && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(model.id)}
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ModelImagePlaceholder category={model.category} />
        <p className="mt-2 text-xs sm:text-sm text-gray-600">
          {model.description}
        </p>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-gray-400">
        Added: {model.dateAdded}
      </CardFooter>
    </Card>
  );
};