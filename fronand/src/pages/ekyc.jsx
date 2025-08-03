import React from "react";
import utiImg from "../img/UTI-min.webp";
import nsdlImg from "../img/NSDL_1753611085286_1753611085407.webp";
import panFindImg from "../img/pan-card-with-cartoon-hd-png.png";
import rechargeImg from "../img/image_17238842961735.jpeg";

const services = [
  { img: utiImg, title: "UTI E-KYC PAN Center" },
  { img: nsdlImg, title: "NSDL Paperless PAN" },
  { img: panFindImg, title: "NSDL & UTI PAN Find" },
  { img: rechargeImg, title: "Mobile & DTH Recharge" },
];

const ServicesGrid = () => {
  return (
    <div className="py-12 px-5 bg-pink-600">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={service.img}
              alt={service.title}
              className="h-40 w-40 sm:h-50 sm:w-44 mb-4 mt-4 object-contain transition-transform duration-300 hover:scale-110"
            />
            <p className="text-white text-lg font-semibold">{service.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
