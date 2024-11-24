import React, { useState } from "react";
import { X } from "lucide-react";
import { useUser } from "../../../store/userContext";

// Tách component chi tiết thanh toán thành component riêng
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
                {data.mssv && (
                  <p>
                    <span className="font-medium">MSSV:</span> {data.mssv}
                  </p>
                )}
                <p>
                  <span className="font-medium">ID giao dịch:</span>{" "}
                  {data.transactionId}
                </p>
                <p>
                  <span className="font-medium">Phương thức thanh toán:</span>{" "}
                  {data.paymentMethod}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Thời gian</h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Ngày giao dịch:</span>{" "}
                  {data.transactionDate}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Chi tiết thanh toán</h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Số tiền:</span> {data.amount} VND
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentLogTable = () => {
  const { role } = useUser();
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Số dòng mỗi trang

  // Dữ liệu mẫu dựa trên role
  const allRows = role === "ADMIN" 
    ? [
        {
          mssv: 2021001,
          transactionId: "TX12345",
          paymentMethod: "Thẻ tín dụng",
          transactionDate: "26/09/2024",
          amount: 50000,
        },
        {
          mssv: 2021002,
          transactionId: "TX12346",
          paymentMethod: "Ví điện tử",
          transactionDate: "27/09/2024",
          amount: 75000,
        },
        // Thêm nhiều dữ liệu mẫu hơn để test phân trang
        {
          mssv: 2021003,
          transactionId: "TX12347",
          paymentMethod: "Thẻ tín dụng",
          transactionDate: "28/09/2024",
          amount: 60000,
        },
        {
          mssv: 2021004,
          transactionId: "TX12348",
          paymentMethod: "Ví điện tử",
          transactionDate: "29/09/2024",
          amount: 85000,
        },
        {
          mssv: 2021005,
          transactionId: "TX12349",
          paymentMethod: "Thẻ tín dụng",
          transactionDate: "30/09/2024",
          amount: 55000,
        },
      ]
    : [
        {
          mssv: 2021001,
          fullName: "Nguyễn Văn A",
          transactionId: "TX12345",
          paymentMethod: "Thẻ tín dụng",
          transactionDate: "26/09/2024",
          amount: 50000,
        },
        {
          mssv: 2021001,
          fullName: "Nguyễn Văn A",
          transactionId: "TX12346",
          paymentMethod: "Ví điện tử",
          transactionDate: "27/09/2024",
          amount: 75000,
        },
        // Thêm dữ liệu mẫu cho user
        {
          mssv: 2021001,
          fullName: "Nguyễn Văn A",
          transactionId: "TX12347",
          paymentMethod: "Thẻ tín dụng",
          transactionDate: "28/09/2024",
          amount: 60000,
        },
        
      ];

  // Tính toán các thông số phân trang
  const totalPages = Math.ceil(allRows.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = allRows.slice(indexOfFirstRow, indexOfLastRow);

  // Xử lý chuyển trang
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Tính tổng số tiền
  const calculateTotalAmount = () => {
    return allRows.reduce((total, row) => total + row.amount, 0);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setShowDetail(true);
  };

  // Định nghĩa headers cho bảng
  const tableHeaders = role === "ADMIN" 
    ? [
        { key: "mssv", label: "MSSV" },
        { key: "transactionId", label: "ID giao dịch" },
        { key: "paymentMethod", label: "Phương thức thanh toán" },
        { key: "amount", label: "Số tiền (VND)" },
        { key: "transactionDate", label: "Ngày giao dịch" },
      ]
    : [
        { key: "fullName", label: "Họ và tên" },
        { key: "transactionId", label: "ID giao dịch" },
        { key: "paymentMethod", label: "Phương thức thanh toán" },
        { key: "amount", label: "Số tiền (VND)" },
        { key: "transactionDate", label: "Ngày giao dịch" },
      ];

  return (
    <div className="overflow-x-auto drop-shadow-lg mx-10 py-4">
      <h1 className="text-center text-2xl font-bold mt-10 mb-5">
        {role === "ADMIN" ? "LỊCH SỬ THANH TOÁN CỦA HỆ THỐNG" : "LỊCH SỬ THANH TOÁN CỦA SINH VIÊN"}
      </h1>

      <div className="mb-4 text-center">
        <p className="text-base text-gray-600">
          {role === "ADMIN"
            ? "Hiển thị tất cả giao dịch trong hệ thống."
            : "Dưới đây là danh sách các giao dịch thanh toán của bạn."}
        </p>
      </div>

      {allRows.length > 0 ? (
        <>
          <table className="w-full md:w-4/5 bg-white mt-3 m-auto">
            <thead>
              <tr className="bg-themecolor1">
                {tableHeaders.map(({ key, label }) => (
                  <th key={key} className="py-3 text-center">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? "bg-white hover:bg-gray-200"
                      : "bg-purple-100 hover:bg-purple-200"
                  } cursor-pointer transition-colors duration-150`}
                  onClick={() => handleRowClick(row)}
                >
                  {tableHeaders.map(({ key }) => (
                    <td key={key} className="py-4 text-center">{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center mt-5">
            <p className="font-medium text-lg">
              Tổng số tiền đã thanh toán: {calculateTotalAmount()} VND
            </p>
          </div>

          {/* Phân trang */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            
            <span className="text-gray-600">
              Trang {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-600">
          Không có dữ liệu thanh toán
        </div>
      )}

      <PaymentHistoryDetail
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        data={selectedRow || {}}
      />
    </div>
  );
};

export default PaymentLogTable;