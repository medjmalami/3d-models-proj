import express, { Request, Response } from 'express';
import { createModel } from '../controllers/models.controller/model.controller';
import { upload } from '../config/multer';


// Create Express router
const router = express.Router();

// Define the upload endpoint
router.post('/upload', upload.single('modelFile'), createModel );

export default router;