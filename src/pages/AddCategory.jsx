import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"; // <-- Import here
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const categories = JSON.parse(localStorage.getItem("categories") || "[]");
    categories.push({ id: Date.now(), name });
    localStorage.setItem("categories", JSON.stringify(categories));
    alert("Category Added Successfully!");
    setName("");
    navigate("/categories");
  };

  return (
    <div className="wrapper">
      <Navbar /> {/* Navbar reused here */}
      <Sidebar />

      <div className="content-wrapper p-4" style={{ minHeight: "100vh" }}>
        <div className="content-header">
          <div className="container-fluid">
            <h3 className="m-0">Add Category</h3>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">New Category</h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="form-group">
                    <label>Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter category name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
