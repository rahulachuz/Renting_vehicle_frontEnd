import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-neutral-content p-10">
      {/* ✅ Main Container */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
        {/* ✅ About Section */}
        <div>
          <h6 className="text-white text-xl font-bold mb-3">About Us</h6>
          <p className="text-gray-400 leading-relaxed">
            We provide a seamless vehicle rental experience with a variety of
            cars to suit every journey. Discover your ideal ride with us.
          </p>
        </div>

        {/* ✅ Services Section */}
        <div>
          <h6 className="text-white text-xl font-bold mb-3">Services</h6>
          <a className="text-gray-400 block mb-2 hover:text-white transition">
            Car Rentals
          </a>
          <a className="text-gray-400 block mb-2 hover:text-white transition">
            Vehicle Insurance
          </a>
          <a className="text-gray-400 block mb-2 hover:text-white transition">
            Roadside Assistance
          </a>
          <a className="text-gray-400 block hover:text-white transition">
            Corporate Plans
          </a>
        </div>

        {/* ✅ Company Section */}
        <div>
          <h6 className="text-white text-xl font-bold mb-3">Company</h6>
          <a className="text-gray-400 block mb-2 hover:text-white transition">
            About Us
          </a>
          <a className="text-gray-400 block mb-2 hover:text-white transition">
            Contact
          </a>
          <a className="text-gray-400 block mb-2 hover:text-white transition">
            Careers
          </a>
          <a className="text-gray-400 block hover:text-white transition">
            Press Kit
          </a>
        </div>

        {/* ✅ Newsletter Section */}
        <div>
          <h6 className="text-white text-xl font-bold mb-3">Subscribe</h6>
          <p className="text-gray-400 mb-4">
            Get the latest updates and exclusive offers.
          </p>
          <div className="flex items-center justify-center sm:justify-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full rounded-l-md bg-gray-800 text-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Divider Line */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* ✅ Social Icons & Copyright */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
        {/* ✅ Social Media Links */}
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <a
            href="#"
            className="hover:text-white transition"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="hover:text-white transition"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="hover:text-white transition"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="hover:text-white transition"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        {/* ✅ Copyright Text */}
        <div className="sm:text-right flex items-center justify-center bg-blue-200">
          © {new Date().getFullYear()} Vehicle Rentals. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
