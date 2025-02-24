import express from 'express';
import { createModel } from '../controllers/models.controller/AddModel.controller';
import { upload } from '../config/multer';
import { auth } from '../config/auth';
import { deleteModel } from '../controllers/models.controller/DeleteModel.controller';
import { getModels } from '../controllers/models.controller/GetModels.controller';

// Create Express router
const router = express.Router();

// Define the upload endpoint
router.post('/upload', auth, upload.single('modelFile'), createModel );
router.delete('/delete/:id', auth, deleteModel);
router.get('/models', getModels);

export default router;