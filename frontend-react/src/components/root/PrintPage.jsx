import React, { useState } from "react";
import PrintingForm from "./PrintPage/PrintingForm";
import PrintingResults from "./PrintPage/PrintingResults";
import Layout from "./fragments/layout/Layout";

function PrintingSystem() {
  // Tạo state dùng chung cho cả hai component
  const [printingData, setPrintingData] = useState(null);

  return (
    <Layout>
      <div className="flex overflow-hidden flex-col">
        <main className="flex gap-5 w-full max-md:flex-col max-md:max-w-full">
          <div className="flex flex-col max-md:w-full w-full px-6">
            <PrintingForm printingData={printingData} />
            <PrintingResults setPrintingData={setPrintingData} />
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default PrintingSystem;
