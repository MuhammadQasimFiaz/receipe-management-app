import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Social icons from react-icons
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 text-white p-4 bg-black bg-opacity-40">
      <div className="flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-2xl font-bold">
          <span>Logo</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex space-x-6">
          <Link to='/' className="hover:text-gray-400">
            Home
          </Link>
          <Link to='/recipeList' className="hover:text-gray-400">
            Recipes
          </Link>
          <Link to='/about' className="hover:text-gray-400">
            About
          </Link>
          <Link to='contact' className="hover:text-gray-400">
            Contact
          </Link>
        </nav>

        {/* Right: Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-2xl hover:text-gray-400" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-2xl hover:text-gray-400" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl hover:text-gray-400" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
