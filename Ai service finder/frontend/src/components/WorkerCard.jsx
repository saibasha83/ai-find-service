import React from "react";

export default function WorkerCard({ worker,distance }) {
  return (
    <div className="worker-card">
      <h3>{worker.name}</h3>
      <p>Service: {worker.domain}</p>
      <p>Phone: {worker.phone}</p>
      <p>Area: {worker.area}</p>
      <p>Distance: {distance}</p>
    </div>
  );
}
