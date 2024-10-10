import React, { useState, useEffect } from "react";
import InputField from "../fragments/InputField/InputField"; // Import InputField component

function PrintingForm() {
  // Đặt số trang có sẵn là hằng số
  var TOTAL_PAGES = 100; // Tổng số trang có sẵn
  const [remainingPages, setRemainingPages] = useState(TOTAL_PAGES);
  const [missingPages, setMissingPages] = useState(0);
  const [printCopies, setPrintCopies] = useState(1);
  const [pagesToPrint, setPagesToPrint] = useState(0);

  useEffect(() => {
    const calculatedMissingPages = pagesToPrint * printCopies - TOTAL_PAGES;
    setMissingPages(calculatedMissingPages > 0 ? calculatedMissingPages : 0);
  }, [pagesToPrint, printCopies]);

  const handlePrintCopiesChange = (event) => {
    const copies = Math.max(parseInt(event.target.value, 10) || 0, 0); // Đảm bảo số bản in không âm
    setPrintCopies(copies);
  };

  const handlePagesToPrintChange = (event) => {
    const pages = Math.max(parseInt(event.target.value, 10) || 0, 0); // Đảm bảo số trang không âm
    setPagesToPrint(pages);

    // Tính toán số trang còn lại
    const totalPagesNeeded = pages * printCopies;
    const newRemainingPages = TOTAL_PAGES - totalPagesNeeded;

    // Cập nhật số trang còn lại
    setRemainingPages(newRemainingPages >= 0 ? newRemainingPages : 0);
  };

  return (
    <section className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full mx-8 lg:mx-20">
      <div className="flex gap-10 lg:gap-20 max-md:flex-col max-w-[1024px] mx-auto">
        {/* Phần chọn máy in và số bản in */}
        <div className="flex flex-col w-full lg:w-5/12">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c03e7cd16ef33d7f3d1a8b7b09546f4aeec9793f6296076ffc8be97a8c297571?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
            alt="Printer illustration"
            className="object-contain w-4/5 h-auto max-md:mt-10 mx-auto"
          />
          <div className="flex flex-col items-center md:items-start mt-8 w-full">
            <label htmlFor="selectedPrinter" className="mt-6 text-xl font-medium text-black">
              Máy in đã chọn
            </label>
            <div className="flex gap-4 w-full p-2 mt-2 bg-gray-200 border border-gray-300 rounded-xl shadow-sm text-gray-500 cursor-not-allowed">
              <span>2211185</span>
            </div>

            <button className="px-6 py-4 mt-4 text-base font-semibold text-white rounded-lg bg-slate-600 hover:bg-slate-700 w-full max-md:px-5">
              Chọn máy in
            </button>

            <div className="flex flex-col mt-8">
              <label htmlFor="filesToPrint" className="text-xl font-medium">
                Tệp đang chọn
              </label>
              <div className="flex gap-4 p-2 mt-2 w-full bg-gray-200 border border-gray-300 rounded-xl shadow-sm text-gray-500 cursor-not-allowed">
                <span>File.doc</span>
              </div>
            </div>
            <button className="px-6 py-3 mt-6 text-base font-semibold text-white bg-slate-600 hover:bg-slate-700 rounded-lg w-full max-md:px-5">
              Tải tệp lên
            </button>
          </div>
        </div>

        {/* Phần thông tin in */}
        <div className="flex flex-col w-full lg:w-6/12">
          <h2 className="self-center text-2xl font-extrabold text-stone-900">
            THÔNG TIN IN
          </h2>

          <div className="flex gap-6 mt-8">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">SỐ TRANG IN CÓ SẴN</label>
              <div className="bg-gray-100 p-2 rounded text-lg font-semibold text-center">{TOTAL_PAGES}</div>
            </div>
          </div>

          <div className="flex w-full">
            <div>
              <label htmlFor="pagesToPrint" className="text-xl font-medium text-black">
                Số trang cần in
              </label>
              <div className="flex items-center">
                <InputField
                  id="pagesToPrint"
                  type="number"
                  value={pagesToPrint}
                  onChange={handlePagesToPrintChange}
                  placeholder="e.g. 20"
                />
              </div>
              <h2
                className={`text-red-600 text-lg max-h-0 ${missingPages > 0 && remainingPages === 0 ? '' : 'hidden'}`}
              >
                Bạn còn thiếu {missingPages} trang
              </h2>
            </div>
          </div>

          <div className="flex mt-12 flex-wrap">
            <label htmlFor="printCopies" className="mr-4 text-xl font-medium text-black">
              Số bản in
            </label>
            <InputField
              id="printCopies"
              type="number"
              value={printCopies}
              onChange={handlePrintCopiesChange}
              placeholder="Số bản in"
            />
          </div>

          <div className="flex mt-8 items-center">
            <label htmlFor="paperSize" className="text-xl mr-6 font-medium">
              Khổ giấy
            </label>
            <select
              id="paperSize"
              className="px-3 py-0.5 text-xl bg-white border border-gray-300 rounded-xl shadow-sm focus:ring focus:ring-slate-500"
            >
              <option>A4</option>
              <option>A3</option>
            </select>
          </div>

          <fieldset className="mt-8">
            <legend className="text-xl font-medium text-black">Số trang mỗi mặt</legend>
            <div className="flex flex-col gap-4 mt-4 border border-gray-300 rounded-lg shadow-sm">
              <label className="flex items-center gap-2 p-3 bg-white rounded-t-lg">
                <input type="radio" name="pagesPerSide" value="1" defaultChecked />
                <span>1 trang</span>
              </label>
              <label className="flex items-center gap-2 p-3 bg-white rounded-b-lg">
                <input type="radio" name="pagesPerSide" value="2" />
                <span>2 trang</span>
              </label>
            </div>
          </fieldset>
        </div>
      </div>

      <button className="self-center px-12 py-4 mt-12 text-base font-semibold text-white uppercase bg-blue-700 hover:bg-blue-800 rounded-xl max-md:w-full shadow-lg">
        XÁC NHẬN
      </button>
    </section>
  );
}

export default PrintingForm;
