import { Navigate } from "react-router-dom";
import AuthService from "../services/authService";

function ProtectedRoute({ children }) {
  if (!AuthService.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
