import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/api";
import WeatherPanel from "../components/WeatherPanel";


function MissionsPage() {
  const [missions, setMissions] = useState([]);
  const [dogs, setDogs] = useState([]);

  const [form, setForm] = useState({
    dog: "",
    title: "",
    mission_type: "",
    location: "",
    mission_date: "",
    mission_time: "",
    status: "planned",
    objective: "",
    notes: "",
  });


  async function loadData() {
    const [missionResponse, dogResponse] = await Promise.all([
      api.get("/missions/"),
      api.get("/dogs/"),
    ]);

    setMissions(missionResponse.data);
    setDogs(dogResponse.data);
  }


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);


  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }


  async function handleSubmit(event) {
    event.preventDefault();

    await api.post("/missions/", {
      ...form,
      dog: form.dog ? Number(form.dog) : null,
    });

    setForm({
      dog: "",
      title: "",
      mission_type: "",
      location: "",
      mission_date: "",
      mission_time: "",
      status: "planned",
      objective: "",
      notes: "",
    });

    loadData();
  }


  return (
    <section>
      <h1>Missions</h1>

      <h2>Create Mission</h2>

      <form onSubmit={handleSubmit}>
        <select
          name="dog"
          value={form.dog}
          onChange={handleChange}
        >
          <option value="">No dog assigned</option>

          {dogs.map((dog) => (
            <option key={dog.id} value={dog.id}>
              {dog.name}
            </option>
          ))}
        </select>

        <input
          name="title"
          placeholder="Mission title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="mission_type"
          placeholder="Mission type"
          value={form.mission_type}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          name="mission_date"
          type="date"
          value={form.mission_date}
          onChange={handleChange}
          required
        />

        <input
          name="mission_time"
          type="time"
          value={form.mission_time}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="planned">Planned</option>
          <option value="active">Active</option>
          <option value="complete">Complete</option>
        </select>

        <textarea
          name="objective"
          placeholder="Objective"
          value={form.objective}
          onChange={handleChange}
          required
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">
          Create Mission
        </button>
      </form>


      <h2>Your Missions</h2>

      <div className="card-grid">
        {missions.map((mission) => (
          <article key={mission.id}>
            <h2>
              <Link to={`/missions/${mission.id}`}>
                {mission.title}
              </Link>
            </h2>

            <p>{mission.location}</p>

            <p>
              Date: {mission.mission_date}
            </p>

            {mission.mission_time && (
              <p>
                Time: {mission.mission_time}
              </p>
            )}

            <p>
              Status:{" "}
              <span className={`status-pill status-${mission.status}`}>
                  {mission.status}
                </span>
              </p>

            <WeatherPanel
              location={mission.location}
              compact
            />
          </article>
        ))}
      </div>
    </section>
  );
}


export default MissionsPage;