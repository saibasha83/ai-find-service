import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: String,
  domain: String,
  phone: { type: String},
  address: String,
  area: String,

  rating: { type: Number, default: 0 },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
});

const Worker = mongoose.model("Worker", workerSchema);
export default Worker;
