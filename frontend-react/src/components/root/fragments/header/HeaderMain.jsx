import React from "react";

export default function HeaderMain() {
  return (
    <div className="top-0 z-10">
        <div className="bg-[#B7E0FF] w-full h-20 flex flex-col md:flex-row md:h-24 justify-between items-center py-1 shadow-lg ">
          <div className="ml-2 md:ml-12 flex items-center">
            <a href="/" className="flex items-center gap-2 pb-1">
              <img
                className="w-10 h-10 md:w-16 md:h-16 object-cover backdrop-blur-sm"
                src="src/images/hcmut-official-logo-1.png"
                alt="HCMUT Official Logo"
              />
              <h2 className="ml-0.5 md:ml-2 text-lg md:text-xl font-semibold text-black drop-shadow-lg">
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
