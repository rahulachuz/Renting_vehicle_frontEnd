import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VehicleList from "./pages/VehicleList";
import ProductDetails from "./components/ProductDetails";
import BookingHistory from "./pages/BookingHistory";
import AdminDashboard from "./admin/AdminDashboard";
import AdminBookings from "./pages/AdminBookings"; // ✅ Import Admin Bookings Page
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";

import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // ✅ Hide Navbar on login/register/admin-login/admin-register pages
  const hideNavbarRoutes = [
    "/login",
    "/register",
    "/admin-login",
    "/admin-register",
  ];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/list" element={<VehicleList />} />
        <Route path="/list/:id" element={<ProductDetails />} />
        <Route path="/history" element={<BookingHistory />} />

        {/* ✅ Admin Auth Routes */}
        <Route
          path="/admin-login"
          element={!user ? <AdminLogin /> : <Navigate to="/admin" />}
        />
        <Route
          path="/admin-register"
          element={!user ? <AdminRegister /> : <Navigate to="/admin" />}
        />

        {/* ✅ Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            user && user.role?.toLowerCase() === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/bookings"
          element={
            user && user.role?.toLowerCase() === "admin" ? (
              <AdminBookings />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* ✅ Add these if you later implement them */}
        {/* 
        <Route path="/admin/vehicles" element={...} />
        <Route path="/admin/users" element={...} />
        */}

        {/* ✅ Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
