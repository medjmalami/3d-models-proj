import { Request, Response } from 'express';
import { db } from '../../db/index';
import { items } from '../../db/schema';


export const createModel = async (req: Request, res: Response) => {

    try {
        
        if (!req.file) {
          res.status(400).json({ error: 'No model file uploaded' });
          return;
        }
    
        const { modelName, category, description } = req.body;
    
        // Validate required fields
        if (!modelName || !category || !description) {
          
          res.status(400).json({ error: 'Model name, category and description are required' });
          return;
        }
    
        const modelFileName = req.file.filename;

        // add model to database
        const [model] = await db.insert(items).values({
          name: modelName,
          category: category,
          description: description,
          modelUrl: modelFileName,
        }).returning();

        res.json({ model });
        return;

      } catch (error) {

        console.error('Error processing 3D model upload:', error);
        res.status(500).json({ error: 'Failed to process the upload' });
      }
  }