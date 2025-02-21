import { useState } from 'react';
import { Model3D, ModelCategory } from '../types/models';
import { INITIAL_MODELS } from '../data/initialData';
import { useToast } from '@/hooks/use-toast';

export const useModels = () => {
  const [models, setModels] = useState<Model3D[]>(INITIAL_MODELS);
  const [selectedCategory, setSelectedCategory] = useState<ModelCategory | 'all'>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newModel, setNewModel] = useState<Partial<Model3D>>({
    name: '',
    description: '',
    category: 'mobs',
    modelUrl: '',
  });
  
  const { toast } = useToast();

  // Filter models by selected category
  const filteredModels = selectedCategory === 'all' 
    ? models 
    : models.filter(model => model.category === selectedCategory);

  // Delete model handler
  const handleDeleteModel = (id: string) => {
    setModels(models.filter(model => model.id !== id));
    toast({
      title: "Model deleted",
      description: "The model has been permanently removed",
    });
  };

  // Add new model handler
  const handleAddModel = () => {
    const newModelComplete: Model3D = {
      id: Date.now().toString(),
      name: newModel.name || 'Untitled Model',
      description: newModel.description || 'No description provided',
      category: newModel.category as ModelCategory || 'miscellaneous',
      modelUrl: newModel.modelUrl || '/models/placeholder.glb',
      thumbnailUrl: '/thumbnails/placeholder.png',
      dateAdded: new Date().toISOString().split('T')[0]
    };
    
    setModels([...models, newModelComplete]);
    setShowAddDialog(false);
    setNewModel({
      name: '',
      description: '',
      category: 'mobs',
      modelUrl: '',
    });
    
    toast({
      title: "Model added",
      description: `${newModelComplete.name} has been added to your collection`,
    });
  };

  return {
    models,
    setModels,
    filteredModels,
    selectedCategory,
    setSelectedCategory,
    showAddDialog,
    setShowAddDialog,
    newModel,
    setNewModel,
    handleDeleteModel,
    handleAddModel
  };
};