import React from "react";
import RALogo from "../components/RAlogo";

const Footer = () => {
  return (
    <footer className="relative bg-[#dd30c9] text-black pt-40 pb-12 px-6 overflow-hidden">
      
      {/* Wavy SVG Background */}
      <div className="absolute top-0 left-0 w-full z-0">
        <svg
          className="w-full h-[160px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#dd30c9"
            fillOpacity="1"
            d="M0,224L60,197.3C120,171,240,117,360,117.3C480,117,600,171,720,192C840,213,960,203,1080,176C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Logo Top Left */}
      <div className="absolute top-6 left-6 z-10 w-40 h-40">
        <RALogo />
      </div>

      {/* Footer Content */}
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <p className="text-sm font-semibold mb-2">Mobile Recharge</p>
          <p className="text-sm">
            We are happy to introduce you about RAHUL DEY, RAHUL DEY is a Fintech Services Provider Company.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Company</h3>
          <ul className="space-y-1 text-sm">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <ul className="space-y-1 text-sm">
            <li>Mobile & DTH Recharge</li>
            <li>NSDL Paperless PAN</li>
            <li>UTI E-KYC PAN Center</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <ul className="space-y-1 text-sm">
            <li>7061805159</li>
            <li>radigitalindai@gmail.com</li>
            <li>RAHUL KUMAR</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
