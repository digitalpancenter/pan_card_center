import React, { useState } from "react";
import axios from "axios";

const AadharToPan = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/aadhar-to-pan",
        { uid_number: aadhaar },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setPan(response.data.panNumber);
      setError("");
    } catch (err) {
      setPan("");
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Aadhaar to PAN Lookup</h2>
      <input
        type="text"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
        placeholder="Enter Aadhaar number"
      />
      <button onClick={handleSearch}>Search</button>

      {pan && <p><strong>PAN Number:</strong> {pan}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AadharToPan;
