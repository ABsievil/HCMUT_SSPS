import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 0);
      setIsVisible(scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`md:sticky top-0 z-10 ${isSticky ? 'shadow-lg bg-white' : 'bg-sky-50'}`}>
      <div className="flex justify-center items-center w-full">
        <div className={`bg-[#B7E0FF] border rounded-md md:rounded-none w-full flex md:flex-row justify-between items-center py-3 px-4`}>
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
          <h1 className="text-[#00697f] text-sm md:text-2xl font-black font-['Inter'] mx-2 mb-1 md:mt-0 md:ml-10">
            KHAI PHÓNG - TIÊN PHONG - SÁNG TẠO
          </h1>
          <Link to="/login">
            <div href="/login" className="bg-[#87CEEB] ml-3 text-black text-sm md:text-lg px-4 py-2 md:px-8 md:py-3 md:mr-3 rounded-lg hover:bg-sky-600 
                 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50 transition">
              Đăng Nhập
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

