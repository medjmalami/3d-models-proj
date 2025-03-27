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
  origin: `${process.env.FRONTEND_URL}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Static file serving setup
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads', 'models')));

app.use(morgan('tiny'));

app.get("/", (req , res) => {
  res.send("Messanger Backend is Running!");
});

app.use("/", SignRoutes);
app.use("/", ModelRoutes);


module.exports = app;



