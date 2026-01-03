import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiWorker from "../services/apiWorker";

export default function WorkerRegister() {
  const [coords, setCoords] = useState(null);
  const [form, setForm] = useState({
    name: "",
    domain: "",
    phone: "",
    address: "",
    area: "",
    city: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setError("Location permission is required");
      }
    );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!coords) {
      setError("Location not detected");
      return;
    }

    try {
      const res = await apiWorker.post("/worker/register", {
        ...form,
        lat: coords.lat,
        lng: coords.lng,
      });
      console.log("Registered:", res.data);
      alert("Registration successful! ");
      navigate("/"); // Go to login after registration
    } catch (err) {
      console.error("Register Error:", err.response || err.message);
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate("/")}>⬅ Back</button>
      <h2>Register as Worker</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <select name="domain" value={form.domain} onChange={handleChange} required>
          <option value="">Select domain</option>
          <option value="plumber">Plumber</option>
          <option value="electrician">Electrician</option>
          <option value="ac_repair">AC Repair</option>
          <option value="gas_repair">Gas Repair</option>
        </select>
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input name="area" placeholder="Area" value={form.area} onChange={handleChange} required />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
