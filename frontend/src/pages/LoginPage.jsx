import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../components/AuthContext";


function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");


  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }


  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await login(form);
      navigate("/dogs");
    } catch (err) {
      setError("Login failed. Check your email and password.");
      console.error(err);
    }
  }


  return (
    <section>
      <h1>Login</h1>

      <p>
        Sign in to manage your working dogs, training, and missions.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>
      </form>

      {error && (
        <p className="message error-message">
          {error}
        </p>
      )}

      <p>
        New to Fur Missile?{" "}
        <Link to="/register">
          Create an account
        </Link>
      </p>
    </section>
  );
}


export default Login;