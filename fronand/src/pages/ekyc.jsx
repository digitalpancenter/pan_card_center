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
         <div key={index} className="flex flex-col items-center group">
            <div className="bg-white p-4 rounded-2xl shadow-lg mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl">
              <img
                src={service.img}
                alt={service.title}
                className="h-32 w-32 sm:h-36 sm:w-36 object-contain"
              />
            </div>
            <p className="text-white text-lg font-semibold">{service.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
