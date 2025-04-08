import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://renting-vechiles-backend.onrender.com/api/auth/register",
        {
          ...formData,
          role: "Admin", // Important: Set Admin role here
        }
      );

      if (res.status === 201) {
        alert("Admin registered successfully!");
        navigate("/admin-login");
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Admin registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          📝 Admin Registration
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-600"
              placeholder="Admin name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-600"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-600"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Register Admin
          </button>
          <div className="text-center text-gray-700 mt-2">
            Already have an account?{" "}
            <Link to="/admin-login" className="text-blue-600 underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
