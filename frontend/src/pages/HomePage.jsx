import { Link } from "react-router-dom";

import { useAuth } from "../components/AuthContext";

import trainingYard from "../assets/environments/training-yard.jpeg";


function Home() {
  const { user } = useAuth();

  return (
    <section>
      <h1>Fur Missile</h1>

      <p>
        K9 training and mission management for working dogs and handlers.
      </p>

      <img
        className="training-yard-image"
        src={trainingYard}
        alt="K9 training yard"
      />

      {!user && (
        <div>
          <p>
            Manage working dogs, track training, create missions,
            check mission weather, and generate mission badges.
          </p>

          <p>
            <Link to="/login">Login</Link>{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      )}

      {user && (
        <div>
          <p>
            Welcome back. Choose where you want to continue.
          </p>

          <p>
            <Link to="/dogs">Dogs</Link>{" "}
            <Link to="/training">Training</Link>{" "}
            <Link to="/missions">Missions</Link>
          </p>
        </div>
      )}
    </section>
  );
}


export default Home;