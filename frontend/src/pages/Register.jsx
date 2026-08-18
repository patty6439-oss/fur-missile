import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
 
import api from "../api/api"; 
 
 
function Register() { 
  const navigate = useNavigate(); 
  const [form, setForm] = useState({ 
    email: "", 
    username: "", 
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
    await api.post("users/register/", form);
    navigate("/login");
  } catch (err) {
    setError(
      err.response?.data?.detail ||
      err.response?.data?.error ||
      "Registration failed."
    );
    console.error(err);
  }
}
 
  return ( 
    <section> 
      <h1>Register</h1> 
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
          name="username" 
          placeholder="Username" 
          value={form.username} 
          onChange={handleChange} 
        /> 
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
          required 
        /> 
        <button type="submit">Register</button> 
      </form> 
      {error && <p>{error}</p>} 
      <p><Link to="/login">Already have an account?</Link></p> 
    </section> 
  ); 
} 
 
export default Register; 