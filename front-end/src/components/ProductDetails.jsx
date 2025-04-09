import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ Use AuthContext

  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // ✅ Fetch Vehicle Details
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const { data } = await axios.get(
          `https://renting-vechiles-backend.onrender.com/api/vehicles/${id}`
        );
        setVehicle(data);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }
    };
    fetchVehicle();
  }, [id]);

  // ✅ Calculate Total Price
  useEffect(() => {
    if (startDate && endDate && vehicle) {
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      setTotalPrice(days * vehicle.pricePerDay);
    }
  }, [startDate, endDate, vehicle]);

  // ✅ Handle Booking + Stripe Redirect
  const handleBooking = async () => {
    if (!user) {
      alert("⚠️ Please login to book a vehicle.");
      return navigate("/login");
    }

    if (!startDate || !endDate) {
      return alert("⚠️ Please select both start and end dates.");
    }

    const token = localStorage.getItem("token");

    try {
      // 1️⃣ Create Booking
      const bookingData = {
        vehicle: vehicle._id,
        startDate,
        endDate,
        totalPrice,
      };

      const bookingRes = await axios.post(
        "https://renting-vechiles-backend.onrender.com/api/bookings",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const booking = bookingRes.data;

      // 2️⃣ Create Stripe Checkout session
      const paymentRes = await axios.post(
        "https://renting-vechiles-backend.onrender.com/api/payment/checkout",
        {
          vehicleId: booking.vehicle,
          amount: booking.totalPrice,
          vehicleName: `${vehicle.make} ${vehicle.model}`,
          userEmail: user.email || "", // optional
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // 3️⃣ Redirect to Stripe
      window.location.href = paymentRes.data.url;
    } catch (error) {
      console.error("❌ Error during booking/payment:", error);
      alert("❌ Something went wrong. Check console for details.");
    }
  };

  if (!vehicle) {
    return (
      <p className="text-center text-gray-500">Loading vehicle details...</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-white shadow-xl rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side - Image */}
      <div>
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-96 object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Right Side - Details */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            {vehicle.make} {vehicle.model}
          </h1>
          <p className="text-gray-500 text-lg mb-4">Year: {vehicle.year}</p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {vehicle.description}
          </p>

          <div className="text-xl font-semibold text-green-600 mb-6">
            ₹{vehicle.pricePerDay}{" "}
            <span className="text-sm text-gray-600">/day</span>
          </div>

          {/* Date Pickers */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                className="w-full p-2 border rounded-md bg-white text-black"
                placeholderText="Select start date"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || new Date()}
                className="w-full p-2 border rounded-md bg-white text-black"
                placeholderText="Select end date"
              />
            </div>
          </div>

          {/* Total Price */}
          {startDate && endDate && (
            <p className="mt-6 text-lg font-semibold text-gray-700">
              Total: <span className="text-green-600">₹{totalPrice}</span>
            </p>
          )}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleBooking}
          className="mt-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-blue-900 transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
