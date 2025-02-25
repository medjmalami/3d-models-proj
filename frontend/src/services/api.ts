// Central place for all API calls
const API_BASE_URL = import.meta.env.VITE_API_URL;

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
  
  // Upload/create a new model - properly handle FormData
  uploadModel: async (formData: FormData) => {
    try {



      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        // No Content-Type header - browser sets it automatically with boundary for FormData
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData
      });
      
      // Handle non-OK responses
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || 'Upload failed');
        } catch (e) {
          throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }
      }
      
      const data = await response.json();
      
      // Ensure modelUrl has the correct path if needed
      if (data.model && data.model.modelUrl && !data.model.modelUrl.startsWith('http')) {
        data.model.modelUrl = `${API_BASE_URL}/uploads/${data.model.modelUrl}`;
      }
      
      return data;
    } catch (error) {
      console.error('Error uploading model:', error);
      throw error;
    }
  }
};