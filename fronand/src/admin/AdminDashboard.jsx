import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/admin-dashboard/all-users")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          All Users
        </button>

        <button
          onClick={() => navigate("/newadduser")}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Add New User
        </button>

        <button
          onClick={() => navigate("/allinterestpancardlist")}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          All Interest PAN Card List
        </button>

        <button
          onClick={() => navigate("/allpancards")}
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
        >
          All Manual PAN Card Apply
        </button>

        <button
          onClick={() => navigate("/manual-pan-update")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        >
          All Manual PAN Card Update
        </button>

        <button
          onClick={() => navigate("/interest-pan-apply")}
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
        >
          All Interest PAN Card Apply
        </button>

        <button
          onClick={() => navigate("/interest-pan-update")}
          className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded"
        >
          All Interest PAN Card Update
        </button>

        <button
          onClick={() => navigate("/mobile-recharges")}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          All Mobile Recharge
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
