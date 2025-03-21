import React from "react";
import LanguageSwitcher from "../../LanguageSwithcher";


export default function HeaderMain() {
  return (
    <div className="bg-[#B7E0FF] w-full h-auto flex items-center py-4 px-3 md:py-3 md:px-8 shadow-lg ">
      {/* Logo Section */}
      <div className="flex items-center">
        <a href="/" className="flex items-center no-underline">
          <img
            className="h-12 w-auto md:w-16 md:h-16 object-cover"
            src="src/images/hcmut-official-logo-1.png"
            alt="HCMUT Official Logo"
          />
          {/* Hide the "SSPS" text on small screens */}
          <h2 className="ml-3 md:ml-4 text-base md:text-2xl font-semibold hidden md:block">
            SSPS
          </h2>
        </a>
      </div>

      {/* Header Text Section */}
      <h1 className="text-[#51a7bf] text-base md:text-2xl font-black font-['Inter'] text-center drop-shadow-xl flex-1 mx-4">
        Hệ thống máy in trường Đại học Bách Khoa TP.Hồ Chí Minh
      </h1>
      <LanguageSwitcher />

    </div>
  );
}
