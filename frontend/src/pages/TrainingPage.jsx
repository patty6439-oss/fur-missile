import { Link } from "react-router-dom";


function TrainingPage() {
  const trainingCategories = [
    "Obedience",
    "Agility",
    "Detection",
    "Tracking",
    "Search & Rescue",
    "Protection",
    "Therapy / Public Access",
  ];

  const commands = [
    "Sit",
    "Down",
    "Stay",
    "Heel",
    "Come",
    "Search",
    "Track",
  ];


  return (
    <section>
      <div className="page-header">
        <h1>K9 Training</h1>

        <p>
          Build your dog's skills through training before putting those
          skills to work on missions.
        </p>
      </div>


      <section>
        <h2>Training Categories</h2>

        <p>
          Working dogs can train across different disciplines depending
          on their role and mission requirements.
        </p>

        <div className="training-grid">
          {trainingCategories.map((category) => (
            <div
              className="training-card"
              key={category}
            >
              {category}
            </div>
          ))}
        </div>
      </section>


      <section>
        <h2>K9 Commands</h2>

        <p>
          Training commands and exercises can be used to build each dog's
          skills and abilities.
        </p>

        <div className="training-grid">
          {commands.map((command) => (
            <div
              className="training-card"
              key={command}
            >
              {command}
            </div>
          ))}
        </div>
      </section>


      <section>
        <h2>Dog Training Progress</h2>

        <p>
          Individual skill sheets and training progress tracking are planned
          for a future game mode, where each working dog can build skills,
          complete exercises, and improve abilities over time.
        </p>

        <Link
          className="action-link"
          to="/dogs"
        >
          View Working Dogs
        </Link>
      </section>


      <section>
        <h2>Future Game Mode</h2>

        <p>
          A future interactive training mode is planned where handlers can
          train individual dogs, build skill sheets, complete exercises, and
          prepare K9 teams for different mission types.
        </p>
      </section>
    </section>
  );
}


export default TrainingPage;