import React from "react";


function Footer() {
  return (
    <footer className="flex flex-col w-full bg-white max-md:mt-10 max-md:max-w-full">
      {/* Main Content Section */}
      <div className="flex flex-wrap justify-around w-full py-8 bg-[#3A6D8C] text-white max-md:px-5 max-md:flex-col max-md:gap-10">
        {/* Technician Info */}
        <div className="flex flex-col items-center md:items-start max-md:w-full">
          <h2 className="font-black font-[Inter] text-lg">Tổ kỹ thuật / Technician</h2>
          <p className="mt-4">
            Email :{" "}
            <a href="mailto:ddthu@hcmut.edu.vn" className="underline text-sky-300">
              ddthu@hcmut.edu.vn
            </a>
          </p>
          <p className="mt-4">
            ĐT (Tel.) : (84-8) 38647256 - 5258
          </p>
        </div>

        {/* Download App Section */}
        <div className="flex flex-col items-center md:items-start max-md:w-full">
          <p className="font-bold text-lg">Tải ứng dụng</p>
          <div className="flex flex-col mt-4 gap-4">
            <img
              loading="lazy"
              src="src/images/group.png"
              alt="Download app"
              className="object-contain w-40 hover:opacity-90 transition-opacity"
            />
            <img
              loading="lazy"
              src="src/images/layer-2.png"
              alt="Download app"
              className="object-contain w-40 hover:opacity-90 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="py-4 bg-[#001F3F] text-white text-center text-sm">
        <span>&copy; 2007-2024 BK-SPSS. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
