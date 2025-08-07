import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, X } from "lucide-react";

const AllPanCards = () => {
  const [pans, setPans] = useState([]);
  const [error, setError] = useState("");
  const [editingPan, setEditingPan] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editFiles, setEditFiles] = useState({});

  const token = localStorage.getItem("token");

  const fetchPans = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pan-apply/all-pans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPans(res.data);
    } catch (err) {
      console.error("Error fetching PAN data:", err);
      setError("Failed to fetch PAN data.");
    }
  };

  useEffect(() => {
    fetchPans();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pan-apply/${id}`);
      alert("Deleted successfully");
      fetchPans();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete. Check console for details.");
    }
  };

  const handleEditClick = (pan) => {
    setEditingPan(pan);
    setEditForm({ ...pan });
    setEditFiles({});
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEditFiles({ ...editFiles, [e.target.name]: e.target.files[0] });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      for (const key in editForm) {
        formData.append(key, editForm[key]);
      }

      for (const key in editFiles) {
        formData.append(key, editFiles[key]);
      }

      await axios.put(`http://localhost:5000/api/pan-apply/${editingPan._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setEditingPan(null);
      setEditFiles({});
      fetchPans();
    } catch (err) {
      console.error("Edit failed:", err);
      alert("Failed to update PAN application.");
    }
  };

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Manual PAN Applications</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-[1000px] w-full text-sm text-left text-gray-800 border border-gray-300">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              {["#", "Reference No", "Status", "First Name", "Last Name", "Name On Card", "Gender", "DOB", "Parent Type", "Parent Name", "Address Type", "Address", "Mobile", "Email", "Aadhaar", "Aadhaar Name", "Income Source", "Acknowledgement Number", "Identity Proof", "Address Proof", "DOB Proof", "Applicant Status", "Image", "Signature", "Pan Fom", "Acknowledgement Slip", "Submitted On", "Actions"].map((header, index) => (
                <th key={index} className="px-3 py-2 border border-gray-300 bg-gray-200 whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pans.length > 0 ? (
              pans.map((pan, index) => (
                <tr key={pan._id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.referenceNumber}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.applicantStatus}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.firstName}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.lastName}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.nameOnCard}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.gender}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.dob}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.parentType}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.parentName}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.addressType}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.address}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.mobile}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.email}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.aadhaar}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.aadhaarName}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.incomeSource}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.acknowledgementNumber}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.identityProof}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.addressProof}</td>
                  <td className="px-3 py-2 border border-gray-300">{pan.dobProof}</td>
                   <td className="px-3 py-2 border border-gray-300">{pan.status}</td>
                  <td className="px-3 py-2 border border-gray-300">
  {pan.photo && (
    <img src={`http://localhost:5000/${pan.photo.replace(/\\/g, "/")}`} alt="photo" className="w-12 h-12 object-cover rounded" />
  )}
</td>
<td className="px-3 py-2 border border-gray-300">
  {pan.signature && (
    <img src={`http://localhost:5000/${pan.signature.replace(/\\/g, "/")}`} alt="signature" className="w-12 h-12 object-cover rounded" />
  )}
</td>
<td className="px-3 py-2 border border-gray-300">
  {pan.pdfForm && (
    <a
      href={`http://localhost:5000/${pan.pdfForm.replace(/\\/g, "/")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      View Form
    </a>
  )}
</td>
<td className="px-3 py-2 border border-gray-300">
  {pan.pdfSlip && (
    <a
      href={`http://localhost:5000/${pan.pdfSlip.replace(/\\/g, "/")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      View Slip
    </a>
  )}
</td>
                  <td className="px-3 py-2 border border-gray-300">{new Date(pan.createdAt).toLocaleDateString()}</td>
                  <td className="px-3 py-2 border border-gray-300 flex gap-2">
                    <button onClick={() => handleEditClick(pan)} className="text-blue-600 hover:text-blue-800">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(pan._id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="23" className="px-4 py-4 text-center text-gray-500 border border-gray-300">
                  No PAN applications found.
                </td>
              </tr>
              
            )}
          </tbody>
        </table>
      </div>

      {editingPan && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setEditingPan(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit PAN Application</h3>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-4">
              {Object.entries(editForm).map(([key, value]) => {
                if (["_id", "userId", "createdAt", "updatedAt", "__v"].includes(key)) return null;
                if (["slip", "photo", "signature", "formPdf"].includes(key)) return null;

                return (
                  <div key={key} className="col-span-1">
                    <label className="block text-sm text-gray-600 capitalize">{key}</label>
                    <input
                      type="text"
                      name={key}
                      value={value || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                    />
                  </div>
                );
              })}

              <div className="col-span-1">
                <label className="block text-sm text-gray-600">Acknowledgement Number</label>
                <input
                  type="text"
                  name="acknowledgementNumber"
                  value={editForm.acknowledgementNumber || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>

               {["pdfSlip", "photo", "signature", "pdfForm"].map((field) => {
              let acceptType = "image/*";
              if (field === "pdfForm" || field === "pdfSlip") acceptType = "application/pdf,image/*";               
              return (
                <div key={field} className="col-span-1">
                  <label className="block text-sm text-gray-600 capitalize">{field}</label>
                  <input
                    type="file"
                    name={field}
                    accept={acceptType}
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  />
                </div>
                );
              })}
              <div className="col-span-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPanCards;