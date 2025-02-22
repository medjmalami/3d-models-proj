import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configure storage for uploaded 3D files
const modelStorage = multer.diskStorage({
    destination: "public/uploads/models",
    filename: (req, file, cb ) => {
      const uniqueId = uuidv4();
      const extension = path.extname(file.originalname);
      cb(null, `${uniqueId}${extension}`);
    }
  });


// Configure multer for file upload
export const upload = multer({
    storage: modelStorage,
    /*fileFilter: (req, file, cb ) => {
      const validExtensions = ['.gltf', '.glb', '.obj', '.stl', '.fbx'];
      const ext = path.extname(file.originalname).toLowerCase();
      if (validExtensions.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only 3D model files are allowed.'));
      }
    },*/
    limits: {
      fileSize: 50 * 1024 * 1024 // 50MB max file size
    }
  });