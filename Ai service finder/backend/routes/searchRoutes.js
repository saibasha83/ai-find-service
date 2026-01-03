import express from "express";
import OpenAI from "openai";
import Worker from "../models/WorkerSchema.js";

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Detect service using AI
async function detectService(problem) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Classify the user's problem into ONE service category only: plumber, electrician, ac_repair, gas_repair."
      },
      {
        role: "user",
        content: problem
      }
    ]
  });
    const ALLOWED_SERVICES = [
    "plumber",
    "electrician",
    "ac_repair",
    "gas_repair",
  ];

  function normalizeService(aiResponse) {
    const service = aiResponse.toLowerCase().trim();

    if (ALLOWED_SERVICES.includes(service)) {
      return service;
    }

    // fallback if AI gives unexpected output
    return "plumber"; // or throw error / default
  }
  const rawService = response.choices[0].message.content;
  const service = normalizeService(rawService);
  
}

// Haversine distance function
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  console.log("User:", lat1, lon1);
console.log("Worker:", lat2, lon2);

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Search API
router.post("/search", async (req, res) => {
  try {
    const { problem, lat: userLat, lng: userLng } = req.body;

    if (!userLat || !userLng) {
      return res.status(400).json({ error: "lat and lng are required" });
    }

    const service = await detectService(problem);

    // Fetch all workers of that service
    const workers = await Worker.find({ domain: service });

 const nearbyWorkers = [];
for (const worker of workers) {
  if (
    worker.location &&
    Array.isArray(worker.location.coordinates) &&
    worker.location.coordinates.length === 2
  ) {
    const [workerLng, workerLat] = worker.location.coordinates;

    const distance = getDistanceFromLatLonInKm(
      userLat,
      userLng,
      workerLat,
      workerLng
    );

    console.log(`Worker ${worker.name}: ${distance.toFixed(2)} km`);

    if (distance <= 300) {
      nearbyWorkers.push({
        ...worker._doc,
        distanceKm: Number(distance.toFixed(2)), // 👈 HERE
      });
    }
  }
}


    res.json({
      serviceDetected: service,
      totalWorkers: nearbyWorkers.length,
      workers: nearbyWorkers,
     
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
