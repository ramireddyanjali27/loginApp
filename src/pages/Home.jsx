import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-card">
          <div className="home-header">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="user-info">
              <h1>Welcome Back!</h1>
              <p className="user-name">Hello, {user?.name || "User"}</p>
            </div>
          </div>

          <div className="user-details">
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{user?.email}</span>
            </div>
          </div>

          <div className="home-actions">
            <button onClick={handleLogout} className="logout-button">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
