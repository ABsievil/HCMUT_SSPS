import React, { useState, useEffect, useCallback } from "react";
import { Printer, File, Copy, Layout, AlertCircle, X } from "lucide-react";
import PrinterSelectionForm from './PrinterSelectionForm'
import { useSelector, useDispatch } from 'react-redux';
import { selectAvailableFileTypes, fetchFileType } from '../../../store/fileTypeSlice';
import { toast } from "react-toastify";
import { addPrintJob } from "../../../store/printJobSlice";
import { useUser } from "../../../store/userContext";
import { selectPersonalInfor } from "../../../store/personalInforSlice";
import { fetchUltilityByCurrentDate, selectSemesters } from "../../../store/semestersSlice";

const PAPER_SIZES = {
  A4: 'A4',
  A3: 'A3'
};

const PAGES_PER_SIDE_OPTIONS = [1, 2];

// Input component with consistent styling
const StyledInput = React.memo(({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-lg font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className={`
        w-full px-4 py-3 rounded-lg border
        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition duration-200
      `}
    />
  </div>
));

// PrinterInfo Component with enhanced UI
const PrinterInfo = React.memo(({ selectedPrinter, onSelectPrinter, error }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Printer className="w-6 h-6 text-gray-600" />
      <h3 className="text-xl font-medium text-gray-800">Máy in đã chọn</h3>
    </div>

    <div className={`
      p-4 rounded-lg border-2 transition-all duration-200
      ${error
        ? 'border-red-500 bg-red-50'  // Add red border and background if there's an error
        : selectedPrinter
          ? 'border-green-200 bg-green-50'
          : 'border-gray-200 bg-gray-50'
      }`}
    >
      {selectedPrinter ? (
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">
            {selectedPrinter.building} {selectedPrinter.room} - cơ sở {selectedPrinter.campus}
          </span>
          <span className="text-sm text-gray-500">
            ID: {selectedPrinter.printer_id}
          </span>
        </div>
      ) : (
        <span className="text-gray-500">Chưa chọn máy in</span>
      )}
    </div>

    {error && <p className="text-sm text-red-600 mt-1">{error}</p>} {/* Display error message */}

    <button
      onClick={onSelectPrinter}
      className="w-full px-6 py-3 flex items-center justify-center gap-2
        text-white bg-blue-600 rounded-lg
        hover:bg-blue-700 active:bg-blue-800
        transition duration-200 transform hover:scale-[1.02]"
    >
      <Printer className="w-5 h-5" />
      <span>Chọn máy in</span>
    </button>
  </div>
));

// Enhanced FileUpload component
const FileUpload = React.memo(({ selectedFile, onFileUpload, error }) => {
  const dispatch = useDispatch();
  const {CurrentUltility} = useSelector(selectSemesters);
  const {availableTypes} = useSelector(selectAvailableFileTypes);
  const [acceptedFileTypes, setAcceptedTypes] = useState("");
  const dragRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);

  useEffect(() => {
    dispatch(fetchUltilityByCurrentDate());
  }, [dispatch]);
  useEffect(()=>{
    dispatch(fetchFileType(CurrentUltility[0]?.semester));
  }, [CurrentUltility])
  useEffect(()=>{
    setAcceptedTypes(availableTypes?.data?.map(type => type.accepted_file_type).join(', '));
  },[availableTypes])

  const handleDrag = useCallback((e, isDragging) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isDragging);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      onFileUpload({ target: { files: [files[0]] } });
      toast.success("Tệp đã được thêm thành công!");
    }
  }, [onFileUpload]);

  const handleRemoveFile = useCallback((e) => {
    e.stopPropagation();
    onFileUpload({ target: { files: [] } });
    toast.info("Tệp đã bị gỡ bỏ.");
  }, [onFileUpload]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <File className="w-6 h-6 text-gray-600" />
        <h3 className="text-xl font-medium text-gray-800">Tệp cần in</h3>
      </div>

      <div
        ref={dragRef}
        onDragEnter={e => handleDrag(e, true)}
        onDragOver={e => handleDrag(e, true)}
        onDragLeave={e => handleDrag(e, false)}
        onDrop={handleDrop}
        className={`p-6 border-2 border-dashed rounded-lg transition-all duration-200 ${isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          } ${error ? 'border-red-500 bg-red-50' : ''}`}  
      >
        <div className="flex flex-col items-center gap-3">
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={(e) => {
              if (e.target.files.length) {
                onFileUpload(e);
                toast.success("Tệp đã được thêm thành công!");
              }
            }}
            accept={acceptedFileTypes}
          />

          {selectedFile ? (
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 flex items-center gap-2">
                <span className="font-medium truncate text-wrap">{selectedFile.name}</span>
              </div>
              <button
                onClick={handleRemoveFile}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors duration-200"
                title="Gỡ tệp"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <File className="w-12 h-12 text-gray-400" />
              <div className="text-center">
                <label htmlFor="fileUpload" className="text-blue-600 hover:text-blue-700 cursor-pointer">
                  Chọn tệp
                </label>
                <span className="text-gray-600"> hoặc kéo thả vào đây</span>
              </div>
            </>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>} {/* Show error message */}

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <AlertCircle className="w-4 h-4" />
        <span>Định dạng hỗ trợ: {acceptedFileTypes}</span>
      </div>
    </div>
  );
});


// Main PrintingForm component
function PrintingForm() {
  const dispatch = useDispatch();
  const [totalPagesRemain, setTotalPagesRemain] = useState(0);
  const {username} = useUser();
  const { isLoading, personalInfor, error } = useSelector(selectPersonalInfor);

  useEffect(()=>{
    setTotalPagesRemain(personalInfor?.data?.page_remain);
  }, [personalInfor]);

  const [formState, setFormState] = useState({
    remainingPages: totalPagesRemain,
    missingPages: 0,
    printCopies: 1,
    pagesToPrint: 1,
    selectedPrinter: null,
    showPrinterForm: false,
    pagesPerSide: 1,
    selectedFile: null,
    paperSize: PAPER_SIZES.A4,
    actualPages: 0
  }, [totalPagesRemain]);
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = useCallback((state) => {
    const actualPages = Math.ceil(
      (state.pagesToPrint * state.printCopies) / state.pagesPerSide * (state.paperSize === PAPER_SIZES.A4?1:2)
    );
    state.missingPages = Math.max(actualPages - totalPagesRemain, 0);
    state.remainingPages = Math.max(totalPagesRemain - actualPages, 0);
    state.actualPages = actualPages;
    
    const newErrors = {};
    // Kiểm tra lỗi cho từng trường
    if (!state.selectedPrinter) {
      newErrors.printer = 'Vui lòng chọn máy in';
    }
    if (!state.selectedFile) {
      newErrors.file = 'Vui lòng chọn tệp cần in';
    }
    if (state.missingPages > 0) {
      newErrors.pages = `Thiếu ${state.missingPages} trang để in`;
    }
    // Cập nhật lỗi vào state và trả về kết quả
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [totalPagesRemain]);

  // Handlers
  const handleInputChange = useCallback((field, value) => {
    setFormState(prev => {
      const updatedState = { ...prev, [field]: value };
      // Trigger form validation on change
      validateForm(updatedState);
      return updatedState;
    });
  }, [validateForm]);

  const handlePrint = useCallback(() => {
    // Revalidate the form before submission
    const isValid = validateForm(formState);

    if (isValid) {
      const printDTO = {
        username: username,
        printerId: formState.selectedPrinter.printer_id,
        printingDate: null,
        timeStart: null,
        timeEnd: null,
        fileName: formState.selectedFile.name,
        fileType: formState.selectedFile.name.split('.').pop(),
        numberPageOfFile: formState.pagesToPrint,
        pageSize: formState.paperSize,
        numberSize: formState.pagesPerSide,
        numberCopy: formState.printCopies,
        actualPages: formState.actualPages,
        id: -1
      }
      dispatch(addPrintJob(printDTO));

      toast.success('Xác nhận đơn in thành công');

    } else {
      toast.error('Vui lòng kiểm tra lại các lỗi và thử lại');
    }
  }, [formState, validateForm]);

  // Calculate pages effect
  // useEffect(() => {
  //   const actualPages = Math.ceil(
  //     (formState.pagesToPrint * formState.printCopies) / formState.pagesPerSide * (formState.paperSize === "A4")?1:2
  //   );

  //   setFormState(prev => ({
  //     ...prev,
  //     missingPages: Math.max(actualPages - totalPagesRemain, 0),
  //     remainingPages: Math.max(totalPagesRemain - actualPages, 0)
  //   }));
  // }, [formState.pagesToPrint, formState.printCopies, formState.pagesPerSide, formState.paperSize]);

  return (
    <div className="max-w-[830px] mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-36">
        {/* Left Column */}
        <div className="space-y-8">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c03e7cd16ef33d7f3d1a8b7b09546f4aeec9793f6296076ffc8be97a8c297571"
            alt="Printer illustration"
            className="w-32 mx-auto"
          />
          <PrinterInfo
            selectedPrinter={formState.selectedPrinter}
            onSelectPrinter={() => handleInputChange('showPrinterForm', true)}
            error={errors.printer}
          />

          <FileUpload
            selectedFile={formState.selectedFile}
            onFileUpload={(e) => handleInputChange('selectedFile', e.target.files[0])}
            error={errors.file}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Thông tin in ấn</h2>

          <div className="space-y-6">
            <div className="px-4 py-2 bg-blue-100 text-lg w-[65%] text-blue-800 rounded-lg font-medium">
              Số trang có sẵn: {totalPagesRemain}
            </div>
            <StyledInput
              label="Số trang cần in"
              type="number"
              value={formState.pagesToPrint}
              onChange={(e) => handleInputChange('pagesToPrint', parseInt(e.target.value) || 0)}
              min="1"
              placeholder="Nhập số trang"
            />

            <StyledInput
              label="Số bản in"
              type="number"
              value={formState.printCopies}
              onChange={(e) => handleInputChange('printCopies', parseInt(e.target.value) || 1)}
              min="1"
              placeholder="Nhập số bản in"
            />

            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">Khổ giấy</label>
              <div className="grid grid-cols-2 gap-4">
                {Object.values(PAPER_SIZES).map(size => (
                  <label
                    key={size}
                    className={`
                      flex items-center justify-center p-3
                      border rounded-lg cursor-pointer
                      transition duration-200
                      ${formState.paperSize === size
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white border-gray-300 hover:border-blue-400'}
                    `}
                  >
                    <input
                      type="radio"
                      name="paperSize"
                      value={size}
                      checked={formState.paperSize === size}
                      onChange={(e) => handleInputChange('paperSize', e.target.value)}
                      className="hidden"
                    />
                    <Layout className="w-5 h-5 mr-2" />
                    {size}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">Số trang mỗi mặt</label>
              <div className="grid grid-cols-2 gap-4">
                {PAGES_PER_SIDE_OPTIONS.map(value => (
                  <label
                    key={value}
                    className={`
                      flex items-center justify-center p-3
                      border rounded-lg cursor-pointer
                      transition duration-200
                      ${formState.pagesPerSide === value
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white border-gray-300 hover:border-blue-400'}
                    `}
                  >
                    <input
                      type="radio"
                      name="pagesPerSide"
                      value={value}
                      checked={formState.pagesPerSide === value}
                      onChange={(e) => handleInputChange('pagesPerSide', parseInt(e.target.value))}
                      className="hidden"
                    />
                    <Copy className="w-5 h-5 mr-2" />
                    {value} trang
                  </label>
                ))}
              </div>
            </div>
          </div>

          {formState.missingPages > 0 && (
            <div className="mt-4 p-4 text-sm text-red-500 border border-red-400 bg-red-100 rounded">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10A8 8 0 11.001 10a8 8 0 0117.998 0zM9 4a1 1 0 112 0v5a1 1 0 11-2 0V4zm1 7a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Bạn cần thêm {formState.missingPages} trang để hoàn thành việc in.
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={handlePrint}
          className="px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg
            hover:bg-blue-700 active:bg-blue-800 
            disabled:bg-gray-400 disabled:cursor-not-allowed
            transition duration-200 transform hover:scale-[1.02]"
        >
          Xác nhận thông tin
        </button>
      </div>

      {formState.showPrinterForm && (
        <PrinterSelectionForm
          onSelectPrinter={(printer) => {
            handleInputChange('selectedPrinter', printer);
            handleInputChange('showPrinterForm', false);
          }}
          onClose={() => handleInputChange('showPrinterForm', false)}
        />
      )}
    </div>
  );
}

export default React.memo(PrintingForm);