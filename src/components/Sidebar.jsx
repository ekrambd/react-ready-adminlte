import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [riderOpen, setRiderOpen] = useState(false);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="#" className="brand-link">
        <span className="brand-text font-weight-light">AdminLTE React</span>
      </a>

      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
            {/* Dashboard */}
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>

            


            {/* Riders Dropdown */}
            <li className={`nav-item ${riderOpen ? "menu-open" : ""}`}>
              <a
                href="#"
                className="nav-link"
                onClick={() => setRiderOpen(!riderOpen)}
              >
                <i className="nav-icon fas fa-users"></i>
                <p>
                  Riders
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>

              <ul
                className="nav nav-treeview"
                style={{ display: riderOpen ? "block" : "none" }}
              >
                <li className="nav-item">
                  <Link to="/riders/add" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Rider</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/riders" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>All Riders</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* End Riders Dropdown */}

            

          </ul>
        </nav>
      </div>
    </aside>
  );
}
