import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth.jsx";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <h2>Navigation</h2>
      <nav>
        <Link to="/" className="sidebar-link">
          Home
        </Link>
        {user.role === "admin" && (
          <Link to="/admin" className="sidebar-link">
            Admin Dashboard
          </Link>
        )}
        <Link to="/profile" className="sidebar-link">
          Profile
        </Link>
      </nav>
    </aside>
  );
}
