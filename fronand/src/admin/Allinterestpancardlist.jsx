import React, { useEffect, useState } from "react";
import axios from "axios";

const AllInterestPanCardList = () => {
  const [applications, setApplications] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pan-applications/all");

      // ✅ Fix: Make sure to access `res.data.data`
      if (res.data && Array.isArray(res.data.data)) {
        setApplications(res.data.data);
      } else {
        console.error("Unexpected response format:", res.data);
        setApplications([]); // fallback
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:5000/api/pan-applications/delete/${id}`);
        setApplications((prev) => prev.filter((app) => app._id !== id));
      } catch (error) {
        console.error("Error deleting record:", error);
        alert("Failed to delete record");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All PAN Applications</h2>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">DOB</th>
            <th className="p-2 border">Mobile</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Mode</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">PAN Type</th>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td className="p-2 border">{app.name}</td>
              <td className="p-2 border">{app.dob}</td>
              <td className="p-2 border">{app.mobile}</td>
              <td className="p-2 border">{app.email}</td>
              <td className="p-2 border">{app.mode}</td>
              <td className="p-2 border">{app.category}</td>
              <td className="p-2 border">{app.panType}</td>
              <td className="p-2 border">{app.orderid}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleDelete(app._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllInterestPanCardList;
