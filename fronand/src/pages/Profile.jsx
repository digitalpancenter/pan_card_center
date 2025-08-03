import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div className="flex min-h-screen">
      <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg w-full">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Welcome, {user.name}
        </h2>

        <table className="w-full text-left border border-gray-200">
          <tbody>
            <tr className="border-b">
              <td className="p-2 font-semibold text-gray-700">Email:</td>
              <td className="p-2">{user.email}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold text-gray-700">Mobile:</td>
              <td className="p-2">{user.mobile}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold text-gray-700">Address:</td>
              <td className="p-2">{user.address}</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold text-gray-700">Wallet Balance:</td>
              <td className="p-2 text-green-600 font-bold">₹{user.wallet}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
