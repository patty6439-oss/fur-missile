import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/api";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    api
      .get("users/info/")
      .then(() => {
        if (active) setStatus("allowed");
      })
      .catch(() => {
        if (active) setStatus("denied");
      });

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return <p>Checking session...</p>;
  }

  if (status === "denied") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;