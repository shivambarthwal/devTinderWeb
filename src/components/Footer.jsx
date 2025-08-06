import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link to="/about" className="hover:text-yellow-300 transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">
            Contact
          </Link>
          <Link to="/jobs" className="hover:text-yellow-300 transition">
            Jobs
          </Link>
          <Link to="/press" className="hover:text-yellow-300 transition">
            Press Kit
          </Link>
        </nav>

        <div className="flex gap-6">
          <Link to="#" className="hover:text-yellow-300 transition">
            <FaTwitter size={24} />
          </Link>

          <Link to="#" className="hover:text-yellow-300 transition">
            <FaYoutube size={24} />
          </Link>

          <Link to="#" className="hover:text-yellow-300 transition">
            <FaFacebookF size={24} />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm opacity-90">
          © {new Date().getFullYear()} DevTinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
