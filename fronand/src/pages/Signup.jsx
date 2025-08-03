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
  });
  const [error, setError] = useState("");
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
      setError("Registration failed: " + err.response?.data?.message || "Unknown error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full mb-3 px-4 py-2 border rounded"
          onChange={handleChange}
          value={form.name}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded"
          onChange={handleChange}
          value={form.email}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 px-4 py-2 border rounded"
          onChange={handleChange}
          value={form.password}
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          className="w-full mb-3 px-4 py-2 border rounded"
          onChange={handleChange}
          value={form.mobile}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full mb-4 px-4 py-2 border rounded"
          onChange={handleChange}
          value={form.address}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
