import React, { useState, useMemo } from 'react';

const PrintLogFilter = ({ type }) => {
  const printerData = useMemo(() => [
    { id: '1234', name: 'HP LaserJet Pro M404dn', location: 'Phòng H6-101', status: 'Sẵn sàng', type: 'Laser' },
    { id: '1245', name: 'Epson WorkForce Pro WF-3720', location: 'Phòng H2-202', status: 'Đang bảo trì', type: 'Inkjet' },
    { id: '3456', name: 'Brother HL-L2350DW', location: 'Phòng H3-303', status: 'Sẵn sàng', type: 'Canon' },
    { id: '2234', name: 'HP LaserJet Pro M404dn', location: 'Phòng H1-101', status: 'Sẵn sàng', type: 'Laser' },
  ], []);

  const [printerId, setPrinterId] = useState('');
  const [startDate, setStartDate] = useState('2018-10-12');
  const [endDate, setEndDate] = useState('2018-10-12');
  const [MSSV, setMSSV] = useState('');

  const handleMSSVChange = (e) => {
    setMSSV(e.target.value);
  };

  const renderInputField = (label, value, onChange, type = "text") => (
    <div className='flex flex-col'>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
  );

  const handlePrinterChange = (e) => {
    const value = e.target.value;
    setPrinterId(value === 'reset' ? '' : value); // Đặt lại printerId nếu lựa chọn là 'reset'
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center space-x-4">
        {type === "admin" && renderInputField("MSSV", MSSV, handleMSSVChange)}

        {/* Printer ID Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">CHỌN MÁY IN</label>
          <select
            value={printerId}
            onChange={handlePrinterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="reset" >Tên máy in</option>
            {printerData.length > 0 ? (
              printerData.map(printer => (
                <option key={printer.id} value={printer.id}>
                  {printer.name} - {printer.location} - {printer.status}
                </option>
              ))
            ) : (
              <option value="" disabled>Không có máy in nào</option>
            )}
          </select>
        </div>

        {/* Start Date */}
        {renderInputField("TỪ", startDate, (e) => setStartDate(e.target.value), "date")}

        {/* End Date */}
        {renderInputField("ĐẾN", endDate, (e) => setEndDate(e.target.value), "date")}
      </div>
    </div>
  );
};

export default PrintLogFilter;
