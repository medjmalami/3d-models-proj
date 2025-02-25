import { useState } from 'react';
import { Model3D, ModelCategory } from '../types/models';
import { useToast } from '@/hooks/use-toast';
import { modelApi } from '@/services/api';
import { useEffect } from 'react';
import { uploadReq } from '../types/models';

export const useModels = () => {
  const [models, setModels] = useState<Model3D[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ModelCategory | 'all'>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newModel, setNewModel] = useState<Partial<Model3D>>({
    name: '',
    description: '',
    category: 'mobs',
    modelUrl: '',
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await modelApi.getAllModels();
        setModels(data.models);
      } catch (err) {
        toast({
          title: "Error loading models",
          variant: "destructive",
        });
      } 
    };
    fetchModels();
  }, []);

  // Filter models by selected category
  const filteredModels = selectedCategory === 'all' 
    ? models 
    : models.filter(model => model.category === selectedCategory);

  // Delete model handler
  const handleDeleteModel = (id: string) => {
    const deleteModel = async () => {
      try {
        await modelApi.deleteModel(id);
        setModels(models.filter(model => model.id !== id));
        toast({
          title: "Model deleted",
          description: "The model has been permanently removed",
        });
      } catch (err) {
        toast({
          title: "Error deleting model",
          variant: "destructive",
        });
      }
    };
    
    deleteModel();

    toast({
      title: "Model deleted",
      description: "The model has been permanently removed",
    });
  };

  // Add new model handler
  const handleAddModel = (modelData: FormData) => {
    const addModel = async () => {
      try {
        const data = await modelApi.uploadModel(modelData);
        setModels([...models, data.model]);
        setShowAddDialog(false);
        setNewModel({
          name: '',
          description: '',
          category: 'mobs',
          modelUrl: '',
        });
        toast({
          title: "Model added",
          description: `${data.model.name} has been added to your collection`,
        });
      } catch (err) {
        toast({
          title: "Error adding model",
          variant: "destructive",
        });
      }
    }
    addModel();
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