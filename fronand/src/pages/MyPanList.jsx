import React, { useEffect, useState } from "react";
import axios from "axios";

const MyPanList = () => {
  const [panList, setPanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusCount, setStatusCount] = useState({
    pending: 0,
    success: 0,
    reject: 0,
    hold: 0,
  });

  useEffect(() => {
    const fetchPanList = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/manualpanappy/my-pans", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const list = res.data;

        const counts = {
          pending: 0,
          success: 0,
          reject: 0,
          hold: 0,
        };

        list.forEach((pan) => {
          const status = pan.status?.toLowerCase();
          if (status && counts[status] !== undefined) {
            counts[status]++;
          }
        });

        setPanList(list);
        setStatusCount(counts);
      } catch (err) {
        console.error("Failed to load PAN list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPanList();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🧾 My PAN Applications</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-yellow-700">Pending</h3>
          <p className="text-2xl font-bold text-yellow-800">{statusCount.pending}</p>
        </div>
        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-green-700">Success</h3>
          <p className="text-2xl font-bold text-green-800">{statusCount.success}</p>
        </div>
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-red-700">Rejected</h3>
          <p className="text-2xl font-bold text-red-800">{statusCount.reject}</p>
        </div>
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-blue-700">Hold</h3>
          <p className="text-2xl font-bold text-blue-800">{statusCount.hold}</p>
        </div>
      </div>

      {panList.length === 0 ? (
        <div>No PAN applications found.</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Ref No</th>
              <th className="p-2 border">Pan Number </th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Date Of Birth</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Email Id</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Acknowledgement Number</th>
              <th className="p-2 border">Slip</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {panList.map((pan) => (
              <tr key={pan._id} className="hover:bg-gray-50">
                <td className="p-2 border">{pan.referenceNumber}</td>
                <td className="p-2 border">{pan.pannumber && pan.pannumber.trim() !== "" ? pan.pannumber : "New Pan Card"}</td>
                <td className="p-2 border">{pan.firstName} {pan.lastName}</td>
                <td className="p-2 border">{pan.dob}</td>
                <td className="p-2 border">{pan.mobile}</td>
                <td className="p-2 border">{pan.email}</td>
                <td className="p-2 border capitalize">{pan.status}</td>
                <td className="p-2 border ">{pan.acknowledgementNumber && pan.acknowledgementNumber.trim() !==""? pan.acknowledgementNumber : "Acknowledgement Number aapka Ref No Hai "}</td>
                <td className="px-3 py-2 border border-gray-300">
  {pan.pdfSlip ? (
    <a
      href={`http://localhost:5000/${pan.pdfSlip.replace(/\\/g, "/")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      View Slip
    </a>
  ) : (
    <span className="text-gray-400">N/A</span>
  )}
</td>
                <td className="p-2 border">{new Date(pan.createdAt).toLocaleString()}</td>
              </tr>  
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPanList;
