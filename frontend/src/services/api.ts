
// Central place for all API calls

const API_BASE_URL = 'http://localhost:5000';

export const modelApi = {
  // Get all models
  getAllModels: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/models`);
      if (!response.ok) throw new Error('Failed to fetch models');
      return await response.json();
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  },
  
  // Delete a model by ID
  deleteModel: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete model');
      return await response.json();
    } catch (error) {
      console.error('Error deleting model:', error);
      throw error;
    }
  },
  
  // Upload/create a new model
  uploadModel: async (modelData : FormData) => {
    try {
        console.log(modelData);
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(modelData),
      });
      if (!response.ok) throw new Error('Failed to upload model');
      return await response.json();
    } catch (error) {
      console.error('Error uploading model:', error);
      throw error;
    }
  }
};