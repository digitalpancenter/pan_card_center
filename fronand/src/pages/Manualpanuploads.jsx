import React, { useState, useEffect } from "react";
import axios from "axios";

const ManualPanUploads = () => {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [matchedPan, setMatchedPan] = useState(null);
  const [error, setError] = useState("");
  const [files, setFiles] = useState({
    photo: null,
    signature: null,
    pdfForm: null,
  });

  const token = localStorage.getItem("token");

  const handleVerify = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pan-apply/all-pans", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const found = res.data.find((pan) => pan.referenceNumber === referenceNumber);
      if (found) {
        setMatchedPan(found);
        setError("");
      } else {
        setMatchedPan(null);
        setError("Reference Number not found.");
      }
    } catch (err) {
      console.error("Verification failed:", err);
      setError("Error verifying reference number.");
    }
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleUpload = async () => {
    if (!matchedPan) {
      setError("Please verify a valid Reference Number first.");
      return;
    }

    const formData = new FormData();
    if (files.photo) formData.append("photo", files.photo);
    if (files.signature) formData.append("signature", files.signature);
    if (files.pdfForm) formData.append("pdfForm", files.pdfForm);

    try {
      await axios.put(
        `http://localhost:5000/api/pan-apply/${matchedPan._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Files uploaded successfully.");
      setFiles({ photo: null, signature: null, pdfForm: null });
      setMatchedPan(null);
      setReferenceNumber("");
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload files.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manual PAN Upload</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Enter Reference Number
        </label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
        />
        <button
          onClick={handleVerify}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Verify
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {matchedPan && (
        <div className="mt-4">
          <p className="text-green-600 font-semibold mb-2">
            ✅ Verified: {matchedPan.firstName} {matchedPan.lastName}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Upload Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Upload Signature</label>
              <input
                type="file"
                name="signature"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Upload PAN Form (PDF)</label>
              <input
                type="file"
                name="pdfForm"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
              />
            </div>

            <button
              onClick={handleUpload}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Upload Files
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualPanUploads;
