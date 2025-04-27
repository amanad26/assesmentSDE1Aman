import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/auth.jsx";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading">Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
}
