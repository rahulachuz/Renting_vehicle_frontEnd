// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    console.log("Logging out user with role:", user?.role);
    setUser(null);
    localStorage.removeItem("user");
  };

  const getVehicles = async () => {
    try {
      const res = await axios.get(
        "https://renting-vechiles-backend.onrender.com/api/vehicles"
      );

      setVehicles(res.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, vehicles, getVehicles }}
    >
      {children}
    </AuthContext.Provider>
  );
};
