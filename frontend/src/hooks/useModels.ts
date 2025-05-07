

import { useState } from "react"
import type { Model3D, ModelCategory } from "../types/models"
import { useToast } from "@/hooks/use-toast"
import { modelApi } from "@/services/api"
import { useEffect } from "react"

// Base URL for model files
const BUCKET_URL = "https://hkjzouwgvrkobjvhcwtg.supabase.co/storage/v1/object/public/3dmodelbucket/"

export const useModels = () => {
  const [models, setModels] = useState<Model3D[]>([])
  const [selectedCategory, setSelectedCategory] = useState<ModelCategory | "all">("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [loading, setLoading] = useState(true) // Add loading state
  const [newModel, setNewModel] = useState<Partial<Model3D>>({
    name: "",
    description: "",
    category: "mobs",
    modelUrl: "",
  })

  const { toast } = useToast()

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true) // Set loading to true when fetch starts
      try {
        const data = await modelApi.getAllModels()

        // Process the models to ensure they have full URLs
        const processedModels = data.models.map((model: Model3D) => ({
          ...model,
          // Check if modelUrl already has the full path or just the filename
          modelUrl: model.modelUrl.startsWith("https") ? model.modelUrl : `${BUCKET_URL}${model.modelUrl}`,
        }))

        setModels(processedModels)
      } catch (err) {
        toast({
          title: "Error loading models",
          variant: "destructive",
        })
      } finally {
        setLoading(false) // Set loading to false when fetch completes (success or error)
      }
    }

    fetchModels()
  }, [])

  // Filter models by selected category
  const filteredModels =
    selectedCategory === "all" ? models : models.filter((model) => model.category === selectedCategory)

  // Delete model handler
  const handleDeleteModel = (id: string) => {
    const deleteModel = async () => {
      try {
        await modelApi.deleteModel(id)
        setModels(models.filter((model) => model.id !== id))
        toast({
          title: "Model deleted",
          description: "The model has been permanently removed",
        })
      } catch (err) {
        toast({
          title: "Error deleting model",
          variant: "destructive",
        })
      }
    }

    deleteModel()
  }

  // Add new model handler
  const handleAddModel = (modelData: FormData) => {
    const addModel = async () => {
      try {
        const data = await modelApi.uploadModel(modelData)

        // Ensure the model URL is complete
        const newModelData = {
          ...data.model,
          modelUrl: data.model.modelUrl.startsWith("https")
            ? data.model.modelUrl
            : `${BUCKET_URL}${data.model.modelUrl}`,
        }

        setModels([...models, newModelData])
        setShowAddDialog(false)
        setNewModel({
          name: "",
          description: "",
          category: "mobs",
          modelUrl: "",
        })

        toast({
          title: "Model added",
          description: `${newModelData.name} has been added to your collection`,
        })
      } catch (err) {
        toast({
          title: "Error adding model",
          variant: "destructive",
        })
      }
    }

    addModel()
  }

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
    handleAddModel,
    loading, // Return the loading state
  }
}
