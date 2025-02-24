import { Request, Response } from 'express';
import { db } from '../../db/index';
import { items } from '../../db/schema';


export const getModels = async (req: Request, res: Response) => {
    try {

        const models = await db.select().from(items);

        if (!models) {
          res.status(400).json({ error: 'No models found' });
          return;
        }
        
        res.json({ models });


      } catch (error) {
        res.status(500).json({ error: 'Failed to get the models' });
      }
  }