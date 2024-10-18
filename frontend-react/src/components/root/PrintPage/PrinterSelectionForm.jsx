import React, { useState } from 'react';
import { Search, CircleAlert, X } from 'lucide-react';
import InputField from "../fragments/InputField/InputField";

const PrinterSelectionForm = ({ onSelectPrinter, onClose }) => {
  const [selectedPrinter, setSelectedPrinter] = useState(null); // Đổi về null
  const [searchQuery, setSearchQuery] = useState('');
  const [showPrinterDetails, setShowPrinterDetails] = useState(false);
  const [detailedPrinter, setDetailedPrinter] = useState(null);

  const availablePrinters = [
    { id: '1234', name: 'HP LaserJet Pro M404dn', location: 'Phòng H6-101', status: 'Sẵn sàng', type: 'Laser' },
    { id: '1245', name: 'Epson WorkForce Pro WF-3720', location: 'Phòng H2-202', status: 'Đang bảo trì', type: 'Inkjet' },
    { id: '3456', name: 'Brother HL-L2350DW', location: 'Phòng H3-303', status: 'Sẵn sàng', type: 'Canon' },
    { id: '2234', name: 'HP LaserJet Pro M404dn', location: 'Phòng H1-101', status: 'Sẵn sàng', type: 'Laser' },
  ];

  const filteredPrinters = availablePrinters.filter(printer =>
    printer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    printer.id.includes(searchQuery) ||
    printer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrinterSelect = (printer) => { // Chỉnh sửa để nhận cả đối tượng máy in
    setSelectedPrinter(printer);
  };

  const handleConfirm = () => {
    onSelectPrinter(selectedPrinter); // Gửi toàn bộ đối tượng máy in
    onClose();
  };

  const handleShowDetails = (e, printer) => {
    e.stopPropagation();
    setDetailedPrinter(printer);
    setShowPrinterDetails(true);
  };

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
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
          {filteredPrinters.map((printer) => (
            <div
              key={printer.id}
              className={`p-3 border rounded-lg cursor-pointer flex justify-between items-center transition-colors ${selectedPrinter && selectedPrinter.id === printer.id ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'
                }`}
              onClick={() => handlePrinterSelect(printer)} // Gọi hàm với đối tượng máy in
            >
              <div className="flex flex-col">
                <p className="font-medium">{printer.name}</p>
                <div className='flex'>
                  <p className="text-sm text-gray-600">ID: {printer.id}</p>
                  <p className="text-sm text-gray-600 ml-3">Vị trí: {printer.location}</p>
                </div>
              </div>
              <CircleAlert
                className="text-gray-400 hover:text-blue-500"
                size={20}
                onClick={(e) => handleShowDetails(e, printer)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors">
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
              <p><strong>Tên:</strong> {detailedPrinter.name}</p>
              <p><strong>ID:</strong> {detailedPrinter.id}</p>
              <p><strong>Vị trí:</strong> {detailedPrinter.location}</p>
              <p><strong>Trạng thái:</strong> {detailedPrinter.status}</p>
              <p><strong>Loại:</strong> {detailedPrinter.type}</p>
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
