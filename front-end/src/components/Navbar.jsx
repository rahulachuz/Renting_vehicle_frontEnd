import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const isAdmin = user?.role?.toLowerCase() === "admin";
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Toggle Mobile Menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // ✅ Handle Logout with role-based redirection
  const handleLogout = () => {
    const role = user?.role?.toLowerCase();
    console.log("Logging out user with role:", role); // Debug log

    logout();
    setIsOpen(false);

    if (role === "admin") {
      navigate("/admin-login");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <nav>
        <div className="flex justify-between items-center p-6 bg-black text-gray-300">
          {/* Logo */}
          <Link to="/">
            <img className="w-24" src={logo} alt="Logo" />
          </Link>

          {/* Hamburger Icon */}
          <button onClick={toggleMenu} className="lg:hidden focus:outline-none">
            {isOpen ? (
              <span className="text-3xl">&times;</span>
            ) : (
              <RxHamburgerMenu className="text-3xl" />
            )}
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link
              to="/"
              className="relative text-gray-300 hover:text-white transition duration-300 pb-1 hover:after:w-full after:w-0 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:transition-all after:duration-300"
            >
              Home
            </Link>

            {!isAdmin && (
              <Link
                to="/history"
                className="relative text-gray-300 hover:text-white transition duration-300 pb-1 hover:after:w-full after:w-0 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:transition-all after:duration-300"
              >
                Booking History
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className="relative text-gray-300 hover:text-white transition duration-300 pb-1 hover:after:w-full after:w-0 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:transition-all after:duration-300"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link
                  className="hover:border-gray-600 border border-transparent px-6 py-2 rounded-lg transition duration-300 "
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="hover:border-gray-600 border border-transparent px-6 py-2 rounded-lg transition duration-300"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ✅ Mobile Menu Options */}
        {isOpen && (
          <div className="lg:hidden bg-zinc-900 text-white p-4 flex flex-col space-y-4 absolute top-[80px] left-60 w-[200px] z-50">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            {!isAdmin && (
              <Link to="/history" onClick={() => setIsOpen(false)}>
                Booking History
              </Link>
            )}

            {isAdmin && (
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-red-500 "
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
