import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Simple hello route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
