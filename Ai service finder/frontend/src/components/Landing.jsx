import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="page center">
      <h1>AI Service Finder</h1>
      <p>Find trusted local professionals instantly</p>

      <div className="actions">
        <button className="btn btn-primary" onClick={() => navigate("/worker/register")}>
          Register as Worker
        </button>
       
        <button className="btn btn-primary" onClick={() => navigate("/client")}>
          Find Services
        </button>
      </div>
    </div>
  );
}
