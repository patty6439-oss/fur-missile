import { Route, Routes } from "react-router-dom" 
import "./App.css";

  
import Navbar from "./components/Navbar"

import ProtectedRoute from "./components/ProtectedRoute" 

import HomePage from "./pages/HomePage" 

import LoginPage from "./pages/LoginPage" 

import RegisterPage from "./pages/RegisterPage" 

import DogsPage from "./pages/DogsPage" 

import MissionsPage from "./pages/MissionsPage" 

import NotFoundPage from "./pages/NotFoundPage" 

import MissionDetail from "./pages/MissionDetail";

  

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dogs" element={<DogsPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route
          path="/missions/:missionId"
          element={<MissionDetail />}
        />
      </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

  

export default App 