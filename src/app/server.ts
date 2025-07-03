import express from "express";
import cors from "cors";
import { config } from "dotenv";
import authRouter from "./routes/authRoutes";

config(); // Load .env

/*
// --- Middleware setup ---
app.use(helmet());                    // Secure headers
app.use(cors());                      // Enable CORS with defaults (customize if needed)
app.use(express.json());              // Parse JSON bodies
app.use(morgan('dev'));               // HTTP request logger (dev format)
*/
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
