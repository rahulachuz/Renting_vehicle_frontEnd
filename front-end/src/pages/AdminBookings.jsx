// src/admin/AdminBookings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // or however you're storing it

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "https://renting-vechiles-backend.onrender.com/api/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(res.data);
      } catch (err) {
        setError("Failed to fetch bookings");
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📦 All Bookings</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="p-4 border rounded-lg shadow">
            <p>
              🚗 <strong>Vehicle:</strong> {booking.vehicle?.make}{" "}
              {booking.vehicle?.model}
            </p>
            <p>
              👤 <strong>User:</strong> {booking.user?.name} (
              {booking.user?.email})
            </p>
            <p>
              📅 <strong>From:</strong>{" "}
              {new Date(booking.startDate).toDateString()}
            </p>
            <p>
              📅 <strong>To:</strong> {new Date(booking.endDate).toDateString()}
            </p>
            <p>
              💰 <strong>Total:</strong> ₹{booking.totalPrice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
