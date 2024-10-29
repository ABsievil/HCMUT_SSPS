import React, { useState } from "react";
import HeaderMain from "./fragments/header/HeaderMain";
import Sidebar from "./fragments/slidebar/Sidebar";
import PrintingForm from "./PrintPage/PrintingForm";
import PrintingResults from "./PrintPage/PrintingResults";
import Footer from "./fragments/footer/Footer";

function PrintingSystem() {
  // Tạo state dùng chung cho cả hai component
  const [printingData, setPrintingData] = useState(null);

  return (
    <div className="flex overflow-hidden flex-col">
      <HeaderMain />
      <main className="flex gap-5 w-full max-md:flex-col max-md:max-w-full">
        <Sidebar />
        <div className="flex flex-col max-md:w-full w-full px-6">
          
          <PrintingForm printingData={printingData} />
         
          <PrintingResults setPrintingData={setPrintingData} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PrintingSystem;
