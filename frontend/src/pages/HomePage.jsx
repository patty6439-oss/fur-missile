import { Link } from "react-router-dom";

import trainingYard from "../assets/environments/training-yard.jpeg";


function Home() {
  return (
    <section>
      <h1>Fur Missile</h1>

      <p>K9 training and mission management.</p>

      <img
        className="training-yard-image"
        src={trainingYard}
        alt="K9 training yard"
      />

      <p>
        <Link to="/login">Login</Link>{" "}
        <Link to="/register">Register</Link>
      </p>
    </section>
  );
}


export default Home;