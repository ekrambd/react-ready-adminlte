import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // your auth token

  if (!token) {
    return <Navigate to="/" replace />; // redirect if not logged in
  }

  return children;
}
