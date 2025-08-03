import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RALogo from "../components/RAlogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate(); // ✅ This was missing

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <RALogo />
        </div>

        <ul className="hidden md:flex gap-6 text-white font-medium">
          <li><Link to="/" className="hover:text-orange-300"> Home </Link></li>
          <li><a href="#business" className="hover:text-orange-300">About</a></li>
          <li><a href="#services" className="hover:text-orange-300">Service</a></li>
          <li><a href="#pricing" className="hover:text-orange-300">White Label</a></li>
          <li><Link to="/contact" className="hover:text-orange-300">Contact</Link></li>
          <li><a href="#partner" className="hover:text-orange-300">Partner</a></li>
        </ul>

        <div className="hidden md:flex gap-3">
          <button
            className="bg-white text-black px-5 py-2 rounded-full font-semibold"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
          <button
            className="bg-white text-black px-5 py-2 rounded-full font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-3 space-y-3 text-white text-center font-medium">
          <ul className="space-y-2">
            <li><a href="#home" className="text-orange-400 font-bold">Home</a></li>
            <li><a href="#business">About</a></li>
            <li><a href="#services">Service</a></li>
            <li><a href="#pricing">White Label</a></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#partner">Partner</a></li>
          </ul>
          <div className="space-x-2 pt-2">
            <button onClick={() => navigate("/signup")} className="bg-white text-black px-5 py-2 rounded-full font-semibold">Signup</button>
            <button onClick={() => navigate("/login")} className="bg-white text-black px-5 py-2 rounded-full font-semibold">Login</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
