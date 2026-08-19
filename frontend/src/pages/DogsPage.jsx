import { useEffect, useState } from "react";

import api from "../api/api";

import malinoisImage from "../assets/dogs/malinois.jpeg";
import whiteLabImage from "../assets/dogs/white-lab.jpeg";


const emptyDog = {
  name: "",
  breed: "",
  role: "",
  age: "",
  call_sign: "",
  notes: "",
};


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


function DogsPage() {
  const [dogs, setDogs] = useState([]);
  const [form, setForm] = useState(emptyDog);

  async function loadDogs() {
    const response = await api.get("/dogs/");
    setDogs(response.data);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDogs();
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await api.post("/dogs/", {
      ...form,
      age: Number(form.age),
    });

    setForm(emptyDog);
    loadDogs();
  }

  async function deleteDog(dogId) {
    await api.delete(`/dogs/${dogId}/`);
    loadDogs();
  }

  return (
    <section>
      <h1>Working Dogs</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="breed"
          placeholder="Breed"
          value={form.breed}
          onChange={handleChange}
          required
        />

        <input
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          required
        />

        <input
          name="age"
          type="number"
          min="0"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />

        <input
          name="call_sign"
          placeholder="Call sign"
          value={form.call_sign}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">
          Add Dog
        </button>
      </form>

      {dogs.map((dog) => (
  <article key={dog.id}>

    {getDogImage(dog) && (
      <img
        className="dog-image"
        src={getDogImage(dog)}
        alt={`${dog.name}, ${dog.breed}`}
      />
    )}

          <h2>{dog.name}</h2>

          <p>
            {dog.breed} - {dog.role}
          </p>

          <p>Age: {dog.age}</p>

          <p>
            Call sign: {dog.call_sign || "None"}
          </p>

          <button onClick={() => deleteDog(dog.id)}>
            Delete
          </button>
        </article>
      ))}
    </section>
  );
}


export default DogsPage;