import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js"; 
import postgres from "postgres";

// Connect to Neon database
const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// Initialize Drizzle
export const db = drizzle(sql);
