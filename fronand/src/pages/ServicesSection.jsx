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
    <div id="services" className="relative bg-gray-40 pt-5 pb-22 px-5">
      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-8000">Our Services</h2>
          <p className="text-blue-600 mt-2">Grow Your Business</p>
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

      {/* Wavy Background SVG at Bottom */}
      <svg
        viewBox="50 40 1040 320"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full -z-10"
      >
        <path
          fill="#f1f5f9"
          fillOpacity="1"
          d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,133.3C672,128,768,128,864,122.7C960,117,1056,107,1152,90.7C1248,75,1344,53,1392,42.7L1440,32V320H0Z"
        />
      </svg>
    </div>
  );
};
export default ServicesSection;
