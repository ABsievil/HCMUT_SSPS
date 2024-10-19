import React, { useState } from 'react';

const PrintLogFilter = ({ type }) => {
  const [printerType, setPrinterType] = useState('');
  const [printerId, setPrinterId] = useState('');
  const [startDate, setStartDate] = useState('2018-10-12');
  const [endDate, setEndDate] = useState('2018-10-12');
  const [MSSV, setMSSV] = useState(''); // Declare MSSV state

  const handleMSSVChange = (e) => {
    setMSSV(e.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center space-x-4">
        {type === "student-admin" && (
          <div className='flex flex-col'>
            <label htmlFor="MSSV" className="block text-sm font-medium text-gray-700">
              MSSV
            </label>
            <input
              id="MSSV"
              type="text"
              value={MSSV}
              onChange={handleMSSVChange}
              placeholder="Nhập MSSV"
              className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
        )}
        {/* Paper Size Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">LOẠI GIẤY IN</label>
          <select
            value={printerType}
            onChange={(e) => setPrinterType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>Khổ Giấy</option>
            <option value="A4">A4</option>
            <option value="A3">A3</option>
            <option value="A5">A5</option>
          </select>
        </div>

        {/* Printer ID Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">CHỌN MÁY IN</label>
          <select
            value={printerId}
            onChange={(e) => setPrinterId(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>ID Máy In</option>
            <option value="h6-104">h6-104</option>
            <option value="h6-102">h6-102</option>
            <option value="h1-210">h1-210</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">TỪ</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">ĐẾN</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
      </div>

      {type === "student" && (
        <div className="pt-10 text-base font-medium leading-6 text-black">
          TỔNG SỐ TRANG ĐÃ SỬ DỤNG: <span>120</span>
        </div>
      )}
    </div>
  );
};

export default PrintLogFilter;
