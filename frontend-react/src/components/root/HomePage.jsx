import React, { useState, useEffect } from "react";
import BoxAnnounce from "./Homepage/body/BoxAnnounce";
import Footer from "./fragments/footer/Footer";
import Header from "./fragments/header/Header";
import ScrollToTopButton from "./fragments/ScrollToTopButton";
import Preloader from "./fragments/Preloader"; // Import Preloader

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập thời gian tải hoặc thay thế bằng logic thực tế
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 giây

    return () => clearTimeout(timer); // Dọn dẹp timer
  }, []);

  return (
    <div className="relative bg-white">
      {loading && <Preloader />} {/* Hiển thị Preloader nếu đang tải */}

      {/* Header Section */}
      <Header />

      {/* Main Image Section */}
      <div className="relative flex overflow-hidden flex-col pt-4 font-semibold bg-white">
        <img
          className="w-full h-full object-cover backdrop-blur-sm"
          src="src/images/slbktv-1.png"
          alt="Main"
        />
        <div className="absolute top-[79px] shadow-lg p-6 ml-32">
          <h2 className="text-[#B7E0FF] font-['Inter'] text-6xl font-black text-center leading-[72px] text-stroke-black">
            Hệ thống máy in <br /> Trường Đại học Bách Khoa TP.Hồ Chí Minh
          </h2>
        </div>
      </div>

      {/* Announcement Section */}
      <BoxAnnounce />

      {/* Footer Section */}
      <Footer />

      {/* Nút Scroll To Top */}
      <ScrollToTopButton />
    </div>
  );
}
