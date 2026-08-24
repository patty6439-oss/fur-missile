import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/api";
import WeatherPanel from "../components/WeatherPanel";


function MissionDetail() {
  const { missionId } = useParams();
  const navigate = useNavigate();

  const [mission, setMission] = useState(null);
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

  const loadMission = useCallback(async () => {
    const response = await api.get(`/missions/${missionId}/`);

    const dogResponse = await api.get("/dogs/");

    setMission(response.data);

    setDogs(dogResponse.data);

    setForm({
      dog: response.data.dog || "",
      title: response.data.title || "",
      mission_type: response.data.mission_type || "",
      location: response.data.location || "",
      mission_date: response.data.mission_date || "",
      mission_time: response.data.mission_time || "",
      status: response.data.status || "planned",
      objective: response.data.objective || "",
      notes: response.data.notes || "",
    });
  }, [missionId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMission();
  }, [loadMission]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function updateMission(event) {
    event.preventDefault();

    const response = await api.patch(
      `/missions/${missionId}/`,
      {
        ...form,
        dog: form.dog ? Number(form.dog) : null,
      }
    );

    setMission(response.data);
  }

  async function deleteMission() {
    await api.delete(`/missions/${missionId}/`);
    navigate("/missions");
  }

  async function generateBadge() {
    const response = await api.post(
      `/missions/${missionId}/badge/`
    );

    setMission(response.data.mission);
  }

  if (!mission) {
    return <p>Loading mission...</p>;
  }

  const assignedDog = dogs.find(
    (dog) => dog.id === mission.dog
  );

  return (
    <section>
      <h1>{mission.title}</h1>

      <div>
      <p>Assigned Dog: {assignedDog ? assignedDog.name : "None"}</p>
        <p>Location: {mission.location}</p>
        <p>Date: {mission.mission_date}</p>

        {mission.mission_time && (
          <p>Time: {mission.mission_time}</p>
      )}

        <p>Status: {mission.status}</p>
      </div>

      <form onSubmit={updateMission}>

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
          value={form.title}
          onChange={handleChange}
          placeholder="Mission title"
          required
        />

        <input
          name="mission_type"
          value={form.mission_type}
          onChange={handleChange}
          placeholder="Mission type"
          required
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
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
          value={form.objective}
          onChange={handleChange}
          placeholder="Objective"
          required
        />

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
        />

        <button type="submit">Update Mission</button>
      </form>

      <WeatherPanel location={mission.location} />

      <section>
        <h2>Mission Badge</h2>

        {mission.badge_name ? (
          <>
            <h3>{mission.badge_name}</h3>
            <p>{mission.badge_motto}</p>
            <p>Colors: {mission.badge_colors}</p>
            <p>Symbols: {mission.badge_symbols}</p>
          </>
        ) : (
          <p>No badge generated yet.</p>
        )}

        <button onClick={generateBadge}>
          Generate Badge
        </button>
      </section>

      <button onClick={deleteMission}>
        Delete Mission
      </button>
    </section>
  );
}


export default MissionDetail;