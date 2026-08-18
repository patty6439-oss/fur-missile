import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
 
import api from "../api/api"; 
 
 
function Login() { 
  const navigate = useNavigate(); 
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
      const response = await api.post("/accounts/login/", form); 
      localStorage.setItem("token", response.data.token); 
      navigate("/dogs"); 
    } catch (err) { 
      setError("Login failed."); 
      console.error(err); 
    } 
  } 
 
  return ( 
    <section> 
      <h1>Login</h1> 
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
        <button type="submit">Login</button> 
      </form> 
      {error && <p>{error}</p>} 
      <p><Link to="/register">Need an account?</Link></p> 
    </section> 
  ); 
} 
 
export default Login;