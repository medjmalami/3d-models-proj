import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.PROJECT_URL!, // Your Supabase URL
  process.env.SERVICE_ROLE! // Your Supabase Service Role Key
);

// Configure multer to store the file in memory
const modelStorage = multer.memoryStorage();

// Configure multer for file upload
export const upload = multer({
  storage: modelStorage,
  fileFilter: (req, file, cb) => {
    const validExtensions = ['.gltf', '.glb', '.obj', '.stl', '.fbx'];
    const ext = file.originalname.toLowerCase().slice(-4); // Get the last 4 characters to check extension
    if (validExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only 3D model files are allowed.'));
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
});

// Function to upload the file to Supabase Storage
export const uploadToSupabase = async (file: Express.Multer.File) => {
  const uniqueId = uuidv4();
  const fileExtension = file.originalname.split('.').pop(); // Extract file extension
  const filePath = `${uniqueId}.${fileExtension}`; // Store in 'models' folder with unique name

  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage
    .from('3dmodelbucket') // Replace with your actual bucket name
    .upload(filePath, file.buffer, {
      cacheControl: '3600', // Optional, adjust as needed
      upsert: false, // Don't overwrite existing files
    });

  if (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }

  // Return the file name (filePath) instead of the public URL
  return filePath; // Return the file name to be used in the frontend
};
