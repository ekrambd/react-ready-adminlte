import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout({ onLogout }) {
  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button className="btn btn-danger btn-sm" onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Sidebar */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" className="brand-link text-center">
          <span className="brand-text font-weight-light">AdminLTE React</span>
        </a>

        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  <i className="nav-icon fas fa-users"></i>
                  <p>Users</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/settings" className="nav-link">
                  <i className="nav-icon fas fa-cog"></i>
                  <p>Settings</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="content-wrapper">
        <section className="content pt-3 px-3">
          <div className="container-fluid">
            <Outlet />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="main-footer text-center">
        <strong>© 2025 AdminLTE React Dashboard</strong> All rights reserved.
      </footer>
    </div>
  );
}
