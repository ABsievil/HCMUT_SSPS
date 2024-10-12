
import React from "react";
import HeaderMain from "../header/HeaderMain"
import Sidebar from "../slidebar/Sidebar";
import Footer from "../footer/Footer"

function Layout({ children }) {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <HeaderMain />
        <div className="flex gap-6 max-md:flex-col">
          <Sidebar />
          <main className="flex flex-col mx-5 w-full max-md:ml-0 max-md:w-full">
            {children}
          </main>
        </div>
      <Footer />
    </div>
  );
}

export default Layout;
