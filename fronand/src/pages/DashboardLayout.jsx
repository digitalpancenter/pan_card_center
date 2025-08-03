import React from "react";
import Sidebar from "./SidebarLogout";
import Footer from "./Footer";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>
      <div className="flex-1 p-6 bg-gray-100">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
