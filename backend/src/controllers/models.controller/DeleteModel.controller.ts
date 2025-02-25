import { Request, Response } from 'express';
import { db } from '../../db/index';
import { items } from '../../db/schema';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';


export const deleteModel = async (req: Request, res: Response) => {
    try {

        const id = req.params.id;
        if (!id) {
          res.status(400).json({ error: 'No model id provided' });
          return;
        }

        
        const deletedModel = await db.delete(items).where(eq(items.id, id)).returning();

        // Delete the file from the uploads folder
        const filePath = path.join(__dirname, '../../../public/uploads/models', deletedModel[0].modelUrl);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            res.status(500).json({ error: 'Failed to delete file' });
          } 
        });
        

        res.json({ message: 'Model deleted successfully' });
        
        
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete the model' });
      }
  }