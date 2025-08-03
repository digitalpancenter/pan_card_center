import React, { useState } from "react";
import {
  User,
  Wallet,
  List,
  Network,
} from "lucide-react"; // lucide-react icon set

const SidebarLogout = () => {
  const [collapsed, setCollapsed] = useState(false); // toggle state

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 min-h-screen">
      {/* Top Toggle Button */}
      <div
        onClick={toggleSidebar}
        className="flex items-center space-x-2 cursor-pointer mb-6"
      >
        <Network size={24} />
        {!collapsed && <span className="text-xl font-semibold"></span>}
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
        <li>
          <a href="/retailer-dashboard" className="flex items-center space-x-2 hover:underline">
            <User size={20} />
            {!collapsed && <span>Dashboard</span>}
          </a>
        </li>
        <li>
          <a href="/pan-card" className="flex items-center space-x-2 hover:underline">
            <User size={20} />
            {!collapsed && <span>Pan Card</span>}
          </a>
        </li>
        <li>
          <a href="/profile" className="flex items-center space-x-2 hover:underline">
            <User size={20} />
            {!collapsed && <span>Profile</span>}
          </a>
        </li>
        <li>
          <a href="/add-money" className="flex items-center space-x-2 hover:underline">
            <Wallet size={20} />
            {!collapsed && <span>Wallet</span>}
          </a>
        </li>
        <li>
          <a href="/Transactions" className="flex items-center space-x-2 hover:underline">
            <List size={20} />
            {!collapsed && <span>Transactions</span>}
          </a>
        </li>
      </ul>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-10 bg-red-600 px-4 py-2 rounded hover:bg-red-700 w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default SidebarLogout;
