import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../../LanguageSwithcher";
export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isSticky ? "shadow-lg bg-white" : "bg-sky-50"
      } md:sticky top-0 z-10 transition-all`}
    >
      <div className="flex justify-center items-center w-full">
        <div className="bg-[#B7E0FF] border w-full flex md:flex-row justify-between items-center py-3 px-4 md:py-4 md:px-8">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <img
                className="w-10 h-10 md:w-16 md:h-16 object-cover"
                src="src/images/hcmut-official-logo-1.png"
                alt="HCMUT Official Logo"
              />
              <h2 className="text-base md:text-2xl font-semibold hidden md:block">
                SSPS
              </h2>
            </a>
          </div>

          {/* Tagline Section */}
          <h1 className="text-[#00697f] text-sm md:text-2xl font-black font-['Inter'] md:ml-10 text-center">
            KHAI PHÓNG - TIÊN PHONG - SÁNG TẠO
          </h1>

          {/* Login Button và LanguageSwitcher */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <div
                className="bg-[#87CEEB] text-black text-sm md:text-lg px-4 md:px-8 py-3 rounded-lg hover:bg-sky-600 
                focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50 transition"
              >
                Đăng Nhập
              </div>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}