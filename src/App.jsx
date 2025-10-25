import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCategory from "./pages/AddCategory";
import AllCategories from "./pages/AllCategory";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categories/add" element={<AddCategory />} />
      <Route path="/categories" element={<AllCategories />} />
    </Routes>
  );
}
