import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    address: "",
    wallet: 0,
    aadharNumber: "",
    panNumber: "",
    photo: "",
    isActive: true,
    isBlocked: false,
    blockReason: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user) => {
    setEditingUser(user._id);
    setForm({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      address: user.address,
      wallet: user.wallet,
      aadharNumber: user.aadharNumber || "",
      panNumber: user.panNumber || "",
      photo: user.photo || "",
      isActive: user.isActive,
      isBlocked: user.isBlocked,
      blockReason: user.blockReason || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/user/${editingUser}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      alert("Failed to save user data");
    }
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  };

  if (loading) return <p className="text-center py-4">Loading users...</p>;
  if (error) return <p className="text-red-600 text-center py-4">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
  <thead className="bg-gray-100">
    <tr>
      <th className="p-3 text-left">ID</th>
      <th className="p-3 text-left">Name</th>
      <th className="p-3 text-left">Email</th>
      <th className="p-3 text-left">Mobile</th>
      <th className="p-3 text-left">Role</th>
      <th className="p-3 text-left">Address</th>
      <th className="p-3 text-left">Wallet</th>
      <th className="p-3 text-left">Photo</th>
      <th className="p-3 text-left">Aadhar No</th>
      <th className="p-3 text-left">PAN No</th>
      <th className="p-3 text-left">Active</th>
      <th className="p-3 text-left">Blocked</th>
      <th className="p-3 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.length === 0 ? (
      <tr>
        <td colSpan={13} className="p-4 text-center text-gray-500">
          No users found
        </td>
      </tr>
    ) : (
      users.map((u) => (
        <tr key={u._id} className="border-t border-gray-200 hover:bg-gray-50">
          <td className="p-3">{u._id}</td>
          <td className="p-3">{u.name}</td>
          <td className="p-3">{u.email}</td>
          <td className="p-3">{u.mobile}</td>
          <td className="p-3 capitalize">{u.role}</td>
          <td className="p-3">{u.address}</td>
          <td className="p-3">₹{u.wallet}</td>
          <td className="p-3">
            {u.photo ? (
              <img src={u.photo} alt="User" className="h-12 w-12 rounded-full object-cover" />
            ) : (
              "No Photo"
            )}
          </td>
          <td className="p-3">{u.aadharNumber || "—"}</td>
          <td className="p-3">{u.panNumber || "—"}</td>
          <td className="p-3">{u.isActive ? "Yes" : "No"}</td>
          <td className="p-3">{u.isBlocked ? "Yes" : "No"}</td>
          <td className="p-3 text-center space-x-2">
            <button onClick={() => startEdit(u)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
            <button onClick={() => deleteUser(u._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

      </div>

      {editingUser && (
        <div className="mt-8 p-6 bg-gray-50 border rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">Edit User</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleInputChange} placeholder="Name" className="p-2 border rounded" />
            <input name="email" value={form.email} onChange={handleInputChange} placeholder="Email" className="p-2 border rounded" />
            <input name="mobile" value={form.mobile} onChange={handleInputChange} placeholder="Mobile" className="p-2 border rounded" />
            <input name="address" value={form.address} onChange={handleInputChange} placeholder="Address" className="p-2 border rounded" />
            <select name="role" value={form.role} onChange={handleInputChange} className="p-2 border rounded">
              <option value="admin">Admin</option>
              <option value="master-distributor">Master Distributor</option>
              <option value="distributor">Distributor</option>
              <option value="retailer">Retailer</option>
            </select>
            <input name="wallet" type="number" value={form.wallet} onChange={handleInputChange} placeholder="Wallet" className="p-2 border rounded" />
            <input name="aadharNumber" value={form.aadharNumber} onChange={handleInputChange} placeholder="Aadhar Number" className="p-2 border rounded" />
            <input name="panNumber" value={form.panNumber} onChange={handleInputChange} placeholder="PAN Number" className="p-2 border rounded" />

            <div className="col-span-2">
              <label className="block">Upload Photo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setForm((prev) => ({ ...prev, photo: reader.result }));
                  };
                  if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
                }}
                className="mb-2"
              />
              {form.photo && (
                <img src={form.photo} alt="Uploaded" className="w-24 h-24 object-cover rounded mb-2" />
              )}
            </div>

            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleInputChange} />
              <span>Is Active</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isBlocked" checked={form.isBlocked} onChange={handleInputChange} />
              <span>Is Blocked</span>
            </label>

            {form.isBlocked && (
              <input
                name="blockReason"
                value={form.blockReason}
                onChange={handleInputChange}
                placeholder="Reason for blocking"
                className="p-2 border rounded col-span-2"
              />
            )}
          </div>
          <div className="mt-4 space-x-2">
            <button onClick={saveEdit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
            <button onClick={cancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllUsers;
