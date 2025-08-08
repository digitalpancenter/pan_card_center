// src/pages/PanCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PanCard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-6">PAN Card Services</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button
          onClick={() => navigate("/interest-pan-apply")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          Interest PAN Apply
        </button>

        <button
          onClick={() => navigate("/interest-pan-update")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          Interest PAN Update
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button
          onClick={() => navigate("/manualpanappy")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          New PAN Card Appy
        </button>

        <button
          onClick={() => navigate("/Manualpanuploads")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          New PAN Uploads
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => navigate("/correction-pan-card")}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          PAN Card Correction
        </button>

        <button
          onClick={() => navigate("/correction-pan-uploads")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          Correction PAN Uploads
        </button>

        <button
          onClick={() => navigate("/mypanList")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          PAN Application List
        </button>
      </div>
    </div>
  );
};

export default PanCard;
