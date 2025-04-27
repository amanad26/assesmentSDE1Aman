import { useAuth } from "../lib/auth.jsx";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <h1>RBAC Blog</h1>
      <div className="header-actions">
        <Link to="/profile" className="header-link">
          {user.name}
        </Link>
        <button className="btn btn-outline" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
