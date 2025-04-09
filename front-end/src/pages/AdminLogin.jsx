import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://renting-vechiles-backend.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const userData = res.data;

      if (userData.role !== "Admin") {
        alert("Access denied: Not an admin account");
        return;
      }

      localStorage.setItem("token", userData.token);
      login(userData); // we pass the whole userData
      navigate("/admin");
    } catch (error) {
      console.error("Admin login failed:", error);
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          🔐 Admin Login
        </h2>
        <form className="space-y-4" onSubmit={handleAdminLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200"
          >
            Login as Admin
          </button>

          <div className="text-gray-800 text-center space-y-2">
            <p>
              Not an Admin?{" "}
              <Link to="/login" className="text-blue-600 underline">
                Go to User Login
              </Link>
            </p>
            <p>
              Don’t have an Admin account?{" "}
              <Link to="/admin-register" className="text-blue-600 underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
