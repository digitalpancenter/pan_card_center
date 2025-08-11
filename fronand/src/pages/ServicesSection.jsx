import React from "react";
import utiImg from "../img/UTI-min.webp";
import nsdlImg from "../img/NSDL_1753611085286_1753611085407.webp";
import panFindImg from "../img/pan-card-with-cartoon-hd-png.png";
import rechargeImg from "../img/image_17238842961735.jpeg";

const services = [
  {
    icon: utiImg,
    title: "UTI E-KYC PAN Center",
    description:
      "Authorized Agent for PAN Center, e-KYC and e-Sign New PAN Application Facility and Correction PAN Application Facility.",
  },
  {
    icon: nsdlImg,
    title: "NSDL Paperless PAN",
    description:
      "Instant PAN is a new Facility, Get e-KYC PAN Within 30 minutes, Aadhaar e-KYC OTP or Biometric, Now e-KYC PAN Correction, Now e-Sign PAN Facility.",
  },
  {
    icon: panFindImg,
    title: "NSDL & UTI PAN Find",
    description:
      "Find your PAN Number with Aadhaar Number, Now it's Very Easy to Find your PAN Number.",
  },
  {
    icon: rechargeImg,
    title: "Mobile & DTH Recharge",
    description:
      "Get Recharge and Earn More Money, Available India All Operator, Instant Recharge Success, Instant Commission.",
  },
];

const ServicesSection = () => {
  return (
    <div
      id="services"
      className="scroll-mt-20 relative bg-gradient-to-b from-pink-500 via-purple-600 to-purple-900 overflow-hidden py-10"
    >
      {/* Wavy Lines Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 left-0 w-full h-full opacity-80"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          {[...Array(6)].map((_, i) => (
            <path
              key={i}
              fill="none"
              stroke="white"
              strokeWidth="1"
              d={`M0,${160 + i * 20} C240,${280 + i * 20} 480,${40 + i * 20} 720,${160 + i * 20} C960,${280 + i * 20} 1200,${40 + i * 20} 1440,${160 + i * 20}`}
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white">Our Services</h2>
          <p className="text-pink-200 mt-2">Grow Your Business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
