import { useState } from "react";
import apiSearch from "../services/apiSearch";

export default function SearchBox({ setWorkers, setUserLocation,setSearched }) {
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!problem) {
      alert("Please enter your problem");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          setUserLocation([latitude, longitude]);

          const res = await apiSearch.post("/search", {
            problem,
            lat: latitude,
            lng: longitude,
          });
          
          setWorkers(res.data.workers || []);
        } catch (err) {
          console.error(err);
          alert("Error fetching workers");
          setSearched(true);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        alert("Could not get location");
        setLoading(false);
      }
    );
  };

    return (
  <div className="search-box">
    <input
      className="search-input"
      placeholder="Describe your problem..."
      value={problem}
      onChange={(e) => setProblem(e.target.value)}
    />

    <button
      className="search-btn"
      onClick={handleSearch}
      disabled={loading}
    >
      {loading ? "Searching..." : "Find Help"}
    </button>
  </div>
);
}
