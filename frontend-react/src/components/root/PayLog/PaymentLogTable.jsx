import React, { useEffect, useState, useMemo } from "react";
import { X } from "lucide-react";
import { useUser } from "../../../store/userContext";
import { useSelector, useDispatch } from "react-redux";
import { selectPaymentStudentLog } from "../../../store/paymentLogSlice";
import {
  fetchLogBuyPageStudent,
  fetchLogBuyPageAllStudent,
} from "../../../store/paymentLogSlice";

const tableHeaders = [
  { key: "username", label: "Tên người dùng" },
  { key: "transaction_id", label: "Mã giao dịch" },
  { key: "purchase_page", label: "Số trang" },
  { key: "purchase_date", label: "Ngày mua" },
  { key: "purchase_time", label: "Thời gian" },
];

const FilterInput = ({ label, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    />
  </div>
);

const PaymentHistoryDetail = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 mx-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Chi tiết giao dịch</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(data).map(([key, value]) => (
              <div key={key}>
                <p className="font-medium text-gray-700">{key}:</p>
                <p className="mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentLogTable = () => {
  const { role, userId } = useUser();
  const dispatch = useDispatch();
  const { studentPayLogs, allStudentPayLogs, loading, error } = useSelector(selectPaymentStudentLog);
  const [filters, setFilters] = useState({ dateStart: "", dateEnd: "" });
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === "ADMIN") {
          await dispatch(fetchLogBuyPageAllStudent(filters)).unwrap();
        } else if (role === "STUDENT" && userId) {
          await dispatch(fetchLogBuyPageStudent({ studentId: userId, ...filters })).unwrap();
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [filters, role, userId, dispatch]);

  const data = useMemo(() => {
    if (role === "ADMIN") {
      return Array.isArray(allStudentPayLogs) ? allStudentPayLogs : [];
    }
    return Array.isArray(studentPayLogs) ? studentPayLogs : [];
  }, [allStudentPayLogs, studentPayLogs, role]);
  
  console.log("AllStudentPayLogs:", allStudentPayLogs); // Debug API data
  console.log("StudentPayLogs:", studentPayLogs); // Debug student-specific data
  
  // Debugging filters and role
  console.log("Filters:", filters);
  console.log("Role:", role, "UserId:", userId);
    const handleFilterChange = (key) => (e) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const currentRows = useMemo(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return data.slice(indexOfFirstRow, indexOfLastRow);
  }, [currentPage, data, rowsPerPage]);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const calculateTotalPages = () =>
    data.reduce((total, row) => total + (Number(row.purchase_page) || 0), 0);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setShowDetail(true);
  };

  return (
    <div className="overflow-x-auto drop-shadow-lg mx-10 py-4">
      <h1 className="text-center text-2xl font-bold mt-10 mb-5">
        {role === "ADMIN" ? "LỊCH SỬ MUA GIẤY IN CỦA HỆ THỐNG" : "LỊCH SỬ MUA GIẤY IN CỦA SINH VIÊN"}
      </h1>

      <div className="p-4">
        <div className="flex justify-center items-center space-x-4">
          <FilterInput
            label="TỪ NGÀY"
            value={filters.dateStart}
            onChange={handleFilterChange("dateStart")}
            type="date"
          />
          <FilterInput
            label="ĐẾN NGÀY"
            value={filters.dateEnd}
            onChange={handleFilterChange("dateEnd")}
            type="date"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-600">Đang tải dữ liệu...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">Lỗi: {error}</div>
      ) : data.length > 0 ? (
        <>
          <table className="w-full md:w-4/5 bg-white mt-3 m-auto border-collapse">
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header.key} className="px-4 py-2 border-b text-center">{header.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index} className="text-center cursor-pointer" onClick={() => handleRowClick(row)}>
                  {tableHeaders.map((header) => (
                    <td key={header.key} className="border-b px-4 py-2">{row[header.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center py-4">
            <div>
              <span className="text-sm">Tổng số trang: {calculateTotalPages()} trang</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Trước
              </button>
              <span>{currentPage}/{totalPages}</span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-600">Không có dữ liệu</div>
      )}

      <PaymentHistoryDetail
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        data={selectedRow}
      />
    </div>
  );
};

export default PaymentLogTable;
