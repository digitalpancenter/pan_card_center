import React, { useState } from "react";
import axios from "axios";

const AadharToPan = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setPan("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/aadhar-to-pan",
        { aadhaar },
        {
          headers: {
            "x-api-key": "d2e7a6-5ab764-e3f420-8def89-b620a5",
          },
        }
      );
      setPan(response.data.pan);
    } catch (err) {
      setError("PAN number not found or API error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Aadhaar to PAN Lookup</h1>

        <input
          type="text"
          placeholder="Enter Aadhaar Number"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSearch}
          disabled={loading || aadhaar.length !== 12}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Find PAN"}
        </button>

        {pan && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
            PAN Number: <span className="font-bold">{pan}</span>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AadharToPan;
