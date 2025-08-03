import React from "react";

const RoleComparison = () => {
  return (
    <div className="px-4 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">Business Partners Choose the package</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Retailer */}
        <div id="partner" className="bg-gray-100 text-black p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2 text-purple-700">Retailer</h2>
          <p className="text-3xl font-semibold mb-4">₹100</p>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Recharge</li>
            <li>✅ MOBILE Recharge</li>
            <li>✅ NSDL E-KYC PAN Card</li>
            <li>✅ NSDL E-SIN PAN Card</li>
            <li>✅ UTI E-KYC PAN Card</li>
            <li>✅ UTI E-SIN PAN Card</li>
            <li>✅ PAN Apply</li>
            <li>✅ PAN Card Find</li>
            <li>✅ Multi Recharge</li>
            <li>✅ Limited Wallet</li>
            <li>✅ Fast Service</li>
          </ul>
        </div>

              {/* Distributor */}
        <div className="bg-white text-black p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2 text-green-700">Distributor</h2>
          <p className="text-3xl font-semibold mb-4">₹500</p>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Unlimited Retailers FREE</li>
            <li>✅ MOBILE Recharge</li>
            <li>✅ NSDL E-KYC PAN Card</li>
            <li>✅ NSDL E-SIN PAN Card</li>
            <li>✅ UTI E-KYC PAN Card</li>
            <li>✅ UTI E-SIN PAN Card</li>
            <li>✅ PAN Apply</li>
            <li>✅ PAN Card Find</li>
            <li>✅ Multi Recharge</li>
            <li>✅ Limited Wallet</li>
            <li>✅ Fast Service</li>
          </ul>
        </div>

               {/* Master Distributor */}
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Master Distributor</h2>
          <p className="text-3xl font-semibold mb-4">₹1000</p>
          <ul className="space-y-2">
            <li>✅ Unlimited Retailers FREE</li>
            <li>✅ Unlimited Distributor FREE</li>
            <li>✅ MOBILE Recharge</li>
            <li>✅ NSDL E-KYC PAN Card</li>
            <li>✅ NSDL E-SIN PAN Card</li>
            <li>✅ UTI E-KYC PAN Card</li>
            <li>✅ UTI E-SIN PAN Card</li>
            <li>✅ PAN Apply</li>
            <li>✅ PAN Card Find</li>
            <li>✅ Multi Recharge</li>
            <li>✅ Limited Wallet</li>
            <li>✅ Fast Service</li>
          </ul>
        </div>

        {/* Admin Card */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Admin</h2>
          <p className="text-3xl font-semibold mb-4">₹3000</p>
          <ul className="space-y-2">
            <li>🛠 Full Access</li>
            <li>👤 Manage All Users</li>
            <li>📊 View Reports</li>
            <li>🔐 User Control</li>
            <li>✅ Unlimited Retailers FREE</li>
            <li>✅ Unlimited Master Distributor FREE</li>
            <li>✅ Unlimited Distributor FREE</li>
            <li>✅ MOBILE Recharge</li>
            <li>✅ NSDL E-KYC PAN Card</li>
            <li>✅ NSDL E-SIN PAN Card</li>
            <li>✅ UTI E-KYC PAN Card</li>
            <li>✅ UTI E-SIN PAN Card</li>
            <li>✅ PAN Apply</li>
            <li>✅ PAN Card Find</li>
            <li>✅ Multi Recharge</li>
            <li>✅ Limited Wallet</li>
            <li>✅ Fast Service</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoleComparison;
