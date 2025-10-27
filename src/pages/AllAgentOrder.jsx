import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export default function AllAgentOrder() {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filters
  const [filterStatus, setFilterStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Rider modal
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isRiderModalOpen, setIsRiderModalOpen] = useState(false);

  // Fetch orders
  const fetchOrders = async (page = 1, searchText = "") => {
    setLoading(true);
    try {
      const user_id = localStorage.getItem("user_id");
      let url = `${baseURL}/api/v1/get-courier-order-lists?agent_id=${user_id}&page=${page}`;
      if (searchText) url += `&search=${encodeURIComponent(searchText)}`;
      if (filterStatus) url += `&status=${encodeURIComponent(filterStatus)}`;
      if (fromDate) url += `&from_date=${encodeURIComponent(fromDate)}`;
      if (toDate) url += `&to_date=${encodeURIComponent(toDate)}`;

      const res = await axios.get(url);
      setOrders(res.data.data || []);
      setPageCount(res.data.last_page || 0);
      setCurrentPage(res.data.current_page || 1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);

  // Pagination click
  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    fetchOrders(selectedPage, search);
  };

  // Search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrders(1, search);
  };

  // Filter
  const handleFilter = (e) => {
    e.preventDefault();
    fetchOrders(1, search);
  };

  // View
  const handleView = (id) => navigate(`/orders/view/${id}`);

  // Status update
  const handleStatusChange = async (orderId, newStatus) => {
    const oldStatus = orders.find((o) => o.id === orderId)?.status;
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    try {
      if (confirm("Do you want to change the status?")) {
        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");
        const payload = { order_id: orderId, status: newStatus, user_id };

        const res = await axios.post(
          `${baseURL}/api/v1/courier-order-status-update`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success(res.data.message || "Status updated successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: oldStatus } : o))
      );
    }
  };

  // Riders
  const fetchRiders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${baseURL}/api/v1/courierriders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRiders(res.data.data || []);
    } catch {
      toast.error("Failed to load riders");
    }
  };

  // Modal controls
  const openSetRiderModal = (orderId) => {
    setSelectedOrder(orderId);
    setSelectedRider("");
    fetchRiders();
    setIsRiderModalOpen(true);
  };

  // Assign rider
  const handleAssignRider = async () => {
    if (!selectedRider) {
      toast.warning("Please select a rider first");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${baseURL}/api/v1/set-order-rider`,
        { order_id: selectedOrder, rider_id: selectedRider },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Rider assigned successfully!");
      setIsRiderModalOpen(false);
      fetchOrders(currentPage, search);
    } catch {
      toast.error("Failed to assign rider");
    }
  };

  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <div className="content-wrapper p-4">
        <ToastContainer position="top-right" autoClose={3000} />

        <h3>All Agent Orders</h3>

        {/* Filters */}
        <form className="d-flex mb-3" onSubmit={handleFilter}>
          <select
            className="form-control me-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">-- All Status --</option>
            <option value="pending">Pending / Created</option>
            <option value="accepted_assigned">Accepted / Assigned</option>
            <option value="payment_confirmed">Payment Confirmed</option>
            <option value="awaiting_pickup">Awaiting Pickup</option>
            <option value="picked_up">Picked Up</option>
            <option value="in_transit">In Transit</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="failed_delivery_returned">Failed / Returned</option>
            <option value="awaiting_payment">Awaiting Payment</option>
          </select>
          <input
            type="date"
            className="form-control me-2"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="form-control me-2"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button className="btn btn-primary">Filter</button>
        </form>

        {/* Table */}
        <div className="card">
          <div className="card-body table-responsive">
            {loading ? (
              <div className="text-center p-3">Loading...</div>
            ) : (
              <table className="table table-striped table-bordered text-center">
                <thead className="bg-primary text-light">
                  <tr>
                    <th>ID</th>
                    <th>Rider</th>
                    <th>Agent</th>
                    <th>Receiver</th>
                    <th>Phone</th>
                    <th>Pay By</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="9">No orders found.</td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.courierrider?.rider_name || "-"}</td>
                        <td>{order.courieragent?.name || "-"}</td>
                        <td>{order.receiver_name}</td>
                        <td>{order.receiver_phone}</td>
                        <td>{order.pay_by}</td>
                        <td>{order.charge_amount} BDT</td>
                        <td>
                          <select
                            className="form-control"
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                          >
                            <option value="">-- All Status --</option>
                            <option value="pending">Pending / Created</option>
                            <option value="accepted_assigned">Accepted / Assigned</option>
                            <option value="payment_confirmed">Payment Confirmed</option>
                            <option value="awaiting_pickup">Awaiting Pickup</option>
                            <option value="picked_up">Picked Up</option>
                            <option value="in_transit">In Transit</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="failed_delivery_returned">Failed / Returned</option>
                            <option value="awaiting_payment">Awaiting Payment</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() => openSetRiderModal(order.id)}
                          >
                            Set Rider
                          </button>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleView(order.id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="card-footer d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"← Prev"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
              forcePage={currentPage - 1}
            />
          </div>
        </div>

        {/* Rider Modal */}
        <ReactModal
          isOpen={isRiderModalOpen}
          onRequestClose={() => setIsRiderModalOpen(false)}
          className="modal-container"
          overlayClassName="modal-overlay"
        >
          <h5>Assign Rider</h5>
          <select
            className="form-control my-3"
            value={selectedRider}
            onChange={(e) => setSelectedRider(e.target.value)}
          >
            <option value="">-- Select Rider --</option>
            {riders.map((r) => (
              <option key={r.id} value={r.id}>
                {r.rider_name} ({r.rider_phone})
              </option>
            ))}
          </select>
          <div className="text-end">
            <button
              className="btn btn-secondary me-2"
              onClick={() => setIsRiderModalOpen(false)}
            >
              Close
            </button>
            <button className="btn btn-success" onClick={handleAssignRider}>
              Assign Rider
            </button>
          </div>
        </ReactModal>
      </div>
      <Footer />
    </div>
  );
} 
