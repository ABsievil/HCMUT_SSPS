import React, { useEffect, useState, useMemo, useCallback } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectPaymentStudentLog, fetchLogBuyPageStudent, fetchLogBuyPageAllStudent } from "../../../store/paymentLogSlice";

const FilterInput = React.memo(({ label, value, onChange, type = "text" }) => (
  <div className="w-full md:w-auto mb-4 md:mb-0">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value ?? ""}
      onChange={onChange}
      className="w-full md:w-48 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
    />
  </div>
));

const MobileTableRow = React.memo(({ row, headers, onClick }) => (
  <div onClick={onClick} className="bg-white p-4 rounded-lg shadow mb-3 border border-gray-200 hover:bg-gray-50">
    {headers.map(({ key, label }) => (
      <div key={key} className="flex justify-between py-1">
        <span className="font-medium text-gray-600">{label}:</span>
        <span>{row[key]}</span>
      </div>
    ))}
  </div>
));

const TITLE_MAPPING = {
  transaction_id: "Mã giao dịch",
  purchase_page: "Số trang",
  purchase_date: "Ngày mua",
  purchase_time: "Thời gian",
  MSSV: "Mã số sinh viên",
  paying_method: "Phương thức thanh toán",
  order_code: "Mã đơn hàng",
  total_cash: "Tổng tiền (VNĐ)",
};

const PaymentHistoryDetail = React.memo(({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const filteredData = Object.entries(data)
    .filter(([key, value]) => value && !['username', 'studentId'].includes(key))
    .map(([key, value]) => [key === 'student_id' ? 'MSSV' : key, value]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
          <h2 className="text-xl md:text-2xl font-bold mb-6">Chi tiết giao dịch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredData.map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 py-2">
                <p className="font-medium text-gray-700">{TITLE_MAPPING[key] || key}:</p>
                <p className="mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const rowsPerPage = isMobile ? 5 : 7;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const debouncedStudentId = useMemo(() => filters.studentId.trim(), [filters.studentId]);

  const fetchData = useCallback(async () => {
    try {
      if (role === "ADMIN") {
        if (debouncedStudentId) {
          await dispatch(fetchLogBuyPageStudent({ studentId: debouncedStudentId, ...filters })).unwrap();
        } else {
          await dispatch(fetchLogBuyPageAllStudent(filters)).unwrap();
        }
      } else if (role === "USER" && userId) {
        await dispatch(fetchLogBuyPageStudent({ studentId: userId, ...filters })).unwrap();
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [debouncedStudentId, filters, role, userId, dispatch]);

  useEffect(() => {
    const debounceTimeout = setTimeout(fetchData, 500);
    return () => clearTimeout(debounceTimeout);
  }, [fetchData]);

  const data = useMemo(() => {
    if (role === "ADMIN") {
      return debouncedStudentId
        ? Array.isArray(studentPayLogs) ? studentPayLogs : []
        : Array.isArray(allStudentPayLogs) ? allStudentPayLogs : [];
    }
    return Array.isArray(studentPayLogs) ? studentPayLogs : [];
  }, [allStudentPayLogs, studentPayLogs, role, debouncedStudentId]);

  const tableHeaders = useMemo(() => {
    const headers = [
      { key: "order_code", label: "Mã đơn hàng" },
      { key: "purchase_page", label: "Số trang" },
      { key: "purchase_date", label: "Ngày mua" },
      { key: "purchase_time", label: "Thời gian" },
    ];
    if (role === "ADMIN") headers.unshift({ key: "student_id", label: "MSSV" });
    return headers;
  }, [role]);

  const currentRows = useMemo(() => {
    const enrichedRows = data.map(row => ({
      MSSV: row.student_id || row.studentId,
      ...row,
    }));
    return enrichedRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleFilterChange = useCallback((field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  }, []);

  const handleRowClick = useCallback((row) => {
    setSelectedRow(row);
    setShowDetail(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-8">
        LỊCH SỬ MUA GIẤY IN CỦA {role === "ADMIN" ? "HỆ THỐNG" : "SINH VIÊN"}
      </h1>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {role === "ADMIN" && (
            <FilterInput
              label="MSSV"
              value={filters.studentId}
              onChange={e => handleFilterChange("studentId", e.target.value)}
            />
          )}
          <FilterInput
            label="TỪ NGÀY"
            value={filters.dateStart}
            onChange={e => handleFilterChange("dateStart", e.target.value)}
            type="date"
          />
          <FilterInput
            label="ĐẾN NGÀY"
            value={filters.dateEnd}
            onChange={e => handleFilterChange("dateEnd", e.target.value)}
            type="date"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Đang tải...</div>
      ) : data.length > 0 ? (
        <div className="rounded-lg overflow-hidden">
          {isMobile ? (
            <div className="space-y-4">
              {currentRows.map((row, index) => (
                <MobileTableRow
                  key={index}
                  row={row}
                  headers={tableHeaders}
                  onClick={() => handleRowClick(row)}
                />
              ))}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-themecolor1">
                <tr>
                  {tableHeaders.map(header => (
                    <th key={header.key} className="px-6 py-3 text-center text-sm font-medium uppercase">
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRows.map((row, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(row)}
                    className={`${index % 2 === 0 ? 'bg-white hover:bg-gray-200' : 'bg-purple-100 hover:bg-purple-200'} cursor-pointer transition-colors duration-150'}`}
                  >
                    {tableHeaders.map(header => (
                      <td key={header.key} className="px-6 py-4 whitespace-nowrap text-center text-sm">
                        {row[header.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="flex justify-center items-center space-x-4 p-4 border-t">
            <button
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded border bg-white disabled:bg-gray-100 disabled:text-gray-400"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <span className="text-sm">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded border bg-white disabled:bg-gray-100 disabled:text-gray-400"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-600 bg-white rounded-lg shadow">
          Không có dữ liệu
        </div>
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