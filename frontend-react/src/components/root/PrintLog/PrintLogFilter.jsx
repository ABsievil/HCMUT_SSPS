import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPrinterList } from '../../../store/PrintersabcSlice';

const PrintLogFilter = ({ type }) => {
  const [printerId, setPrinterId] = useState('');
  const [startDate, setStartDate] = useState('2018-10-12');
  const [endDate, setEndDate] = useState('2018-10-12');
  const [MSSV, setMSSV] = useState('');

  const handleMSSVChange = (e) => setMSSV(e.target.value);
  const handlePrinterChange = (e) => setPrinterId(e.target.value === 'reset' ? '' : e.target.value);

  const renderInputField = (label, value, onChange, type = "text") => (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
  );
  
  const { isLoading, printerList, error } = useSelector(selectPrinterList);
  if (isLoading || error)
      return <div>Loading...</div>

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
            <option value="reset">Tất cả máy in</option>
            {printerList.data.length > 0 ? (
              printerList.data.map(printer => (
                <option key={printer.printer_id} value={printer.printer_id}>
                  {printer.brand_name} {printer.printer_model} - {printer.building} {printer.room} - {printer.state?"sẵn sàng":"ngừng hoạt động"}
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
