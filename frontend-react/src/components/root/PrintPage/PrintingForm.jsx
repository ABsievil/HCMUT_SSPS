import React, { useState, useEffect } from "react";
import InputField from "../fragments/InputField/InputField";
import PrinterSelectionForm from "./PrinterSelectionForm";

const TOTAL_PAGES = 100;
const VALID_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

function PrintingForm() {
  const [formState, setFormState] = useState({
    remainingPages: TOTAL_PAGES,
    missingPages: 0,
    printCopies: 1,
    pagesToPrint: 0,
    selectedPrinter: null,
    showPrinterForm: false,
    pagesPerSide: 1,
    selectedFile: null,
    paperSize: 'A4'
  });

  const calculateActualPages = (pages, copies, perSide) => {
    if (pages <= 0 || copies <= 0) return 0;
    return Math.ceil((pages * copies) / perSide);
  };

  useEffect(() => {
    const actualPagesNeeded = calculateActualPages(formState.pagesToPrint, formState.printCopies, formState.pagesPerSide);
    const missing = Math.max(actualPagesNeeded - TOTAL_PAGES, 0);
    const remaining = Math.max(TOTAL_PAGES - actualPagesNeeded, 0);

    setFormState(prev => ({
      ...prev,
      missingPages: missing,
      remainingPages: remaining
    }));
  }, [formState.pagesToPrint, formState.printCopies, formState.pagesPerSide]);

  const handleInputChange = (field, value) => {
    const processedValue = ['printCopies', 'pagesToPrint'].includes(field)
      ? Math.max(parseInt(value, 10) || 0, 0)
      : value;

    setFormState(prev => ({
      ...prev,
      [field]: processedValue
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && VALID_FILE_TYPES.includes(file.type)) {
      setFormState(prev => ({
        ...prev,
        selectedFile: file
      }));
      // TODO: Add logic to count pages in the file using PDF.js or similar.
    } else {
      alert('Chỉ chấp nhận file PDF hoặc Word (.doc, .docx)');
    }
  };

  return (
    <section className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full mx-8 lg:mx-20">
      <div className="flex gap-10 md:gap-32 max-md:flex-col max-w-[1024px] mx-auto">
        <div className="flex flex-col w-full lg:w-5/12">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c03e7cd16ef33d7f3d1a8b7b09546f4aeec9793f6296076ffc8be97a8c297571?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
            alt="Printer illustration"
            className="object-contain w-4/5 h-auto max-md:mt-10 mx-auto"
          />
          <div className="flex flex-col items-center md:items-start mt-8 w-full">
            <label className="mt-6 text-xl font-medium text-black">Máy in đã chọn</label>
            <div className="flex gap-4 w-full p-2 mt-2 bg-gray-200 border border-gray-300 rounded-xl shadow-sm text-gray-500">
              {formState.selectedPrinter ? (
                <span>{`${formState.selectedPrinter.name} (ID: ${formState.selectedPrinter.id})`}</span>
              ) : (
                <span className="text-gray-500">Chưa chọn máy in</span>
              )}
            </div>
            <button
              className="px-6 py-4 mt-4 text-base font-semibold text-white rounded-lg bg-slate-600 hover:bg-slate-700 w-full transition-colors duration-200"
              onClick={() => handleInputChange('showPrinterForm', true)}
            >
              Chọn máy in
            </button>
          </div>

          <div className="flex flex-col items-center md:items-start mt-8 w-full">
            <label htmlFor="fileUpload" className="text-xl font-medium">Tệp đang chọn</label>
            <div className="flex gap-4 p-2 mt-2 w-full bg-gray-200 border border-gray-300 rounded-xl shadow-sm text-gray-500">
              {formState.selectedFile ? (
                <span>{formState.selectedFile.name}</span>
              ) : (
                <span className="text-gray-500">Chưa chọn tệp</span>
              )}
            </div>
            <input
              type="file"
              id="fileUpload"
              className="mt-4 w-full"
              onChange={handleFileUpload}
              accept=".doc,.docx,.pdf"
            />
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-6/12">
          <h2 className="self-center text-2xl font-extrabold text-stone-900">THÔNG TIN IN</h2>
          <div className="flex gap-6 mt-8">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">SỐ TRANG IN CÓ SẴN</label>
              <div className="bg-gray-100 p-2 rounded text-lg font-semibold text-center">
                {TOTAL_PAGES}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xl font-medium text-black">Số trang cần in</label>
              <InputField
                type="number"
                value={formState.pagesToPrint.toString()}
                onChange={(e) => handleInputChange('pagesToPrint', e.target.value)}
                placeholder="Nhập số trang cần in"
                min="0"
              />
            </div>

            <div>
              <label className="text-xl font-medium text-black">Số bản in</label>
              <InputField
                type="number"
                value={formState.printCopies.toString()}
                onChange={(e) => handleInputChange('printCopies', e.target.value)}
                placeholder="Nhập số bản in"
                min="1"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-xl font-medium">Khổ giấy</label>
              <select
                value={formState.paperSize}
                onChange={(e) => handleInputChange('paperSize', e.target.value)}
                className="px-3 py-2 text-lg bg-white border border-gray-300 rounded-xl shadow-sm focus:ring focus:ring-slate-500"
              >
                <option value="A4">A4</option>
                <option value="A3">A3</option>
              </select>
            </div>

            <fieldset className="mt-4">
              <legend className="text-xl font-medium text-black">Số trang mỗi mặt</legend>
              <div className="flex flex-col gap-2 mt-2 border border-gray-300 rounded-lg shadow-sm">
                {[1, 2].map((value) => (
                  <label key={value} className="flex items-center gap-2 p-3 bg-white hover:bg-gray-50">
                    <input
                      type="radio"
                      name="pagesPerSide"
                      value={value}
                      checked={formState.pagesPerSide === value}
                      onChange={(e) => handleInputChange('pagesPerSide', parseInt(e.target.value, 10))}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{value} trang</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <button
        className="self-center px-12 py-4 mt-12 text-base font-semibold text-white uppercase rounded-xl max-md:w-full shadow-lg transition-colors duration-200 bg-blue-700 hover:bg-blue-800"
      >
        XÁC NHẬN
      </button>

      {formState.showPrinterForm && (
        <PrinterSelectionForm
          onSelectPrinter={(printer) => handleInputChange('selectedPrinter', printer)}
          onClose={() => handleInputChange('showPrinterForm', false)}
        />
      )}
    </section>
  );
}

export default PrintingForm;
