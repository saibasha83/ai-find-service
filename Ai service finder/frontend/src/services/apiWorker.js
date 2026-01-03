import axios from "axios";
import 
const apiWorker = axios.create({
  baseURL: "http://localhost:5000", // ✅ Make sure protocol is correct
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiWorker;