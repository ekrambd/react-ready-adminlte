import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// jQuery
import $ from "jquery";
window.$ = window.jQuery = $;

// Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// AdminLTE CSS + JS
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/dist/js/adminlte.min.js";

// FontAwesome
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
