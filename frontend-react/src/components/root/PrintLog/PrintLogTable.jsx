import React from 'react';

const Table = () => {
  const rows = [
    { id: 1234, mssv: 221185, name: 'congthuc.doc', startDate: '26/09/2024', endDate: '26/09/2024' },
    { id: 1234, mssv: 221185, name: 'congthuc.doc', startDate: '26/09/2024', endDate: '26/09/2024' },
    { id: 1234, mssv: 221185, name: 'congthuc.doc', startDate: '26/09/2024', endDate: '26/09/2024' },
    { id: 1234, mssv: 221185, name: 'congthuc.doc', startDate: '26/09/2024', endDate: '26/09/2024' },

  ];

  return (
    <div className="overflow-x-auto drop-shadow-lg">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-purple-200">
            <th className="px-6 py-3 text-left">ID máy in</th>
            <th className="px-6 py-3 text-left">MSSV</th>
            <th className="px-6 py-3 text-left">Ten tệp</th>
            <th className="px-6 py-3 text-left">Ngày đăng ký</th>
            <th className="px-6 py-3 text-left">Ngày kết thúc</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-purple-100'}`}>
              <td className="px-6 py-4">{row.id}</td>
              <td className="px-6 py-4">{row.mssv}</td>
              <td className="px-6 py-4">{row.name}</td>
              <td className="px-6 py-4">{row.startDate}</td>
              <td className="px-6 py-4">{row.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
