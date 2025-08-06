// src/pages/PanCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PanCard = () => {
  const navigate = useNavigate();

  const handlePanApply = () => {
    navigate("/interest-pan-apply");
  };

  const handlePanUpdate = () => {
    navigate("/interest-pan-update");
  };

  const handlManualpanappy = () => {
    navigate("/manualpanappy");
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-6">PAN Card Services</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={handlePanApply}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          Interest PAN Apply
        </button>

        <button
          onClick={handlePanUpdate}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          Interest PAN Update
        </button>

        <button
          onClick={handlManualpanappy}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          PAN CARD APPY
        </button>
      </div>
    </div>
  );
};

export default PanCard;
