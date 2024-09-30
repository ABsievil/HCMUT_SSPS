import React from "react";

export default function HeaderMain() {
  return (
    <div className="sticky top-0 z-10">
      <div className="flex justify-center items-center w-full h-48 bg-sky-50">
        <div className="bg-[#B7E0FF] w-11/12 h-28 flex flex-col md:flex-row sm:h-40 justify-between items-center py-3 my-4 shadow-lg rounded-lg">
          <div className="ml-4 md:ml-14 flex items-center">
            <a href="#">
              <img
                className="w-16 h-16 md:w-20 md:h-20 object-cover backdrop-blur-sm"
                src="src/images/hcmut-official-logo-1.png"
                alt="HCMUT Official Logo"
              />
              <h2 className="ml-2 md:ml-4 text-lg md:text-xl font-semibold text-black drop-shadow-lg">
                SPSS
              </h2>
            </a>
          </div>

          {/* Căn giữa h1 và thêm hiệu ứng bóng mờ cho chữ */}
          <h1 className="flex-1 text-[#51a7bf] text-xl md:text-3xl font-black font-['Inter'] text-center 
                         text-shadow-lg shadow-black drop-shadow-xl">
            Hệ thống máy in <br /> Trường Đại học Bách Khoa TP.Hồ Chí Minh
          </h1>
        </div>
      </div>
    </div>
  );
}
