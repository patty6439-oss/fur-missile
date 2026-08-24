import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/api";


function DogDetail() {
  const { dogId } = useParams();
  const navigate = useNavigate();

  const [dog, setDog] = useState(null);

  const [form, setForm] = useState({
    name: "",
    breed: "",
    role: "",
    age: "",
    call_sign: "",
    notes: "",
  });

  const loadDog = useCallback(async () => {
    const response = await api.get(`/dogs/${dogId}/`);

    setDog(response.data);

    setForm({
      name: response.data.name || "",
      breed: response.data.breed || "",
      role: response.data.role || "",
      age: response.data.age || "",
      call_sign: response.data.call_sign || "",
      notes: response.data.notes || "",
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

    const response = await api.patch(
      `/dogs/${dogId}/`,
      {
        ...form,
        age: Number(form.age),
      }
    );

    setDog(response.data);
  }

  async function deleteDog() {
    await api.delete(`/dogs/${dogId}/`);
    navigate("/dogs");
  }

  if (!dog) {
    return <p>Loading dog...</p>;
  }

  return (
    <section>
      <h1>{dog.name}</h1>

      <div>
        <p>Breed: {dog.breed}</p>
        <p>Role: {dog.role}</p>
        <p>Age: {dog.age}</p>
        <p>Call sign: {dog.call_sign || "None"}</p>

        {dog.notes && (
          <p>Notes: {dog.notes}</p>
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

      <button onClick={deleteDog}>
        Delete Dog
      </button>
    </section>
  );
}


export default DogDetail;
