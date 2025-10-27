import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword() {
  const navigate = useNavigate();

  // Form state
  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

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
      current_password,
      new_password,
      confirm_password
    };

    try {
      const response = await fetch("http://13.232.229.171/api/v1/agent-change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        toast.success(data.message || "Change Password!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        // Redirect after short delay
        setTimeout(() => navigate("/change/password"), 2000);
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
            <h3 className="m-0">Change Password</h3>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Change Password</h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="card-body">

                  {/* Current Password */}
                  <div className="form-group">
                    <label htmlFor="current_password">Current Password</label>
                    <input
                      type="password"
                      id="current_password"
                      className={`form-control ${errors.current_password ? "is-invalid" : ""}`}
                      placeholder="Current Password"
                      value={current_password}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    {errors.current_password && (
                      <div className="invalid-feedback">{errors.current_password[0]}</div>
                    )}
                  </div>

                  {/* New Password*/}
                  <div className="form-group">
                    <label htmlFor="new_password">New Password</label>
                    <input
                      type="password"
                      id="new_password"
                      className={`form-control ${errors.new_password ? "is-invalid" : ""}`}
                      placeholder="New Password"
                      value={new_password}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    {errors.new_password && (
                      <div className="invalid-feedback">{errors.new_password[0]}</div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="form-group">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm_password"
                      className={`form-control ${errors.confirm_password ? "is-invalid" : ""}`}
                      placeholder="Confirm Password"
                      value={confirm_password}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {errors.confirm_password && (
                      <div className="invalid-feedback">{errors.confirm_password[0]}</div>
                    )}
                  </div>

                </div>

                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading ? "Please Wait..." : "Change Password"}
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
