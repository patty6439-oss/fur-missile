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

          <div className="home-actions">
            <Link
              className="home-action-card"
              to="/login"
            >
              <h2>Login</h2>
              <p>
                Return to your working dogs, training, and missions.
              </p>
            </Link>

            <Link
              className="home-action-card"
              to="/register"
            >
              <h2>Register</h2>
              <p>
                Create an account and start managing your K9 team.
              </p>
            </Link>
          </div>
        </div>
      )}

      {user && (
        <div>
          <p>
            Welcome back. Choose where you want to continue.
          </p>

          <div className="home-actions">
            <Link
              className="home-action-card"
              to="/dogs"
            >
              <h2>Dogs</h2>
              <p>
                View, add, and manage your working dogs.
              </p>
            </Link>

            <Link
              className="home-action-card"
              to="/training"
            >
              <h2>Training</h2>
              <p>
                Review training categories, commands, and progress.
              </p>
            </Link>

            <Link
              className="home-action-card"
              to="/missions"
            >
              <h2>Missions</h2>
              <p>
                Plan missions, assign dogs, and check mission weather.
              </p>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}


export default Home;