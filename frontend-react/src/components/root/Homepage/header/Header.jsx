import React from "react";

export default function Header() {
  return (
    <div className="flex justify-center items-center w-full h-40 bg-sky-50">
      <div>
        <a href="#">
          <img 
            className="w-full h-full object-cover backdrop-blur-sm"
            src="src/images/hcmut-official-logo-1.png"
            alt="HCMUT Official Logo" // Đảm bảo bạn có thuộc tính alt cho SEO
          />
          <h2>SPSS</h2>
        </a>
      </div>
      <h1 className="text-sky-400 text-3xl font-black font-['Inter'] text-center">
        KHAI PHÓNG - TIÊN PHONG - SÁNG TẠO
      </h1>
    </div>
  );
}
