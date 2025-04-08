// src/components/ProductList.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProductList() {
  // ✅ Get vehicles and getVehicles from AuthContext
  const { vehicles, getVehicles } = useContext(AuthContext);

  // ✅ State to track how many products to show initially
  const [showAll, setShowAll] = useState(false);

  // ✅ Fetch vehicles on component load
  useEffect(() => {
    getVehicles();
    console.log("✅ getVehicles called successfully!");
  }, []);

  // ✅ Show only 6 products initially, show all if showAll is true
  const displayedVehicles = showAll ? vehicles : vehicles.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* ✅ Page Heading */}
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        🚗 Available Vehicles
      </h1>

      {/* ✅ Check if vehicles are available */}
      {vehicles.length === 0 ? (
        <p className="text-center text-gray-500">No vehicles available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ✅ Loop through displayed vehicles and display cards */}
            {displayedVehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105 duration-300"
              >
                {/* ✅ Click to view product details */}
                <Link to={`/list/${vehicle._id}`}>
                  <div className="relative">
                    <img
                      src={vehicle.imageUrl}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-full h-56 object-cover"
                    />
                    {/* ✅ Badge for Availability */}
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 text-sm font-semibold text-white rounded-full ${
                        vehicle.availability ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {vehicle.availability ? "Available" : "Not Available"}
                    </span>
                  </div>
                </Link>

                {/* ✅ Vehicle Details */}
                <div className="p-5">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm">
                    {vehicle.description || "No description available"}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-green-600 font-bold text-lg">
                      ₹{vehicle.pricePerDay}/day
                    </p>

                    {/* ✅ Book Now Button */}
                    <Link
                      to={`/list/${vehicle._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Show Button only if there are more than 6 products */}
          {vehicles.length > 6 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                {showAll ? "Show Less" : "Show All"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;
