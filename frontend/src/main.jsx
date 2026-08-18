import { StrictMode } from "react"; 
import { createRoot } from "react-dom/client"; 
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import App from "./App"; 
import "./index.css"; 
import Home from "./pages/Home"; 
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import DogsPage from "./pages/DogsPage"; 
import MissionsPage from "./pages/MissionsPage"; 
import MissionDetail from "./pages/MissionDetail"; 
import NotFound from "./pages/NotFound"; 
import ProtectedRoute from "./components/ProtectedRoute"; 
 
const router = createBrowserRouter([ 
  { 
    path: "/", 
    element: <App />, 
    errorElement: <NotFound />, 
    children: [ 
      { index: true, element: <Home /> }, 
      { path: "login", element: <Login /> }, 
      { path: "register", element: <Register /> }, 
      { 
        path: "dogs", 
        element: <ProtectedRoute><DogsPage /></ProtectedRoute>, 
      }, 
      { 
        path: "missions", 
        element: <ProtectedRoute><MissionsPage /></ProtectedRoute>, 
      }, 
      { 
        path: "missions/:missionId", 
        element: <ProtectedRoute><MissionDetail /></ProtectedRoute>, 
      }, 
    ], 
  }, 
]); 
 
createRoot(document.getElementById("root")).render( 
  <StrictMode> 
    <RouterProvider router={router} /> 
  </StrictMode> 
); 
