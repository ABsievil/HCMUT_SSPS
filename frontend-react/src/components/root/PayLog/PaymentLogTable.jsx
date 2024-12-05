import React, { useEffect, useState, useMemo } from "react";
import { X } from "lucide-react";
import { useUser } from "../../../store/userContext";
import { useSelector, useDispatch } from "react-redux";
import { selectPaymentStudentLog } from "../../../store/paymentLogSlice";
import {
  fetchLogBuyPageStudent,
  fetchLogBuyPageAllStudent,
} from "../../../store/paymentLogSlice";

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

const titleMapping = {
  transaction_id: "Mã giao dịch",
  purchase_page: "Số trang",
  purchase_date: "Ngày mua",
  purchase_time: "Thời gian",
};

const PaymentHistoryDetail = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  // Filter out redundant or empty fields
  const filteredData = Object.entries(data).filter(
    ([key, value]) => 
      value && 
      key !== "username" && 
      key !== "studentId" &&
      key !== "MSSV"
  ).map(([key, value]) => {
    if (key === 'student_id') {
      return ['MSSV', value];
    }
    return [key, value];
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Chi tiết giao dịch</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredData.map(([key, value]) => (
              <div key={key}>
                <p className="font-medium text-gray-700">
                  {titleMapping[key] || key}:
                </p>
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
  const role = localStorage.getItem('userRole');
  const userId = localStorage.getItem('studentId');

  const dispatch = useDispatch();
  const { studentPayLogs, allStudentPayLogs, loading, error } = useSelector(selectPaymentStudentLog);
  const [filters, setFilters] = useState({
    studentId: role === "USER" ? userId : "",
    dateStart: "",
    dateEnd: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  // Debounced studentId to reduce API calls
  const debouncedStudentId = useMemo(() => {
    return filters.studentId.trim();
  }, [filters.studentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === "ADMIN") {
          if (debouncedStudentId) {
            await dispatch(
              fetchLogBuyPageStudent({ studentId: debouncedStudentId, ...filters })
            ).unwrap();
          } else {
            await dispatch(fetchLogBuyPageAllStudent(filters)).unwrap();
          }
        } else if (role === "USER" && userId) {
          await dispatch(
            fetchLogBuyPageStudent({ studentId: userId, ...filters })
          ).unwrap();
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 500);
    return () => clearTimeout(debounceTimeout);
  }, [debouncedStudentId, filters.dateStart, filters.dateEnd, role, userId, dispatch]);

  useEffect(() => {
    if (role === "USER" && userId) {
      setFilters((prev) => ({ ...prev, studentId: userId }));
    }
  }, [role, userId]);

  const data = useMemo(() => {
    const fetchedData = role === "ADMIN"
      ? debouncedStudentId
        ? Array.isArray(studentPayLogs) ? studentPayLogs : []
        : Array.isArray(allStudentPayLogs) ? allStudentPayLogs : []
      : Array.isArray(studentPayLogs) ? studentPayLogs : [];
    
    // Tạo bản sao dữ liệu trước khi đảo ngược
    return [...fetchedData].reverse();
  }, [allStudentPayLogs, studentPayLogs, role, debouncedStudentId]);

  const tableHeaders = useMemo(() => {
    const headers = [
      { key: "transaction_id", label: "Mã giao dịch" },
      { key: "purchase_page", label: "Số trang" },
      { key: "purchase_date", label: "Ngày mua" },
      { key: "purchase_time", label: "Thời gian" },
    ];
  
    // Thêm MSSV vào tiêu đề bảng cho ADMIN nếu không lọc theo studentId
    if (role === "ADMIN" && debouncedStudentId === "") {
      headers.unshift({ key: "MSSV", label: "MSSV" });
    }
  
    return headers;
  }, [role, debouncedStudentId]);

  const currentRows = useMemo(() => {
    const enrichedRows = data.map((row) => ({
      MSSV: row.student_id || row.studentId, // Thêm dòng này để lấy student_id
      ...row,
    }));
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return enrichedRows.slice(indexOfFirstRow, indexOfLastRow).map((row) => ({
      ...row
    }));
  }, [data, filters.studentId, currentPage, rowsPerPage]);

  const handleFilterChange = (key) => (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

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
          {role === "ADMIN" && (
            <FilterInput
              label="MSSV"
              value={filters.studentId || ""}
              onChange={handleFilterChange("studentId")}
              placeholder="Nhập MSSV để tìm kiếm"
            />
          )}
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
        <div className="text-center py-8 text-red-600">Đã xảy ra lỗi, vui lòng thử lại sau.</div>
      ) : data.length > 0 ? (
        <>
          <table className="w-full md:w-[70%] bg-white mt-3 m-auto">
            <thead className="bg-themecolor1">
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header.key} className="py-3 text-center">{header.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-white hover:bg-gray-200' : 'bg-purple-100 hover:bg-purple-200'} cursor-pointer`}
                  onClick={() => handleRowClick(row)}
                >
                  {tableHeaders.map((header) => (
                    <td key={header.key} className="py-4 text-center">{row[header.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:bg-gray-300"
            >
              Trước
            </button>
            <span className="mx-4 self-center">Trang {currentPage} của {totalPages}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:bg-gray-300"
            >
              Sau
            </button>
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

