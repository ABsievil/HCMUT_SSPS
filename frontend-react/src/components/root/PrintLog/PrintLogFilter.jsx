import React, { useState } from 'react';

const PrintLogFilter = () => {
  const [printerId, setPrinterId] = useState('');
  const [startDate, setStartDate] = useState('2018-10-12');
  const [endDate, setEndDate] = useState('2018-10-12');

  return (
    <div className="p-4">

      <div className="flex justify-center items-center space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CHỌN MÁY IN
          </label>
          <select
            value={printerId}
            onChange={(e) => setPrinterId(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>
              ID Máy In
            </option>
            <option value="h6-104" >
              h6-104
            </option>
            <option value="h6-102">
              h6-102
            </option>
            <option value="h1-210">
              h1-210
            </option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            TỪ
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ĐẾN
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default PrintLogFilter;
