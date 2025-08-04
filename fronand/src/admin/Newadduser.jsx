// Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    role: "retailer",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <input name="name" placeholder="Name" onChange={handleChange} required className="mb-3 w-full p-2 border rounded" />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="mb-3 w-full p-2 border rounded" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="mb-3 w-full p-2 border rounded" />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} required className="mb-3 w-full p-2 border rounded" />
        <input name="address" placeholder="Address" onChange={handleChange} required className="mb-3 w-full p-2 border rounded" />

        <select name="role" value={form.role} onChange={handleChange} className="mb-4 w-full p-2 border rounded">
          <option value="admin">Admin</option>
          <option value="master-distributor">Master Distributor</option>
          <option value="distributor">Distributor</option>
          <option value="retailer">Retailer</option>
        </select>

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
