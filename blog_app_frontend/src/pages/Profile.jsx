import { useAuth } from "../lib/auth.jsx";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h2>Profile</h2>
      <div className="card">
        <h3>User Information</h3>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
      </div>
    </div>
  );
}
