import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  const [categoryOpen, setCategoryOpen] = useState(false);

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

            {/* Categories Dropdown */}
            <li className={`nav-item ${categoryOpen ? "menu-open" : ""}`}>
              <a
                href="#"
                className="nav-link"
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <i className="nav-icon fas fa-list"></i>
                <p>
                  Categories
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>

              <ul
                className="nav nav-treeview"
                style={{ display: categoryOpen ? "block" : "none" }}
              >
                <li className="nav-item">
                  <Link to="/categories/add" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Category</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/categories" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>All Categories</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* End Categories Dropdown */}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
