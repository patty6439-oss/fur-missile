import { Link } from "react-router-dom"; 
 
function Home() { 
  return ( 
    <section> 
      <h1>Fur Missile</h1> 
      <p>K9 training and mission management.</p> 
      <p> 
        <Link to="/login">Login</Link>{" "} 
        <Link to="/register">Register</Link> 
      </p> 
    </section> 
  ); 
} 
 
export default Home; 