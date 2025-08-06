import React from "react";

const Form49AHeader = () => {
  return (
    <div className="border border-black p-2 max-w-5xl mx-auto bg-white">
      {/* Top Section with Photo Boxes */}
      <div className="flex justify-between items-start">
        {/* Left Photo Box */}
        <div className="w-[3.5cm] h-[4.5cm] border border-black text-center text-xs flex-col flex justify-center items-center ">
          <div className="p-1">
            Only ‘Individuals’<br />
            to affix recent<br />
            photograph<br />
            (3.5 cm x 2.5 cm)
          </div>
        </div>

        {/* Center Title */}
        <div className="text-center flex-1 px-4">
          <h1 className="font-bold text-lg">Form No. 49A</h1>
          <p className="font-semibold text-sm">
            Application for Allotment of Permanent Account Number
          </p>
          <p className="text-sm">
            [In the case of Indian Citizens/Indian Companies/Entities incorporated in India/<br />
            Unincorporated entities formed in India]
          </p>
          <p className="text-xs mt-1">See Rule 114</p>
          <p className="text-xs">
            To avoid mistake(s), please follow the accompanying instructions and examples before filling up the form
          </p>

          {/* AO Code Table */}
          <div className="mt-2">
            <p className="bg-gray-200 font-semibold text-sm px-2 py-1 inline-block border w-full">
              Assessing officer (AO code)
            </p>
            <div className="grid grid-cols-4 text-center border border-black text-sm font-semibold">
              <div className="border-r border-black p-1">Area code</div>
              <div className="border-r border-black p-1">AO type</div>
              <div className="border-r border-black p-1">Range code</div>
              <div className="p-1">AO No.</div>
            </div>
            <div className="grid grid-cols-4 border border-black border-t-0 h-8">
              <div className="border-r border-black"></div>
              <div className="border-r border-black"></div>
              <div className="border-r border-black"></div>
              <div></div>
            </div>
          </div>
        </div>

        {/* Right Photo Box */}
        <div className="w-[3.5cm] h-[4.5cm] border border-black text-center text-xs flex-col flex justify-center items-center">
          <div className="p-1">
            Only ‘Individuals’<br />
            to affix recent<br />
            photograph<br />
            (3.5 cm x 2.5 cm)
          </div>
        </div>
      </div>

      {/* Signature Box */}
      <div className="w-[3.5cm] h-[1.1cm] border border-black text-center text-xs flex-col justify-center items-center">
        Signature / Left Thumb Impression
        <div className="w-[3.5cm] h-[2.50cm] border border-black text-center text-xs flex-col justify-center items-center">
       
        </div>
        
      </div>

      {/* Sir paragraph */}
      <div className="mt-2 text-sm">
        <p>Sir,</p>
        <p className="mt-1">
          I/We hereby request that a permanent account number be allotted to me/us.<br />
          I/We give below necessary particulars:
        </p>
      </div>
    </div>
  );
};

export default Form49AHeader;
