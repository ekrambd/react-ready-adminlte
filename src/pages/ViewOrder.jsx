import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [order, setOrder] = useState({
    user_id: "",
    courierrider_id: "",
    division_id: "",
    area_type: "",
    charge_amount: "",
    weight: "",
    document_type: "",
    date: "",
    delivery_full_address: "",
    guide_pickup_location: "",
    pay_by: "",
    pickup_type: "",
    district: {},
    division: {},
    union: {},
    upazila: {},
    courierrider: {},
  });

  const [loading, setLoading] = useState(false);

  // Fetch single rider
  const fetchOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${baseURL}/api/v1/courier-order-details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setOrder(res.data.data); // adjust based on your API response
      console.log(res.data);
      //return;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch rider");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

//   const handleChange = (e) => {
//     setOrder({ ...order, [e.target.name]: e.target.value });
//   };

  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <div className="content-wrapper p-4" style={{ minHeight: "100vh" }}>
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="content-header">
          <div className="container-fluid">
            <h3 className="m-0">View Order</h3>
          </div>
        </div>

        <section className="content mt-3">
          <div className="container-fluid">
            <div className="card card-success">
              <div className="card-header">
                <h3 className="card-title">View Order</h3>
              </div>

              {loading ? (
                <div className="p-3 text-center">Loading...</div>
              ) : (
                <div className="card-body">
                   <table className="table table-bordered table-striped text-center">
                    <tbody>
                        <tr><td>Order Date:</td><td>{order.date || 'N/A'}</td></tr>
                        <tr><td>Order Time:</td><td>{order.time || 'N/A'}</td></tr>
                        <tr><td>Area Type:</td><td>{order.area_type || 'N/A'}</td></tr>
                        <tr><td>Order ID:</td><td>{order.id || 'N/A'}</td></tr>
                        <tr><td>Rider:</td><td>{order.courierrider !== null?`${order.courierrider.rider_name} (${order.courierrider.rider_phone})`:"-"}</td></tr>
                        <tr><td>Receiver Name:</td><td>{order.receiver_name || 'N/A'}</td></tr>
                        <tr><td>Receiver Phone:</td><td>{order.receiver_phone || 'N/A'}</td></tr>
                        <tr><td>Weight:</td><td>{order.weight ? `${order.weight} KG` : 'N/A'}</td></tr>
                        <tr><td>Document Type:</td><td>{order.document_type || 'N/A'}</td></tr>
                        <tr><td>Guide Pickup Location:</td><td>{order.guide_pickup_location || 'N/A'}</td></tr>
                        <tr><td>Pay By:</td><td>{order.pay_by || 'N/A'}</td></tr>
                        <tr><td>Pickup Type:</td><td>{order.pickup_type || 'N/A'}</td></tr>
                        <tr><td>Delivery Full Address:</td><td>{order.delivery_full_address || 'N/A'}</td></tr>
                        <tr><td>Division:</td><td>{order.division?.name || 'N/A'}</td></tr>
                        <tr><td>District:</td><td>{order.district?.name || 'N/A'}</td></tr>
                        <tr><td>Sub District:</td><td>{order.upazila?.name || 'N/A'}</td></tr>
                        <tr><td>Union:</td><td>{order.union?.name || 'N/A'}</td></tr>
                        <tr><td>Total:</td><td>{order.charge_amount ? `${order.charge_amount} BDT` : 'N/A'}</td></tr>
                    </tbody>
                    </table>

                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
