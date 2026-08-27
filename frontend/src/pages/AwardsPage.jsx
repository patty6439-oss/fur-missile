import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/api";
import BadgeDisplay from "../components/BadgeDisplay";


function AwardsPage() {
  const [dogs, setDogs] = useState([]);
  const [missions, setMissions] = useState([]);
  const [loadError, setLoadError] = useState("");


  async function loadAwards() {
    setLoadError("");

    try {
      const [dogResponse, missionResponse] = await Promise.all([
        api.get("/dogs/"),
        api.get("/missions/"),
      ]);

      setDogs(dogResponse.data);
      setMissions(missionResponse.data);
    } catch (error) {
      console.error("Awards loading failed:", error);

      setLoadError(
        "Awards could not be loaded. Please try again."
      );
    }
  }


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAwards();
  }, []);


  const badgeMissions = missions.filter(
    (mission) => mission.badge_name
  );


  return (
    <section>
      <div className="page-header">
        <h1>Awards</h1>

        <p>
          Mission badges earned by your working dogs.
        </p>
      </div>


      {loadError && (
        <p className="message error-message">
          {loadError}
        </p>
      )}


      {!loadError && badgeMissions.length === 0 && (
        <p>
          No mission badges earned yet.
        </p>
      )}


      {badgeMissions.length > 0 && (
        <div className="card-grid">
          {badgeMissions.map((mission) => {
            const earnedByDog = dogs.find(
              (dog) => dog.id === mission.badge_earned_by
            );

            return (
              <article key={mission.id}>
                <BadgeDisplay badge={mission} />

                <h2>
                  {mission.badge_name}
                </h2>

                <p>
                  Mission:{" "}
                  <Link to={`/missions/${mission.id}`}>
                    {mission.title}
                  </Link>
                </p>

                <p>
                  Earned by:{" "}
                  {earnedByDog ? (
                    <Link to={`/dogs/${earnedByDog.id}`}>
                      {earnedByDog.name}
                    </Link>
                  ) : (
                    "Legacy award"
                  )}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}


export default AwardsPage;