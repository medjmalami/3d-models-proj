import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createCanvas } from 'canvas';
import { db } from '../../db/index';
import { items } from '../../db/schema';
import { CLOSING } from 'ws';


  // Function to generate 2D thumbnail from 3D model
async function generate2DThumbnail(modelPath: string, thumbnailPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // In a real implementation, you would use a library like three.js with a headless renderer
      // This is a simplified placeholder that creates a basic colored square as thumbnail
      const canvas = createCanvas(512, 512);
      const ctx = canvas.getContext('2d');
      
      // Fill with a gradient as placeholder
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#4287f5');
      gradient.addColorStop(1, '#42f5c2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Draw a wireframe cube to simulate a 3D object
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Front face
      ctx.moveTo(156, 156);
      ctx.lineTo(356, 156);
      ctx.lineTo(356, 356);
      ctx.lineTo(156, 356);
      ctx.lineTo(156, 156);
      // Back face connections
      ctx.moveTo(156, 156);
      ctx.lineTo(206, 106);
      ctx.moveTo(356, 156);
      ctx.lineTo(406, 106);
      ctx.moveTo(356, 356);
      ctx.lineTo(406, 306);
      ctx.moveTo(156, 356);
      ctx.lineTo(206, 306);
      // Back face
      ctx.moveTo(206, 106);
      ctx.lineTo(406, 106);
      ctx.lineTo(406, 306);
      ctx.lineTo(206, 306);
      ctx.lineTo(206, 106);
      ctx.stroke();
      
      // Save the canvas to a file
      const out = fs.createWriteStream(thumbnailPath);
      const stream = canvas.createPNGStream();
      stream.pipe(out);
      out.on('finish', resolve);
      out.on('error', reject);
    });
  }

  export const createModel = async (req: Request, res: Response) => {
    
    try {
        console.log(req);
        res.status(200).json({ message: 'Hello World' });
        
        /*
        if (!req.file) {
          res.status(400).json({ error: 'No model file uploaded' });
          return;
        }
    
        const { modelName, category, description } = req.body;
    
        // Validate required fields
        if (!modelName || !category) {
          res.status(400).json({ error: 'Model name and category are required' });
          return;
        }
    
        // Get the uploaded file path
        const modelFilePath = req.file.path;
        const modelFileName = req.file.filename;
        
        // Generate thumbnail path
        const thumbnailDir = path.join(__dirname, '../uploads/thumbnails');
        if (!fs.existsSync(thumbnailDir)) {
          fs.mkdirSync(thumbnailDir, { recursive: true });
        }
        
        const thumbnailFileName = `${path.parse(modelFileName).name}.png`;
        const thumbnailPath = path.join(thumbnailDir, thumbnailFileName);
        
        // Generate 2D thumbnail
        await generate2DThumbnail(modelFilePath, thumbnailPath);
        
        // Save entry to database using Drizzle
        const [model] = await db.insert(items).values({
          name: modelName,
          category,
          description: description || '',
          modelUrl: modelFileName,
          thumbnailUrl: thumbnailFileName
        }).returning();
        
        res.status(201).json({
          message: 'Model uploaded successfully',
          model: {
            id: model.id,
            name: model.name,
            category: model.category,
            thumbnailUrl: `/thumbnails/${thumbnailFileName}`,
            modelUrl: `/models/${modelFileName}`
          }
        });
        */
      } catch (error) {
        console.error('Error processing 3D model upload:', error);
        res.status(500).json({ error: 'Failed to process the upload' });
      }
  }