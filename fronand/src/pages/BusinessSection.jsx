import React from "react";
import rechargeImg from "../img/d276362f-49de-4d53-bb6f-7c5db3ac2175.png";

const BusinessSection = () => {
  return (
    <div id="business" className="py-16 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Left: BIG Image */}
        <div className="w-full lg:w-2/4 flex justify-center">
          <img
            src={rechargeImg}
            alt="Business Illustration"
            className="w-[800px] h-[500px]"
          />
        </div>

        {/* Right: Text content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-4">Perfect solution</h2>
          <p className="text-xl font-medium mb-6">for your small business</p>

          <h3 className="text-3xl font-semibold mb-4">Business to Business</h3>
          <p className="text-lg mb-6 leading-relaxed">
            RAHUL DEY has been authorized to apply PAN CARD across India through our Super Distributor, Distributor & Retailer network. Retailer will be able to make online applications for New PAN Card and Correction / Duplicate. A great opportunity for Super Distributor & Distributor to authorize Retailers to become agents for PAN Card.
          </p>
          <button className="bg-white text-pink-600 font-semibold px-6 py-3 rounded hover:bg-pink-100 transition">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessSection;
