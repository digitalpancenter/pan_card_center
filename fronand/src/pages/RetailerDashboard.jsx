import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Zap,
  CreditCard,
  Briefcase,
  Globe,
  FileText,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

const services = [
  { label: "PAN CARD", icon: <CreditCard />, route: "/pan-card", comingSoon: false },
  { label: "ELECTRICITY", icon: <Zap />, comingSoon: true },
  { label: "MOBILE RECHARGE", icon: <Phone />, comingSoon: true },
  { label: "INCOME TAX RETURN", icon: <FileText />, comingSoon: true },
  { label: "DTH RECHARGE", icon: <Globe />, comingSoon: true },
  { label: "GST", icon: <ShieldCheck />, comingSoon: true },
  { label: "DIGITAL JOB PORTAL", icon: <Briefcase />, comingSoon: true },
  { label: "SOCIAL SERVICES", icon: <UserPlus />, comingSoon: true },
];

const RetailerDashboard = () => {
  const navigate = useNavigate();

  const handleClick = (service) => {
    if (service.route) {
      navigate(service.route);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Alert Banner */}
      <div className="col-span-3 md:col-span-4 bg-cyan-200 text-center p-4 rounded-lg text-sm font-medium text-gray-800">
        RA Digital India to open a Demat account for free with Ra Ra Digital India (Open a Demat account for free and start working in the share market).
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center 
              ${service.label === "PAN CARD" ? "bg-green-700" : "bg-red-700"} 
              text-white p-4 rounded-lg shadow hover:bg-gray-900 transition cursor-pointer`}
            onClick={() => handleClick(service)}
          >
            <div className="mb-2 text-2xl">{service.icon}</div>
            <p className="text-center text-sm font-medium">
              {service.label}
              {service.comingSoon && (
                <span className="ml-1 text-black text-xs font-semibold bg-white px-1 py-0.5 rounded">
                  (COMING SOON)
                </span>
              )}
            </p>
          </div>
        ))}

        {/* Highlighted Features */}
        <div className="col-span-3 md:col-span-2 flex justify-between gap-4">
          <div className="flex-1 bg-red-700 text-white p-4 rounded-lg text-center text-sm font-semibold shadow">
            <span className="text-xs bg-white text-red-700 px-2 py-0.5 rounded-full mr-2">NEW</span>
            NATIONAL PENSION SYSTEM (NPS)
          </div>
          <div className="flex-1 bg-sky-900 text-white p-4 rounded-lg text-center text-sm font-semibold shadow">
            <span className="text-xs bg-white text-red-700 px-2 py-0.5 rounded-full mr-2">NEW</span>
            PRO SURE (AAPKE GHAR KA DOCTOR)
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-700 text-white p-4 text-sm text-center font-medium leading-relaxed">
        We request you to also take advantage of other services provided by the Ra Digital India Portal such as electricity bill payment, mobile recharge, DTH recharge, GST registration, ITR filing, and more.
        <br />
        Thank you for staying connected with the Ra Digital India Portal.
        <div className="bg-red-600 text-white p-4 rounded-b-lg text-center text-sm mt-4">
          <p className="font-semibold">
            TechSupport Helpline:- 7061805159, 8447008141, 7903725117, 8368582718
          </p>
          <p>Time:- (10am to 5pm रविवार अवकाश) / Lunch Time:- 2:00PM TO 2:30PM</p>
          <p>Email:- radigitalindai@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;
