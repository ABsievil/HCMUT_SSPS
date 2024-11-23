import React, { useState } from 'react';
import { X } from 'lucide-react';

const PaymentHistoryDetail = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Chi tiết lịch sử thanh toán</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Thông tin cơ bản</h3>
              <div className="mt-2 space-y-2">
                <p><span className="font-medium">MSSV:</span> {data.mssv}</p>
                <p><span className="font-medium">Họ và tên:</span> {data.fullName}</p>
                <p><span className="font-medium">ID giao dịch:</span> {data.transactionId}</p>
                <p><span className="font-medium">Phương thức thanh toán:</span> {data.paymentMethod}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Thời gian</h3>
              <div className="mt-2 space-y-2">
                <p><span className="font-medium">Ngày giao dịch:</span> {data.transactionDate}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Chi tiết thanh toán</h3>
              <div className="mt-2 space-y-2">
                <p><span className="font-medium">Số tiền:</span> {data.amount} VND</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentPaymentLogTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const rows = [
    {
      mssv: 2021001,
      fullName: 'Nguyễn Văn A',
      transactionId: 'TX12345',
      paymentMethod: 'Thẻ tín dụng',
      startTime: '12:20',
      endTime: '12:59',
      transactionDate: '26/09/2024',
      amount: 50000,
    },
    {
      mssv: 2021001,
      fullName: 'Nguyễn Văn A',
      transactionId: 'TX12346',
      paymentMethod: 'Ví điện tử',
      startTime: '14:00',
      endTime: '14:15',
      transactionDate: '27/09/2024',
      amount: 75000,
    },
    {
      mssv: 2021001,
      fullName: 'Nguyễn Văn A',
      transactionId: 'TX12347',
      paymentMethod: 'Tiền mặt',
      startTime: '10:00',
      endTime: '10:20',
      transactionDate: '28/09/2024',
      amount: 60000,
    },
  ];

  // Tính tổng số tiền đã thanh toán
  const calculateTotalAmount = () => {
    return rows.reduce((total, row) => total + row.amount, 0);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setShowDetail(true);
  };

  return (
    <div className="overflow-x-auto drop-shadow-lg mx-10 py-4">
      <h1 className="text-center text-2xl font-bold mt-10 mb-5">
        LỊCH SỬ THANH TOÁN CỦA SINH VIÊN
      </h1>

      <div className="mb-4 text-center">
        <p className="text-base text-gray-600">
          Dưới đây là danh sách các giao dịch thanh toán của sinh viên.
        </p>
      </div>

      <table className="w-full md:w-4/5 bg-white mt-3 m-auto">
        <thead>
          <tr className="bg-themecolor1">
            <th className="py-3 text-center">MSSV</th>
            <th className="py-3 text-center">Họ và tên</th>
            <th className="py-3 text-center">ID giao dịch</th>
            <th className="py-3 text-center">Phương thức thanh toán</th>
            <th className="py-3 text-center">Số tiền (VND)</th>
            <th className="py-3 text-center">Ngày giao dịch</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`
                ${index % 2 === 0 ? 'bg-white hover:bg-gray-200' : 'bg-purple-100 hover:bg-purple-200'}
                 cursor-pointer transition-colors duration-150
              `}
              onClick={() => handleRowClick(row)}
            >
              <td className="py-4 text-center">{row.mssv}</td>
              <td className="py-4 text-center">{row.fullName}</td>
              <td className="py-4 text-center">{row.transactionId}</td>
              <td className="py-4 text-center">{row.paymentMethod}</td>
              <td className="py-4 text-center">{row.amount}</td>
              <td className="py-4 text-center">{row.transactionDate}</td>
              <td className="py-4 text-center">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-5">
        <p className="font-medium text-lg">
          Tổng số tiền đã thanh toán: {calculateTotalAmount()} VND
        </p>
      </div>

      <PaymentHistoryDetail
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        data={selectedRow || {}}
      />
    </div>
  );
};

export default StudentPaymentLogTable;
