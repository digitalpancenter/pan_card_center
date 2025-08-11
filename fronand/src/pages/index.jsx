import React from "react";
import PANImage from "../img/image.png"; // ✅ correct name

const HeroSection = () => {
  return (
    <section id="home" className="bg-white py-20 px-6 md:px-10">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
        {/* Left Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get Paperless PAN Card within 2 Hours.
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Aadhaar based instant PAN is a new facility. Aadhaar e-KYC OTP or Biometric Authentication.
          </p>
          <p className="text-sm text-gray-500 mb-6">Customer Care: 7061805159</p>

          <div className="flex justify-center lg:justify-start gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow">
              Create Account
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-blue-700 px-6 py-3 rounded-lg font-semibold">
              Member Login
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-2/5 mb-10 lg:mb-0">
          <img
            src={PANImage}
            alt="Paperless PAN Illustration"
            className="w-full h-[400px] max-w-lg mx-auto lg:mx-0 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
