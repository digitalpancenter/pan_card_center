// src/pages/PanCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PanCard = () => {
  const navigate = useNavigate();

  const buttons = [
    { label: "Interest PAN Apply", path: "/interest-pan-apply", color: "bg-blue-600 hover:bg-blue-700" },
    { label: "Interest PAN Update", path: "/interest-pan-update", color: "bg-yellow-500 hover:bg-yellow-600" },
    { label: "New PAN Card Apply", path: "/manualpanappy", color: "bg-green-600 hover:bg-green-700" },
    { label: "New PAN Uploads", path: "/Manualpanuploads", color: "bg-purple-600 hover:bg-purple-700" },
    { label: "PAN Card Correction", path: "/correction-pan-card", color: "bg-pink-600 hover:bg-pink-700" },
    { label: "Correction PAN Uploads", path: "/correction-pan-uploads", color: "bg-indigo-600 hover:bg-indigo-700" },
    { label: "PAN Application List", path: "/mypanList", color: "bg-gray-600 hover:bg-gray-700" },
    { label: "PAN Numbe Lost coming Soon", path: "/#", color: "bg-red-500 hover:bg-red-500" },
    { label: "PAN Numbe Lost List Coming Soon", path: "/#", color: "bg-red-500 hover:bg-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-6">PAN Card Services</h1>

      {/* Grid Layout */}
      <div className={`grid gap-4 ${buttons.length <= 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}`}>
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => navigate(btn.path)}
            className={`${btn.color} text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PanCard;
