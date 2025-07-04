import express from "express";
import cors from "cors";
import morgan, { format } from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import { connectDB } from "./config/database.js";
import { errorHandler, notFound } from "./middleware/errorMiddlware.js";
import { authRouter } from "./routes/authRoutes.js";
import { recruiterRouter } from "./routes/recruiterRoutes.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Server Working");
});

app.use('/api/auth',authRouter)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
