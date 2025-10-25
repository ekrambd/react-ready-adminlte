import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); // store your token on login
      const response = await fetch(
        "http://13.232.229.171/api/v1/courier-rider-signout",
        {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.status) {
        toast.success(data.message || "Logged out successfully");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button
            className="btn btn-primary font-weight-bold"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </li>
      </ul>
    </nav>
  );
}
