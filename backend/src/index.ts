import express from "express";
import cors from "cors";
import { config } from "dotenv";
import SignRoutes from "./routes/sign.routes";
import ModelRoutes from "./routes/models.routes";
import mongoSanitize from "express-mongo-sanitize";
// @ts-ignore
import xss from 'xss-clean';
import rateLimit from "express-rate-limit";
import helmet from "helmet";
const morgan = require('morgan');

config();

const app = express();

// CORS middleware configuration
app.use(cors({
  origin: process.env.FRONTEND_URL ,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 3600
}));

// Set security HTTP headers
app.use(helmet());

// Rate limiting to prevent brute force and DoS attacks
const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use("/", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());


app.use(morgan('combined'));


app.use("/", SignRoutes);
app.use("/", ModelRoutes);
app.all("*", (req , res) => {
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



