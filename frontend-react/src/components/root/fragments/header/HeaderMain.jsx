import React from "react";

export default function HeaderMain() {
  return (
    <div className="top-0 z-10">
        <div className="bg-[#B7E0FF] w-full h-20 flex flex-col md:flex-row md:h-24 justify-between items-center py-1 shadow-lg ">
        <div className="ml-2 md:ml-10 flex items-center">
            <a href="/" className="no-underline flex items-center">
              <img
                className="w- h-12 md:w-16 md:h-16 object-cover backdrop-blur-sm"
                src="src/images/hcmut-official-logo-1.png"
                alt="HCMUT Official Logo"
              />
              <h2 className="ml-3 md:ml-4 text-base md:text-2xl font-semibold">
                SPSS
              </h2>
            </a>
          </div>

          <h1 className="flex-1 text-[#51a7bf] text-base md:text-2xl font-black font-['Inter'] text-center drop-shadow-xl md:mr-36">
            Hệ thống máy in trường Đại học Bách Khoa TP.Hồ Chí Minh
          </h1>
        </div>
    </div>
  );
}
