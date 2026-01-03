import { useLocation, useNavigate } from "react-router-dom";

export default function WorkerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const worker = location.state?.worker; // get worker from router state

  // If no worker is passed (user accessed URL directly), redirect to login
  if (!worker) {
    navigate("/worker/login");
    return null;
  }
  const handleLogout = () => {
 
  navigate("/");
};


  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate("/")}>⬅ Back</button>

      <div className="card">
        <h2>Worker Dashboard</h2>

        <h3>Welcome, {worker.name}</h3>
        <p><strong>Domain:</strong> {worker.domain}</p>
        <p><strong>Phone:</strong> {worker.phone}</p>
        <p><strong>Address:</strong> {worker.address}, {worker.area}</p>
        <p><strong>Rating:</strong> ⭐ {worker.rating}</p>

        <div className="actions">
          <button className="btn btn-secondary">View Jobs</button>
          <button className="btn btn-secondary">Update Profile</button>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>);
}
