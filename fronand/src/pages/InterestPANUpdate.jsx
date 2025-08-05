import React, { useState } from "react";
import axios from "axios";

const InterestPANUpdate = () => {
  const [formData, setFormData] = useState({
    panNumber: "",
    name: "",
    dob: "",
    mobile: "",
    email: "",
    mode: "scan",
    category: "INDIVIDUAL",
    panType: "Physical PAN Card",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModeChange = (value) => {
    setFormData({ ...formData, mode: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // token must be stored after lo
     const response = await axios.post(
  "http://localhost:5000/api/pan-update",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      if (response.data.success) {
        window.location.href = response.data.redirect_url;
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-5xl flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Update PAN Application</h2>
          <p className="text-green-600 font-semibold mb-4">Online Application Mode</p>

          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="mode" checked={formData.mode === "scan"} onChange={() => handleModeChange("scan")} />
              Scan Based (e-Sign)
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="mode" checked={formData.mode === "ekyc"} onChange={() => handleModeChange("ekyc")} />
              e-KYC
            </label>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value="Change and Correction form (CSF)" disabled className="p-2 border rounded" />
            <select name="category" value={formData.category} onChange={handleChange} className="p-2 border rounded">
              <option value="INDIVIDUAL">INDIVIDUAL</option>
            </select>

            <select name="panType" value={formData.panType} onChange={handleChange} className="p-2 border rounded">
              <option value="Physical PAN Card">Physical PAN Card</option>
              <option value="Both">Both (Physical + ePAN)</option>
            </select>

            <input type="text" name="panNumber" placeholder="PAN Number" value={formData.panNumber} onChange={handleChange} className="p-2 border rounded" />
            <input type="text" name="name" placeholder="Name (As in Aadhaar card)" value={formData.name} onChange={handleChange} className="p-2 border rounded" />
            <input type="text" name="dob" placeholder="dd-mm-yyyy" value={formData.dob} onChange={handleChange} className="p-2 border rounded" />
            <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="p-2 border rounded" />
            <input type="email" name="email" placeholder="Email Id" value={formData.email} onChange={handleChange} className="p-2 border rounded" />

            <button type="submit" className="col-span-2 bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600">
              Submit
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-bold mb-2">Important Instructions</h3>
          <p className="text-red-600 font-semibold mb-4">
            VLE needs to explain the PAN Application process to the consumer before accepting the request.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li>Select the Application Type and Category.</li>
            <li>Enter existing PAN and details as per Aadhaar.</li>
            <li>Enter active mobile number and email.</li>
            <li>Select the updated PAN Type.</li>
            <li>Provide consent and click submit.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InterestPANUpdate;
