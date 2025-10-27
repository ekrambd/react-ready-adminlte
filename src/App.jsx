import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCategory from "./pages/AddCategory";
import AllCategories from "./pages/AllCategory";
import AddRider from "./pages/AddRider";
import AllRider from "./pages/AllRider";
import EditRider from "./pages/EditRider";
import AllOrder from "./pages/AllOrder";
import AllAgentOrder from "./pages/AllAgentOrder";
import ViewOrder from "./pages/ViewOrder";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories/add"
        element={
          <ProtectedRoute>
            <AddCategory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <AllCategories />
          </ProtectedRoute>
        }
      />


      <Route
        path="/riders/add"
        element={
          <ProtectedRoute>
            <AddRider />
          </ProtectedRoute>
        }
      />


      <Route
        path="/riders"
        element={
          <ProtectedRoute>
            <AllRider />
          </ProtectedRoute>
        }
      />


      <Route
        path="/riders/edit/:id"
        element={
          <ProtectedRoute>
            <EditRider />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <AllOrder />
          </ProtectedRoute>
        }
      />


      <Route
        path="/orders/view/:id"
        element={
          <ProtectedRoute>
            <ViewOrder />
          </ProtectedRoute>
        }
      />

      <Route
        path="/agent/orders"
        element={
          <ProtectedRoute>
            <AllAgentOrder />
          </ProtectedRoute>
        }
      />

      <Route
        path="/change/password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
      

    </Routes>

    
  );
}
