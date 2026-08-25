import { Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DogsPage from "./pages/DogsPage";
import DogDetail from "./pages/DogDetail";
import MissionsPage from "./pages/MissionsPage";
import MissionDetail from "./pages/MissionDetail";
import TrainingPage from "./pages/TrainingPage";
import AwardsPage from "./pages/AwardsPage";
import NotFoundPage from "./pages/NotFoundPage";


function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dogs" element={<DogsPage />} />

            <Route path="/dogs/:dogId" element={<DogDetail />} />

            <Route path="/missions" element={<MissionsPage />} />

            <Route
              path="/missions/:missionId"
              element={<MissionDetail />}
            />

            <Route path="/training" element={<TrainingPage />} />

            <Route path="/awards" element={<AwardsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}


export default App;