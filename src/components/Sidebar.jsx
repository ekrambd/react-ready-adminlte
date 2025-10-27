import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [riderOpen, setRiderOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="#" className="brand-link">
        <span className="brand-text font-weight-light text-center">Agent Panel</span>
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


            {/* Orders Dropdown */}
            <li className={`nav-item ${orderOpen ? "menu-open" : ""}`}>
              <a
                href="#"
                className="nav-link"
                onClick={() => setOrderOpen(!orderOpen)}
              >
                <i className="nav-icon fas fa-list"></i>
                <p>
                  Order
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>

              <ul
                className="nav nav-treeview"
                style={{ display: orderOpen ? "block" : "none" }}
              >
                <li className="nav-item">
                  <Link to="/orders" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>All Order</p>
                  </Link>
                  <Link to="/agent/orders" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>All Agent Order</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* End Orders Dropdown */}

            {/* Orders Dropdown */}
            <li className={`nav-item ${settingsOpen ? "menu-open" : ""}`}>
              <a
                href="#"
                className="nav-link"
                onClick={() => setSettingsOpen(!settingsOpen)}
              >
                <i className="nav-icon fas fa-cog"></i>
                <p>
                  Settings
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>

              <ul
                className="nav nav-treeview"
                style={{ display: settingsOpen ? "block" : "none" }}
              >
                <li className="nav-item">
                  <Link to="/change/password" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Change Password</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* End Settings Dropdown */}


          </ul>
        </nav>
      </div>
    </aside>
  );
}
