import { Request, Response } from 'express';
import path from 'path';
import { db } from '../../db/index';
import { items } from '../../db/schema';
import { config } from 'dotenv';

config();

export const createModel = async (req: Request, res: Response) => {

    try {
        
        if (!req.file) {
          res.status(400).json({ error: 'No model file uploaded' });
          return;
        }
    
        /*const { modelName, category, description } = req.body;
    
        // Validate required fields
        if (!modelName || !category) {
          res.status(400).json({ error: 'Model name and category are required' });
          return;
        }*/
    
        const modelFileName = req.file.filename;

        const inputPath = path.join(__dirname, '../../uploads', modelFileName);



        res.json({ message: inputPath });
        return;

      } catch (error) {

        console.error('Error processing 3D model upload:', error);
        res.status(500).json({ error: 'Failed to process the upload' });
      }
  }