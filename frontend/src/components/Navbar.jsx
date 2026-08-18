import { Link, useNavigate } from "react-router-dom"; 
 
import api from "../api/api"; 
 
 
function Navbar() { 
  const navigate = useNavigate(); 
  const token = localStorage.getItem("token"); 
 
  async function handleLogout() { 
    try { 
      await api.post("/accounts/logout/"); 
    } catch (error) { 
      console.error(error); 
    } finally { 
      localStorage.removeItem("token"); 
      navigate("/login"); 
    } 
  } 
 
  return ( 
    <nav> 
      <Link to="/">Fur Missile</Link>{" "} 
      {token && <Link to="/dogs">Dogs</Link>}{" "} 
      {token && <Link to="/missions">Missions</Link>}{" "} 
      {!token && <Link to="/login">Login</Link>}{" "} 
      {!token && <Link to="/register">Register</Link>}{" "} 
      {token && <button onClick={handleLogout}>Logout</button>} 
    </nav> 
  ); 
} 
 
export default Navbar; 