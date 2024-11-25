import React from "react";

export default function HeaderMain() {
  return (
      <div className="bg-[#B7E0FF] w-full h-24 flex flex-col md:flex-row justify-between items-center py-3 shadow-lg rounded-lg">
        <div className="ml-2 md:ml-10 flex items-center">
          <a href="/" className="no-underline flex items-center">
            <img
              className="h-12 md:w-16 md:h-16 object-cover backdrop-blur-sm"
              src="src/images/hcmut-official-logo-1.png"
              alt="HCMUT Official Logo"
            />
            <h2 className="ml-3 md:ml-4 text-base md:text-2xl font-semibold">
              SSPS
            </h2>
          </a>
        </div>
        <h1 className="flex-1 text-[#51a7bf] text-base md:text-2xl font-black font-['Inter'] text-center drop-shadow-xl md:mr-36">
          Hệ thống máy in trường Đại học Bách Khoa TP.Hồ Chí Minh
        </h1>
      </div>
  );
}
