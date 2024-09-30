import React, { useEffect, useState } from "react";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 0); // Đặt isSticky thành true nếu cuộn xuống
      setIsVisible(scrollY === 0); // Ẩn header khi ở đầu trang
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`md:sticky top-0 z-10 ${isSticky ? 'shadow-lg bg-white' : 'bg-sky-50'}`}>
      <div className="flex justify-center items-center w-full">
        <div className={`bg-[#B7E0FF] w-11/12 flex flex-col md:flex-row justify-between items-center py-3 mb-4 mt-4 ${isSticky ? 'md:w-full md:mb-0 md:mt-0' : ''}`}>
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
          <h1 className="text-[#00697f] text-sm md:text-3xl font-black font-['Inter'] mx-4 mb-2 md:mt-0 md:ml-12">
            KHAI PHÓNG - TIÊN PHONG - SÁNG TẠO
          </h1>
          <button className="bg-[#87CEEB] text-black text-sm md:text-xl px-8 py-2 md:px-10 md:py-4 md:mr-5 rounded-xl hover:bg-sky-600 
                 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50 transition">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
