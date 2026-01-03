export default function WorkersMap({ workers }) {
  if (!workers || workers.length === 0) {
    return <p>No workers found nearby</p>;
  }

  // ✅ Sort nearest first
  const sortedWorkers = [...workers].sort(
    (a, b) => a.distanceKm - b.distanceKm
  );

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      {sortedWorkers.map((w) => (
        <div
          key={w._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <h3>{w.name}</h3>

          <p>
            🛠 {w.domain} <br />
            📍 {w.distanceKm} km away <br />
            ⭐ {w.rating ?? "No rating"}
          </p>

          <p>📞 {w.phone}</p>

          <div style={{ display: "flex", gap: "12px" }}>
            <a href={`tel:${w.phone}`}>📞 Call</a>
            <a
              href={`https://wa.me/91${w.phone}`}
              target="_blank"
              rel="noreferrer"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
