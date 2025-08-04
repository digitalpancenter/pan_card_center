import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // For editing
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    address: "",
    wallet: 0,
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
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/user/${editingUser}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>All Users</h2>
      <table border="1" cellPadding={5} cellSpacing={0} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Mobile</th><th>Role</th><th>Address</th><th>Wallet</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={7} align="center">No users found</td></tr>
          ) : (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.mobile}</td>
                <td>{u.role}</td>
                <td>{u.address}</td>
                <td>₹{u.wallet}</td>
                <td>
                  <button onClick={() => startEdit(u)}>Edit</button>
                  <button onClick={() => deleteUser(u._id)} style={{ marginLeft: "10px" }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editingUser && (
        <div style={{ marginTop: 20 }}>
          <h3>Edit User</h3>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleInputChange} /><br />
          <label>Email: </label>
          <input name="email" value={form.email} onChange={handleInputChange} /><br />
          <label>Mobile: </label>
          <input name="mobile" value={form.mobile} onChange={handleInputChange} /><br />
          <label>Role: </label>
          <select name="role" value={form.role} onChange={handleInputChange}>
            <option value="admin">admin</option>
            <option value="master-distributor">master-distributor</option>
            <option value="distributor">distributor</option>
            <option value="retailer">retailer</option>
          </select><br />
          <label>Address: </label>
          <input name="address" value={form.address} onChange={handleInputChange} /><br />
          <label>Wallet: </label>
          <input name="wallet" type="number" value={form.wallet} onChange={handleInputChange} /><br />
          <button onClick={saveEdit}>Save</button>
          <button onClick={cancelEdit} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminAllUsers;
