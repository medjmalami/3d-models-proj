import express from "express";
import cors from "cors";
import { config } from "dotenv";
import SignRoutes from "./routes/sign.routes";
import ModelRoutes from "./routes/models.routes";
import path from 'path';
const morgan = require('morgan');

config();

const app = express();
app.use(express.json());
// CORS middleware configuration
app.use(cors({
  origin: `${process.env.FRONTEND_URL}` || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Static file serving setup
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads', 'models')));

app.use(morgan('tiny'));


app.use("/", SignRoutes);
app.use("/", ModelRoutes);
app.get("*", (req , res) => {
  res.status(404).json({ error: "Route not found" });
})

app.listen( 5000, () => {
  console.log(`Server is running on port 5000`);
});

export default app;



