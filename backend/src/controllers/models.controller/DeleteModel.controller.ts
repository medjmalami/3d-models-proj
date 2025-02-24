import { Request, Response } from 'express';
import { db } from '../../db/index';
import { items } from '../../db/schema';
import { eq } from 'drizzle-orm';


export const deleteModel = async (req: Request, res: Response) => {
    try {

        const id = req.params.id;
        if (!id) {
          res.status(400).json({ error: 'No model id provided' });
          return;
        }

        await db.delete(items).where(eq(items.id, id));

        res.json({ message: 'Model deleted successfully' });
        
        
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete the model' });
      }
  }