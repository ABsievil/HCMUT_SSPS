import React, { useState, useEffect } from "react";
import Footer from "./fragments/footer/Footer";
import Header from "./fragments/header/Header";
import BoxAnnounce from './Homepage/BoxAnnounce'
import ScrollToTopButton from "./fragments/scrollTop/ScrollToTopButton";


export default function HomePage() {
  return (
    <div className="relative bg-white">

      {/* Header Section */}
      <Header />

      {/* Main Image Section */}
      <div className="relative flex overflow-hidden flex-col font-semibold bg-white">
        <img
          className="w-full h-full object-cover backdrop-blur-sm"
          src="src/images/slbktv-1.png"
          alt="Main"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black/15 ">
          <h2 className=" text-2xl text-[#d9f5fc]  font-['Inter'] md:text-5xl font-black text-center  
                   text-stroke-black">
            HỆ THỐNG MÁY IN <br /> TRƯỜNG ĐẠI HỌC BÁCH KHOA TP.HCM
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
