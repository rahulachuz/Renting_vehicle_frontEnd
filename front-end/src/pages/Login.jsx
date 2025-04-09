import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://renting-vechiles-backend.onrender.com/api/auth/login",
        { email, password }
      );

      const userData = res.data;

      localStorage.setItem("token", userData.token);
      login(userData);

      // redirect based on role
      if (userData.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
        {/* 🔐 Admin Login Redirect */}
        <div
          className="absolute top-2 right-3 text-sm text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate("/admin-login")}
        >
          Admin Login
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
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
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200"
          >
            Login
          </button>
          <div className="text-gray-800 text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="hover:text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
