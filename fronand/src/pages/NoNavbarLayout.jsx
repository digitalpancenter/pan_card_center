// src/layouts/NoNavbarLayout.jsx
import React from "react";

const NoNavbarLayout = ({ children }) => {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      {/* Navbar intentionally hidden */}
      {children}
    </main>
  );
};

export default NoNavbarLayout;
