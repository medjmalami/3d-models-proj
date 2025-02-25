import { useState } from 'react';
import { Model3D, ModelCategory } from '../types/models';
import { useToast } from '@/hooks/use-toast';
import { modelApi } from '@/services/api';
import { useEffect } from 'react';

// Base URL for model files
const API_BASE_URL = import.meta.env.VITE_API_URL;
const UPLOADS_PATH = '/uploads/';

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
        
        // Process the models to ensure they have full URLs
        const processedModels = data.models.map((model: Model3D) => ({
          ...model,
          // Check if modelUrl already has the full path or just the filename
          modelUrl: model.modelUrl.startsWith('http') 
            ? model.modelUrl 
            : `${API_BASE_URL}${UPLOADS_PATH}${model.modelUrl}`
        }));
        
        setModels(processedModels);
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
  };
  
  // Add new model handler
  const handleAddModel = (modelData: FormData) => {
    const addModel = async () => {
      try {
        const data = await modelApi.uploadModel(modelData);
        
        // Ensure the model URL is complete
        const newModelData = {
          ...data.model,
          modelUrl: data.model.modelUrl.startsWith('http') 
            ? data.model.modelUrl 
            : `${API_BASE_URL}${UPLOADS_PATH}${data.model.modelUrl}`
        };
        
        setModels([...models, newModelData]);
        setShowAddDialog(false);
        setNewModel({
          name: '',
          description: '',
          category: 'mobs',
          modelUrl: '',
        });
        
        toast({
          title: "Model added",
          description: `${newModelData.name} has been added to your collection`,
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