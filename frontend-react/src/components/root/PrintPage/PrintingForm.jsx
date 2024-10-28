import React, { useState, useEffect, useCallback, useMemo } from "react";
import InputField from "../fragments/InputField/InputField";
import PrinterSelectionForm from "./PrinterSelectionForm";

// Constants moved outside component
const TOTAL_PAGES = 100;
const VALID_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const PAPER_SIZES = {
  A4: 'A4',
  A3: 'A3'
};

const PAGES_PER_SIDE_OPTIONS = [1, 2];

// Separate components for better organization
const PrinterInfo = React.memo(({ selectedPrinter, onSelectPrinter }) => (
  <div className="flex flex-col items-center md:items-start mt-8 w-full">
    <label className="mt-6 text-xl font-medium text-black">Máy in đã chọn</label>
    <div className="flex gap-4 w-full p-2 mt-2 bg-gray-200 border border-gray-300 rounded-xl shadow-sm text-gray-500">
      {selectedPrinter ? (
        <span>{`${selectedPrinter.name} (ID: ${selectedPrinter.id})`}</span>
      ) : (
        <span className="text-gray-500">Chưa chọn máy in</span>
      )}
    </div>
    <button
      className="px-6 py-4 mt-4 text-base font-semibold text-white rounded-lg bg-slate-600 hover:bg-slate-700 w-full transition-colors duration-200"
      onClick={onSelectPrinter}
    >
      Chọn máy in
    </button>
  </div>
));

const FileUpload = React.memo(({ selectedFile, onFileUpload }) => (
  <div className="flex flex-col items-center md:items-start mt-8 w-full">
    <label htmlFor="fileUpload" className="text-xl font-medium">Tệp đang chọn</label>
    <div className="flex gap-4 p-2 mt-2 w-full bg-gray-200 border border-gray-300 rounded-xl shadow-sm text-gray-500">
      {selectedFile ? (
        <span>{selectedFile.name}</span>
      ) : (
        <span className="text-gray-500">Chưa chọn tệp</span>
      )}
    </div>
    <input
      type="file"
      id="fileUpload"
      className="mt-4 w-full"
      onChange={onFileUpload}
      accept=".doc,.docx,.pdf"
    />
  </div>
));

function PrintingForm({ printingData }) {
  // Initial state using a reducer pattern
  const [formState, setFormState] = useState({
    remainingPages: TOTAL_PAGES,
    missingPages: 0,
    printCopies: 1,
    pagesToPrint: 0,
    selectedPrinter: null,
    showPrinterForm: false,
    pagesPerSide: 1,
    selectedFile: null,
    paperSize: PAPER_SIZES.A4,
  });

  // Memoized comparison result
  const comparisonResult = useMemo(() => ({
    isSmaller: printingData < TOTAL_PAGES,
    isLarger: printingData > TOTAL_PAGES,
    isEqual: printingData === TOTAL_PAGES,
  }), [printingData]);

  // Memoized page calculation
  const calculateActualPages = useCallback((pages, copies, perSide) => {
    if (pages <= 0 || copies <= 0) return 0;
    return Math.ceil((pages * copies) / perSide);
  }, []);

  // Effect for page calculations
  useEffect(() => {
    const actualPagesNeeded = calculateActualPages(
      formState.pagesToPrint,
      formState.printCopies,
      formState.pagesPerSide
    );
    
    setFormState(prev => ({
      ...prev,
      missingPages: Math.max(actualPagesNeeded - TOTAL_PAGES, 0),
      remainingPages: Math.max(TOTAL_PAGES - actualPagesNeeded, 0)
    }));
  }, [formState.pagesToPrint, formState.printCopies, formState.pagesPerSide, calculateActualPages]);

  // Memoized handlers
  const handleInputChange = useCallback((field, value) => {
    const processedValue = ['printCopies', 'pagesToPrint'].includes(field)
      ? Math.max(parseInt(value, 10) || 0, 0)
      : value;

    setFormState(prev => ({
      ...prev,
      [field]: processedValue
    }));
  }, []);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file && VALID_FILE_TYPES.includes(file.type)) {
      setFormState(prev => ({
        ...prev,
        selectedFile: file
      }));
    } else {
      alert('Chỉ chấp nhận file PDF hoặc Word (.doc, .docx)');
    }
  }, []);

  const handlePrint = useCallback(() => {
    console.log(comparisonResult);
  }, [comparisonResult]);

  // New handler for printer selection
  const handlePrinterSelect = useCallback((printer) => {
    setFormState(prev => ({
      ...prev,
      selectedPrinter: printer,
      showPrinterForm: false
    }));
  }, []);

  // Memoized form sections
  const renderPrintingInfo = useMemo(() => (
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
            {Object.values(PAPER_SIZES).map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <fieldset className="mt-4">
          <legend className="text-xl font-medium text-black">Số trang mỗi mặt</legend>
          <div className="flex flex-col gap-2 mt-2 border border-gray-300 rounded-lg shadow-sm">
            {PAGES_PER_SIDE_OPTIONS.map((value) => (
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
  ), [formState.pagesToPrint, formState.printCopies, formState.paperSize, formState.pagesPerSide, handleInputChange]);

  return (
    <section className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full mx-8 lg:mx-20">
      <div className="flex gap-10 md:gap-32 max-md:flex-col max-w-[1024px] mx-auto">
        <div className="flex flex-col w-full lg:w-5/12">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c03e7cd16ef33d7f3d1a8b7b09546f4aeec9793f6296076ffc8be97a8c297571"
            alt="Printer illustration"
            className="object-contain w-4/5 h-auto max-md:mt-10 mx-auto"
          />
          <PrinterInfo
            selectedPrinter={formState.selectedPrinter}
            onSelectPrinter={() => handleInputChange('showPrinterForm', true)}
          />
          <FileUpload
            selectedFile={formState.selectedFile}
            onFileUpload={handleFileUpload}
          />
        </div>

        {renderPrintingInfo}
      </div>

      <button
        className="self-center px-12 py-4 mt-8 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        onClick={handlePrint}
      >
        Xác nhận in
      </button>
      
      {formState.showPrinterForm && (
        <PrinterSelectionForm
          onSelectPrinter={handlePrinterSelect}
          onClose={() => handleInputChange('showPrinterForm', false)}
        />
      )}
    </section>
  );
}

export default React.memo(PrintingForm);