import { useState, useEffect, useRef } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { Model3D } from '../../types/models';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ModelCardProps {
  model: Model3D;
  isAdmin: boolean;
  onDelete: (id: string) => void;
}

export const ModelCard = ({ model, isAdmin, onDelete }: ModelCardProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const modelViewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Add event listeners to model-viewer if it exists
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      const handleLoad = () => {
        setModelLoaded(true);
        setModelError(false);
      };

      const handleError = (event: Event) => {
        console.error('Error loading model:', model.name, event);
        setModelError(true);
        setModelLoaded(false);
      };

      modelViewer.addEventListener('load', handleLoad);
      modelViewer.addEventListener('error', handleError);

      return () => {
        modelViewer.removeEventListener('load', handleLoad);
        modelViewer.removeEventListener('error', handleError);
      };
    }
  }, [model.modelUrl, model.name]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(model.id);
    } catch (error) {
      console.error('Error deleting model:', error);
      // If there's an error, we need to reset the deleting state
      setIsDeleting(false);
      // Keep the dialog open in case of error
      return;
    }
    // Close the dialog after successful deletion
    setShowDeleteConfirm(false);
    // Reset the deleting state
    setIsDeleting(false);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{model.name}</CardTitle>
        <CardDescription>{model.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        {/* 3D Model Viewer Container */}
        <div className="w-full h-48 bg-gray-100 rounded-md mb-3 relative">
          {!modelLoaded && !modelError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-sm text-gray-500 flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Loading model...
              </div>
            </div>
          )}

          {modelError && (
            <div className="absolute inset-0 flex items-center justify-center flex-col p-4">
              <div className="text-sm text-red-500 mb-2">Error loading model</div>
              <div className="text-xs text-gray-500 text-center">{model.modelUrl}</div>
            </div>
          )}

          {/* Make the model-viewer visibility conditional on loading state */}
          <model-viewer
            ref={modelViewerRef}
            src={model.modelUrl}
            alt={`3D model of ${model.name}`}
            auto-rotate
            camera-controls
            shadow-intensity="1"
            style={{ 
              width: '100%', 
              height: '100%',
              visibility: modelLoaded ? 'visible' : 'hidden' 
            }}
          ></model-viewer>
        </div>
        <p className="text-sm text-gray-600">{model.description}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Added: {new Date(model.dateAdded).toLocaleDateString()}
        </span>
        
        {isAdmin && (
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
      
      {/* Delete Confirmation */}
      <AlertDialog 
        open={showDeleteConfirm} 
        onOpenChange={(open) => {
          // Only allow closing if not currently deleting
          if (!isDeleting) {
            setShowDeleteConfirm(open);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the model "{model.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};