import { Request, Response } from 'express';
import { db } from '../../db/index';
import { items } from '../../db/schema';
import { uploadToSupabase } from '../../config/multer'; // Import the upload function
import { eq } from 'drizzle-orm';

export const createModel = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No model file uploaded' });
      return;
    }

    const { modelName, category, description } = req.body;

    // Validate required fields
    if (!modelName || !category || !description) {
      res.status(400).json({ error: 'Model name, category, and description are required' });
      return;
    }

    const exist = await db.select().from(items).where(eq(items.name, modelName));
    if (exist.length > 0) {
      res.status(400).json({ error: 'Model name already exists' });
      return;
    }


    // Upload file to Supabase and get the file name (filePath)
    const modelFileName = await uploadToSupabase(req.file);

    // Add model to the database with the file name (path)
    const [model] = await db.insert(items).values({
      name: modelName,
      category: category,
      description: description,
      modelUrl: modelFileName, // Store the file name in the database
    }).returning();

    res.json({ model });
    return;
  } catch (error) {
    console.error('Error processing 3D model upload:', error);
    res.status(500).json({ error: 'Failed to process the upload' });
  }
};
