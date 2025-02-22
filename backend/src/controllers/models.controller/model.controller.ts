import { Request, Response } from 'express';
import path from 'path';
import { db } from '../../db/index';
import { items } from '../../db/schema';
import { config } from 'dotenv';
import { generateThumbnail } from '../../config/generateThumbnail';

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
       console.log(req);
    
        const modelFileName = req.file.filename;
        const inputFile = req.file.path;
        const outputFile = path.join("public/uploads/thumbnails", `${modelFileName}.png`);

        //await generateThumbnail(inputFile, outputFile);

        res.json({ message: "Thumbnail generated", thumbnail: `/thumbnails/${modelFileName}.png` });
        return;

      } catch (error) {

        console.error('Error processing 3D model upload:', error);
        res.status(500).json({ error: 'Failed to process the upload' });
      }
  }