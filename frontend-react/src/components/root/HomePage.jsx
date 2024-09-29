import React from "react";
import MyComponent from "./Homepage/body/MyComponent";
import Footer from "./Homepage/footer/Footer";
import Header from "./Homepage/header/Header";

export default function HomePage() {
  return (
    <div className="relative bg-white">
      {/* Header Section */}
      <Header /> {/* Sử dụng Header component */}

      {/* Main Image Section */}
      <div className="relative flex overflow-hidden flex-col pt-4 font-semibold bg-white">
        <img
          className="w-full h-full object-cover backdrop-blur-sm"
          src="src/images/slbktv-1.png"
          alt="Main"
        />
        <div className="absolute top-[79px] left-[50px] shadow-lg bg-white p-6">
          <h2 className="text-sky-200 text-6xl font-black text-center">
            Hệ thống máy in <br /> Trường Đại học Bách Khoa TP.Hồ Chí Minh
          </h2>
        </div>
      </div>

      {/* Announcement Section */}
      <MyComponent />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
