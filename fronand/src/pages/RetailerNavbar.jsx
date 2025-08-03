import React from "react";
import { useNavigate } from "react-router-dom";

const RetailerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens or localStorage if used
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-purple-700 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">Retailer Panel</div>
      
      <div className="flex gap-4">
        <button
          className="bg-white text-purple-700 px-4 py-2 rounded-md hover:bg-purple-100 transition"
          onClick={() => navigate("/retailer-dashboard")}
        >
          Dashboard
        </button>
        <button
          className="bg-white text-purple-700 px-4 py-2 rounded-md hover:bg-purple-100 transition"
          onClick={() => navigate("/retailer-profile")}
        >
          Profile
        </button>
        <button
          className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default RetailerNavbar;
