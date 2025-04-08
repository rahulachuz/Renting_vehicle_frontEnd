// src/admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🛠️ Admin Dashboard</h1>
      <div className="space-y-4">
        <Link
          to="/admin/vehicles"
          className="block text-blue-600 hover:underline"
        >
          ➕ Manage Vehicles
        </Link>
        <Link
          to="/admin/bookings"
          className="block text-blue-600 hover:underline"
        >
          📦 View All Bookings
        </Link>
        <Link to="/admin/users" className="block text-blue-600 hover:underline">
          👤 Manage Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
