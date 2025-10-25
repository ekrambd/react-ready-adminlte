import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddRider() {
  const navigate = useNavigate();

  // Form state
  const [rider_name, setRiderName] = useState("");
  const [rider_email, setRiderEmail] = useState("");
  const [rider_phone, setRiderPhone] = useState("");
  const [area_address, setAreaAddress] = useState("");

  // UI state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in!");
      setLoading(false);
      return;
    }

    const payload = {
      rider_name,
      rider_email,
      rider_phone,
      area_address,
    };

    try {
      const response = await fetch("http://13.232.229.171/api/v1/courierriders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        toast.success(data.message || "Rider added successfully!");
        setRiderName("");
        setRiderEmail("");
        setRiderPhone("");
        setAreaAddress("");

        // Redirect after short delay
        setTimeout(() => navigate("/riders/add"), 2000);
      } else if (response.status === 422) {
        // Laravel validation error
        setErrors(data.data || {});
        toast.error(data.message || "Please fix the highlighted errors");
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />
      <Sidebar />

      <div className="content-wrapper p-4" style={{ minHeight: "100vh" }}>
        <div className="content-header">
          <div className="container-fluid">
            <h3 className="m-0">Add Rider</h3>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">New Rider</h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="card-body">

                  {/* Rider Name */}
                  <div className="form-group">
                    <label htmlFor="rider_name">Rider Name</label>
                    <input
                      type="text"
                      id="rider_name"
                      className={`form-control ${errors.rider_name ? "is-invalid" : ""}`}
                      placeholder="Enter Rider Name"
                      value={rider_name}
                      onChange={(e) => setRiderName(e.target.value)}
                      required
                    />
                    {errors.rider_name && (
                      <div className="invalid-feedback">{errors.rider_name[0]}</div>
                    )}
                  </div>

                  {/* Rider Email */}
                  <div className="form-group">
                    <label htmlFor="rider_email">Rider Email</label>
                    <input
                      type="email"
                      id="rider_email"
                      className={`form-control ${errors.rider_email ? "is-invalid" : ""}`}
                      placeholder="Enter Rider Email"
                      value={rider_email}
                      onChange={(e) => setRiderEmail(e.target.value)}
                    />
                    {errors.rider_email && (
                      <div className="invalid-feedback">{errors.rider_email[0]}</div>
                    )}
                  </div>

                  {/* Rider Phone */}
                  <div className="form-group">
                    <label htmlFor="rider_phone">Rider Phone</label>
                    <input
                      type="text"
                      id="rider_phone"
                      className={`form-control ${errors.rider_phone ? "is-invalid" : ""}`}
                      placeholder="Enter Rider Phone"
                      value={rider_phone}
                      onChange={(e) => setRiderPhone(e.target.value)}
                      required
                    />
                    {errors.rider_phone && (
                      <div className="invalid-feedback">{errors.rider_phone[0]}</div>
                    )}
                  </div>

                  {/* Area Address */}
                  <div className="form-group">
                    <label htmlFor="area_address">Area Address</label>
                    <textarea
                      className={`form-control ${errors.area_address ? "is-invalid" : ""}`}
                      id="area_address"
                      placeholder="Enter Address"
                      value={area_address}
                      onChange={(e) => setAreaAddress(e.target.value)}
                    ></textarea>
                    {errors.area_address && (
                      <div className="invalid-feedback">{errors.area_address[0]}</div>
                    )}
                  </div>
                </div>

                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading ? "Adding Rider..." : "Add Rider"}
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
