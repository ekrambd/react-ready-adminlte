import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditRider() {
  const { id } = useParams(); // get rider id from URL
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [rider, setRider] = useState({
    rider_name: "",
    rider_phone: "",
    rider_email: "",
    area_address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch single rider
  const fetchRider = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${baseURL}/api/v1/courierriders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setRider(res.data.rider); // adjust based on your API response
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch rider");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRider();
  }, []);

  const handleChange = (e) => {
    setRider({ ...rider, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`${baseURL}/api/v1/courierriders/${id}`, rider, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message || "Rider updated successfully!");
      navigate("/riders");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 422) {
        setErrors(err.response.data.data || {});
      }
      toast.error(err.response?.data?.message || "Failed to update rider");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <div className="content-wrapper p-4" style={{ minHeight: "100vh" }}>
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="content-header">
          <div className="container-fluid">
            <h3 className="m-0">Edit Rider</h3>
          </div>
        </div>

        <section className="content mt-3">
          <div className="container-fluid">
            <div className="card card-success">
              <div className="card-header">
                <h3 className="card-title">Edit Rider</h3>
              </div>

              {loading ? (
                <div className="p-3 text-center">Loading...</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="card-body">

                    {/* Rider Name */}
                    <div className="form-group">
                      <label htmlFor="rider_name">Rider Name</label>
                      <input
                        type="text"
                        id="rider_name"
                        name="rider_name"
                        className={`form-control ${errors.rider_name ? "is-invalid" : ""}`}
                        placeholder="Enter Rider Name"
                        value={rider.rider_name}
                        onChange={handleChange}
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
                        name="rider_email"
                        className={`form-control ${errors.rider_email ? "is-invalid" : ""}`}
                        placeholder="Enter Rider Email"
                        value={rider.rider_email}
                        onChange={handleChange}
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
                        name="rider_phone"
                        className={`form-control ${errors.rider_phone ? "is-invalid" : ""}`}
                        placeholder="Enter Rider Phone"
                        value={rider.rider_phone}
                        onChange={handleChange}
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
                        name="area_address"
                        id="area_address"
                        className={`form-control ${errors.area_address ? "is-invalid" : ""}`}
                        placeholder="Enter Address"
                        value={rider.area_address}
                        onChange={handleChange}
                      ></textarea>
                      {errors.area_address && (
                        <div className="invalid-feedback">{errors.area_address[0]}</div>
                      )}
                    </div>
                  </div>

                  <div className="card-footer">
                    <button
                      type="submit"
                      className="btn btn-success btn-block"
                      disabled={loading}
                    >
                      {loading ? "Please Wait..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
