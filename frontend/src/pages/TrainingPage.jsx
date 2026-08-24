import { Link } from "react-router-dom";


function TrainingPage() {
  return (
    <section>
      <h1>K9 Training</h1>

      <p>
        Build your dog's skills through training before putting those
        skills to work on missions.
      </p>

      <section>
        <h2>Training Categories</h2>

        <ul>
          <li>Obedience</li>
          <li>Agility</li>
          <li>Detection</li>
          <li>Tracking</li>
          <li>Search & Rescue</li>
          <li>Protection</li>
          <li>Therapy / Public Access</li>
        </ul>
      </section>

      <section>
        <h2>K9 Commands</h2>

        <p>
          Training commands and exercises can be used to build each dog's
          skills and abilities.
        </p>

        <ul>
          <li>Sit</li>
          <li>Down</li>
          <li>Stay</li>
          <li>Heel</li>
          <li>Come</li>
          <li>Search</li>
          <li>Track</li>
        </ul>
      </section>

      <section>
        <h2>Dog Training Progress</h2>

        <p>
          Individual dog training progress, skills, and statistics will
          appear here.
        </p>

        <Link to="/dogs">View Working Dogs</Link>
      </section>

      <section>
        <h2>Training Yard</h2>

        <p>
          An interactive K9 training simulator is planned for future
          development.
        </p>
      </section>
    </section>
  );
}


export default TrainingPage;