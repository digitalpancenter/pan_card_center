import React, { useState } from "react";

const InterestPANApply = () => {
  const [formData, setFormData] = useState({
    mode: "scan",
    category: "INDIVIDUAL",
    panType: "E-PAN Card",
    name: "",
    dob: "",
    mobile: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModeChange = (value) => {
    setFormData((prev) => ({ ...prev, mode: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Left Section - Form */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-bold text-blue-700 mb-2">New PAN Application</h2>
          <p className="text-green-600 font-semibold mb-4">Online Application Mode</p>

          {/* Radio buttons */}
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="mode"
                checked={formData.mode === "scan"}
                onChange={() => handleModeChange("scan")}
              />
              Scan Based (e-Sign)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="mode"
                checked={formData.mode === "ekyc"}
                onChange={() => handleModeChange("ekyc")}
              />
              e-KYC
            </label>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value="PAN - Indian Citizen (Form 49A)"
              disabled
              className="col-span-2 p-2 border rounded"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="INDIVIDUAL">INDIVIDUAL</option>
            </select>

            <select
              name="panType"
              value={formData.panType}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="Physical PAN Card">Physical PAN Card</option>
              <option value="Both">E-PAN CARD </option>
            </select>

            <input
              type="text"
              name="name"
              placeholder="Name (As in Aadhaar card)"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded"
            />

            <input
              type="text"
              name="dob"
              placeholder="dd-mm-yyyy"
              value={formData.dob}
              onChange={handleChange}
              className="p-2 border rounded"
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="p-2 border rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded"
            />

            <button
              type="submit"
              className="col-span-2 bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Section - Instructions */}
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-bold mb-2">Important Instructions</h3>
          <p className="text-red-600 font-semibold mb-4">
            VLE needs to explain the PAN Application process to the consumer before accepting the request.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li>Select the Application Type and Category.</li>
            <li>Enter name & date of birth as per Aadhaar.</li>
            <li>Enter active mobile number.</li>
            <li>Enter your Email Id.</li>
            <li>Select the Pan Type.</li>
            <li>Provide consent and click submit.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InterestPANApply;
