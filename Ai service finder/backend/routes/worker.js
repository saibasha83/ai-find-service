import express from "express";
import Worker from "../models/WorkerSchema.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, domain, phone, address, area, lat, lng } = req.body;

    if (!name || !domain || !phone || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: "All fields + location are required" });
    }

    const existing = await Worker.findOne({ phone });
    if (existing) return res.status(409).json({ error: "Phone already registered" });

    const worker = await Worker.create({
      name,
      domain,
      phone,
      address,
      area,
      location: { type: "Point", coordinates: [lng, lat] },
      rating: 0,
    });

    res.status(201).json({ message: "Worker registered", worker });
  } catch (err) {
    console.error("Worker Register Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
