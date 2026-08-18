import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";


function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav>
      <Link to="/">Fur Missile</Link>{" "}

      {user && <Link to="/dogs">Dogs</Link>}{" "}
      {user && <Link to="/missions">Missions</Link>}{" "}

      {!user && <Link to="/login">Login</Link>}{" "}
      {!user && <Link to="/register">Register</Link>}{" "}

      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;