import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css"; // optional for pagination styling

export default function AllRiders() {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [riders, setRiders] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch riders from API
  const fetchRiders = async (page = 1, searchText = "") => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let url = `${baseURL}/api/v1/courierriders?page=${page}`;
      if (searchText) {
        url += `&search=${encodeURIComponent(searchText)}`;
      }
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setRiders(res.data.data);
      setPageCount(res.data.last_page);
      setCurrentPage(res.data.current_page);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch riders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiders(1);
  }, []);

  // Handle pagination click
  const handlePageClick = (data) => {
    let selectedPage = data.selected + 1;
    fetchRiders(selectedPage, search);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchRiders(1, search);
  };

  // Handle rider delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this rider?")) return;

    try {
      const token = localStorage.getItem("token");
      let res = await axios.delete(`${baseURL}/api/v1/courierriders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message);
      // Refresh list after deletion
      fetchRiders(currentPage, search);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete rider");
    }
  };

  // Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/riders/edit/${id}`);
  };

  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <div className="content-wrapper p-4">
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="content-header d-flex justify-content-between align-items-center">
          <h3>All Riders</h3>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search Rider"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary">Search</button>
          </form>
        </div>

        <section className="content mt-3">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body table-responsive">
                {loading ? (
                  <div className="text-center p-3">Loading...</div>
                ) : (
                  <table className="table table-striped table-bordered text-center">
                    <thead className="bg-primary text-light">
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riders.length === 0 ? (
                        <tr>
                          <td colSpan="3">No riders found.</td>
                        </tr>
                      ) : (
                        riders.map((rider) => (
                          <tr key={rider.id}>
                            <td>{rider.rider_name}</td>
                            <td>{rider.rider_phone}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-success mx-2"
                                onClick={() => handleEdit(rider.id)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleDelete(rider.id)}
                              >
                                <i className="fa fa-trash"></i>
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
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
