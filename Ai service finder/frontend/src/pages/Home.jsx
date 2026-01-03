import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import WorkerCard from "../components/WorkerCard";
import WorkersMap from "../components/WorkersMap";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      <SearchBox
        setWorkers={setWorkers}
        setUserLocation={setUserLocation}
      />

      {/* Map */}
      {userLocation && (
        <WorkersMap workers={workers} />
      )}

      {/* Worker list */}
      
    </div>  
  );
}
