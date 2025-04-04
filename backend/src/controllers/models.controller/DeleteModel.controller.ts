import { Request, Response } from 'express';
import { db } from '../../db/index';
import { items } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

// Initialize Supabase client
const supabase = createClient(
  process.env.PROJECT_URL!, // Your Supabase URL
  process.env.SERVICE_ROLE! // Your Supabase Service Role Key
);

export const deleteModel = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: 'No model id provided' });
      return;
    }

    // Retrieve the model from the database to get the file path
    const deletedModel = await db.delete(items).where(eq(items.id, id)).returning();

    if (deletedModel.length === 0) {
      res.status(404).json({ error: 'Model not found' });
      return;
    }

    // Get the file path from the database
    const filePath = deletedModel[0].modelUrl; // This is the file name (or path in Supabase storage)

    // Delete the file from Supabase storage
    const { error } = await supabase.storage
      .from('3dmodelbucket') // Replace with your actual bucket name
      .remove([filePath]); // Delete the file using its path

    if (error) {
      console.error('Error deleting file from Supabase:', error);
      res.status(500).json({ error: 'Failed to delete file from storage' });
      return;
    }

    // Respond with a success message
    res.json({ message: 'Model deleted successfully' });

  } catch (error) {
    console.error('Error processing model deletion:', error);
    res.status(500).json({ error: 'Failed to delete the model' });
  }
};
