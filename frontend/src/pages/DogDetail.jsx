import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/api";
import BadgeDisplay from "../components/BadgeDisplay";

import malinoisImage from "../assets/dogs/malinois.jpg";
import whiteLabImage from "../assets/dogs/white-lab.jpg";


function getDogImage(dog) {
  const breed = dog.breed.toLowerCase();

  if (breed.includes("malinois")) {
    return malinoisImage;
  }

  if (breed.includes("lab")) {
    return whiteLabImage;
  }

  return null;
}


function DogDetail() {
  const { dogId } = useParams();
  const navigate = useNavigate();

  const [dog, setDog] = useState(null);
  const [missions, setMissions] = useState([]);

  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const [form, setForm] = useState({
    name: "",
    breed: "",
    role: "",
    gender: "",
    age: "",
    call_sign: "",
    notes: "",
  });


  const loadDog = useCallback(async () => {
    const [dogResponse, missionResponse] = await Promise.all([
      api.get(`/dogs/${dogId}/`),
      api.get("/missions/"),
    ]);

    setDog(dogResponse.data);
    setMissions(missionResponse.data);

    setForm({
      name: dogResponse.data.name || "",
      breed: dogResponse.data.breed || "",
      role: dogResponse.data.role || "",
      gender: dogResponse.data.gender || "",
      age: dogResponse.data.age || "",
      call_sign: dogResponse.data.call_sign || "",
      notes: dogResponse.data.notes || "",
    });
  }, [dogId]);


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDog();
  }, [loadDog]);


  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }


  async function updateDog(event) {
    event.preventDefault();

    setUpdateError("");
    setUpdateSuccess("");

    try {
      const response = await api.patch(
        `/dogs/${dogId}/`,
        {
          ...form,
          age: Number(form.age),
        }
      );

      setDog(response.data);
      setUpdateSuccess("Dog updated successfully.");
    } catch (error) {
      console.error("Dog update failed:", error);

      setUpdateError(
        "Dog update failed. Please try again."
      );
    }
  }


  async function deleteDog() {
    setDeleteError("");

    try {
      await api.delete(`/dogs/${dogId}/`);
      navigate("/dogs");
    } catch (error) {
      console.error("Dog deletion failed:", error);

      setDeleteError(
        "Dog deletion failed. Please try again."
      );
    }
  }


  if (!dog) {
    return <p>Loading dog...</p>;
  }


  const earnedBadgeMissions = missions.filter(
    (mission) =>
      mission.dog === dog.id &&
      mission.badge_name
  );


  return (
    <section>
      <h1>{dog.name}</h1>

      {getDogImage(dog) && (
        <img
          className="dog-image"
          src={getDogImage(dog)}
          alt={`${dog.name}, ${dog.breed}`}
        />
      )}


      <div>
        <p>
          Breed: {dog.breed}
        </p>

        <p>
          Role: {dog.role}
        </p>

        <p>
          Gender: {dog.gender === "male" ? "Male" : "Female"}
        </p>

        <p>
          Age: {dog.age}
        </p>

        <p>
          Call sign: {dog.call_sign || "None"}
        </p>

        {dog.notes && (
          <p>
            Notes: {dog.notes}
          </p>
        )}
      </div>


      <form onSubmit={updateDog}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <input
          name="breed"
          value={form.breed}
          onChange={handleChange}
          placeholder="Breed"
          required
        />

        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
          required
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          name="age"
          type="number"
          min="0"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />

        <input
          name="call_sign"
          value={form.call_sign}
          onChange={handleChange}
          placeholder="Call sign"
        />

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
        />

        <button type="submit">
          Update Dog
        </button>
      </form>


      {updateSuccess && (
        <p className="message success-message">
          {updateSuccess}
        </p>
      )}

      {updateError && (
        <p className="message error-message">
          {updateError}
        </p>
      )}


      <section>
        <h2>Earned Mission Badges</h2>

        {earnedBadgeMissions.length > 0 ? (
          <div className="card-grid">
            {earnedBadgeMissions.map((mission) => (
              <div key={mission.id}>
                <BadgeDisplay badge={mission} />

                <p>
                  Mission: {mission.title}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>
            No mission badges earned yet.
          </p>
        )}
      </section>


      {deleteError && (
        <p className="message error-message">
          {deleteError}
        </p>
      )}


      <button
        className="danger-button"
        onClick={deleteDog}
      >
        Delete Dog
      </button>
    </section>
  );
}


export default DogDetail;