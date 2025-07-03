import express from "express";
import cors from "cors";
import morgan, { format } from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import { connectDB } from "./config/database.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
