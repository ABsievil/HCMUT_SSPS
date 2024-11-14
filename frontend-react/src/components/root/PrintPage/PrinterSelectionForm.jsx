import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, CircleAlert, X } from "lucide-react";
import InputField from "../fragments/InputField/InputField";
import { fetchPrintersabc } from "../../../store/PrintersabcSlice";
import { toast } from "react-toastify";

const PrinterSelectionForm = ({ onSelectPrinter, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, printerList, error } = useSelector(
    (state) => state.printersabc
  );
  useEffect(() => {
      dispatch(fetchPrintersabc());
  }, []);

  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPrinterDetails, setShowPrinterDetails] = useState(false);
  const [detailedPrinter, setDetailedPrinter] = useState(null);

  const filteredPrinters = printerList.data.filter(
    (printer) =>
      printer.brand_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      printer.printer_id.includes(searchQuery) ||
      printer.building.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrinterSelect = (printer) => {
    setSelectedPrinter(printer);
  };

  const handleConfirm = () => {
    onSelectPrinter(selectedPrinter);
    toast.success(`Máy in ${selectedPrinter.printer_id} đã được chọn!`);
    onClose();
  };

  const handleShowDetails = (e, printer) => {
    e.stopPropagation();
    setDetailedPrinter(printer);
    setShowPrinterDetails(true);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Chọn Máy In</h2>

        <div className="relative mb-4">
          <InputField
            type="text"
            placeholder="Tìm kiếm máy in..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
          {filteredPrinters.map((printer) => (
            <div
              key={printer.printer_id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedPrinter && selectedPrinter.printer_id === printer.printer_id
                ? "bg-blue-100 border-blue-500"
                : "hover:bg-gray-100"
                }`}
              onClick={() => handlePrinterSelect(printer)}
            >
              {printer.state && (
                <div className="flex justify-between items-center ">
                  <div className="flex flex-col">
                    <p className="font-medium">{printer.brand_name} - {printer.printer_model}</p>
                    <div className="flex">
                      <p className="text-sm text-gray-600">ID: {printer.printer_id}</p>
                      <p className="text-sm text-gray-600 ml-3">
                        Vị trí: {printer.building} {printer.room} - cơ sở {printer.campus}
                      </p>
                    </div>
                  </div>
                  <CircleAlert
                    className="text-gray-400 hover:text-blue-500"
                    size={20}
                    onClick={(e) => handleShowDetails(e, printer)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedPrinter}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Xác nhận
          </button>
        </div>
      </div>

      {showPrinterDetails && detailedPrinter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Thông tin máy in</h3>
              <X
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                size={24}
                onClick={() => setShowPrinterDetails(false)}
              />
            </div>
            <div className="space-y-2">
              <p>
                <strong>Tên:</strong> {detailedPrinter.brand_name}
              </p>
              <p>
                <strong>ID:</strong> {detailedPrinter.printer_id}
              </p>
              <p>
                <strong>Vị trí:</strong> {detailedPrinter.building}
              </p>
              <p>
                <strong>Trạng thái:</strong> {detailedPrinter.state ? 'sẵn sàng' : 'không hoat động'}
              </p>
              <p>
                <strong>Loại:</strong> {detailedPrinter.printer_model}
              </p>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full"
              onClick={() => setShowPrinterDetails(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrinterSelectionForm;
