import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import workerroute from "./routes/worker.js";
import searchRoutes from "./routes/searchRoutes.js";
import connectDB from "./config/db.js";
import Worker from "./models/WorkerSchema.js"; // ✅ default import

dotenv.config();

// Connect to MongoDB
connectDB().then(async () => {
  console.log("✅ MongoDB connected");
  await Worker.syncIndexes(); // ensure 2dsphere index exists
});

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/worker", workerroute);
app.use("/api", searchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
