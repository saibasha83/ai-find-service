import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiWorker from "../services/apiWorker";

export default function WorkerLogin({onLoginSuccess}) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await apiWorker.post("/worker/login", { phone });
      const worker = res.data.worker;

      // ✅ After successful login, navigate to dashboard
      navigate("/worker/dashboard", { state: { worker } });
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };


  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate("/")}>⬅ Back</button>

      <div className="card">
        <h2>Worker Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  
  );
}
