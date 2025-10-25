import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"; // <-- Import Navbar

export default function AllCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("categories") || "[]");
    setCategories(data);
  }, []);

  const handleDelete = (id) => {
    const updated = categories.filter((cat) => cat.id !== id);
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
  };

  return (
    <div className="wrapper" style={{ minHeight: "100vh" }}>
      <Navbar /> {/* Navbar added */}
      <Sidebar />

      <div
        className="content-wrapper p-4"
        style={{ minHeight: "calc(100vh - 56px - 56px)" }} // Adjust for header + footer
      >
        <div className="content-header">
          <div className="container-fluid">
            <h3 className="m-0">All Categories</h3>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body table-responsive">
                <table className="table table-striped table-bordered bg-primary text-light text-center">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Category Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center">
                          No categories found.
                        </td>
                      </tr>
                    ) : (
                      categories.map((cat) => (
                        <tr key={cat.id}>
                          <td>{cat.id}</td>
                          <td>{cat.name}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(cat.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
