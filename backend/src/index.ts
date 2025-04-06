import express from "express";
import cors from "cors";
import { config } from "dotenv";
import SignRoutes from "./routes/sign.routes";
import ModelRoutes from "./routes/models.routes";
const morgan = require('morgan');

config();

const app = express();
app.use(express.json());
// CORS middleware configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


app.use(morgan('tiny'));


app.use("/", SignRoutes);
app.use("/", ModelRoutes);
app.get("*", (req , res) => {
  res.status(404).json({ error: "Route not found" });
})
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});


// Also support ES modules
export default app



