import React from "react";

const RALogo = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* SVG Wheel with design */}
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" stroke="#3F51B5" strokeWidth="4" />
        <circle cx="50" cy="50" r="2" fill="#3F51B5" />
        {[...Array(24)].map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const x1 = 50 + Math.cos(angle) * 2;
          const y1 = 50 + Math.sin(angle) * 2;
          const x2 = 50 + Math.cos(angle) * 48;
          const y2 = 50 + Math.sin(angle) * 48;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#3F51B5"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Brand Text */}
      <div>
        <h1 className="text-3xl font-bold text-indigo-700 leading-tight">
          RA <span className="text-gray-900">Digital</span>
        </h1>
        <p className="text-sm text-orange-500 font-medium">India – Growth is good</p>
      </div>
    </div>
  );
};

export default RALogo;
