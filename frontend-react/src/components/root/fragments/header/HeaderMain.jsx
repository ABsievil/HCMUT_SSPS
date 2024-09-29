import React from "react";

export default function HeaderMain() {
  return (
    <div className={`sticky top-0 z-10`}>
      <div className="flex justify-center items-center w-full h-48 bg-sky-50">
        <div className="bg-[#B7E0FF] w-11/12 h-28 flex flex-col md:flex-row justify-between items-center py-3 my-4">
          <div className="ml-4 md:ml-14 flex items-center">
            <a href="#">
              <img
                className="w-16 h-16 md:w-20 md:h-20 object-cover backdrop-blur-sm"
                src="src/images/hcmut-official-logo-1.png"
                alt="HCMUT Official Logo"
              />
              <h2 className="ml-2 md:ml-4 text-lg md:text-xl font-semibold">
                SPSS
              </h2>
            </a>
          </div>

          {/* Căn giữa h1 bằng cách sử dụng flex */}
          <h1 className="flex-1 text-sky-400 text-xl md:text-3xl font-black font-['Inter'] text-center">
            Hệ thống máy in <br /> Trường Đại học Bách Khoa TP.Hồ Chí Minh
          </h1>
        </div>
      </div>
    </div>
  );
}
