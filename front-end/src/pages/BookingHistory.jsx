import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          "https://renting-vechiles-backend.onrender.com/api/bookings/mybookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log("📦 Bookings data:", data); // Debug log
        setBookings(data);
      } catch (error) {
        console.error("❌ Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 text-gray-600">
      <h1 className="text-3xl font-bold mb-6">🚗 My Booking History</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            const vehicle = booking.vehicle;
            console.log("🖼️ Vehicle Image URL:", vehicle.imageUrl); // Log image URL

            return (
              <div
                key={booking._id}
                className="border p-5 rounded-lg shadow-md bg-white"
              >
                <img
                  src={vehicle.imageUrl}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-48 object-cover rounded-md mb-3"
                  onError={(e) => {
                    console.warn("⚠️ Image failed to load:", e.target.src);
                    e.target.src =
                      "https://via.placeholder.com/400x200?text=Image+Not+Found";
                  }}
                />
                <h2 className="text-xl font-semibold mb-1">
                  {vehicle.make} {vehicle.model}
                </h2>
                <p className="text-gray-700 mb-1">
                  📅 From: {new Date(booking.startDate).toLocaleDateString()}
                  <br />
                  📅 To: {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p className="text-green-600 font-bold">
                  ₹{booking.totalPrice}
                </p>
              </div>
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BookingHistory;
