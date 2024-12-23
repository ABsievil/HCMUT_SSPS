import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPrinterList } from '../../../store/PrintersabcSlice';
import { selectStudentLog } from '../../../store/printLogSlice';
import { useUser } from '../../../store/userContext';
import { fetchLogAllStudents, fetchLogStudent } from '../../../store/printLogSlice';

// Improved FilterInput with better mobile styling
const FilterInput = ({ label, value, onChange, type = "text" }) => (
  <div className="flex flex-col w-full md:w-auto mb-4 md:mb-0">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value || ''}
      onChange={onChange}
      className="block w-full md:w-48 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

// Enhanced PrinterSelect with improved mobile layout
const PrinterSelect = ({ value, onChange, printers }) => (
  <div className="w-full md:w-auto mb-4 md:mb-0">
    <label className="block text-sm font-medium text-gray-700 mb-1">CHỌN MÁY IN</label>
    <select
      value={value}
      onChange={onChange}
      className="block w-full md:w-48 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <option value="reset">Tất cả máy in</option>
      {printers.length > 0 ? (
        printers.map((printer) => (
          <option key={printer.printer_id} value={printer.printer_id}>
            {`ID:${printer.printer_id} - ${printer.brand_name} ${printer.printer_model} - ${printer.building} ${printer.room}`}
          </option>
        ))
      ) : (
        <option value="" disabled>Không có máy in nào</option>
      )}
    </select>
  </div>
);

// Mobile-optimized table row component
const MobileTableRow = ({ row, headers, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200 cursor-pointer hover:bg-gray-50"
  >
    {headers.map(({ key, label }) => (
      <div key={key} className="flex justify-between py-1">
        <span className="font-medium text-gray-600">{label}:</span>
        <span className="text-gray-900">{row[key]}</span>
      </div>
    ))}
  </div>
);

// Enhanced PrintHistoryDetail with better mobile layout
const PrintHistoryDetail = React.memo(({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const DetailSection = ({ title, items }) => (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map(([label, value]) => (
          <div key={label} className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 py-2">
            <span className="font-medium text-gray-600">{label}</span>
            <span className="text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const sections = {
    basic: {
      title: "Thông tin cơ bản",
      items: [
        ['MSSV', data.student_id],
        ['ID máy in', data.printer_id],
        ['Tên tệp', data.file_name]
      ]
    },
    details: {
      title: "Chi tiết in",
      items: [
        ['Số trang', data.number_pages_of_file],
        ['Số bản in', data.number_copy],
        ['Khổ giấy', data.page_size],
        ['Trang/mặt', data.number_side]
      ]
    },
    time: {
      title: "Thời gian",
      items: [
        ['Ngày in', data.printing_date],
        ['Bắt đầu', data.time_start],
        ['Kết thúc', data.time_end]
      ]
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-white rounded-lg w-full max-w-2xl overflow-hidden">
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          <h2 className="text-xl md:text-2xl font-bold mb-6">Chi tiết lịch sử in</h2>

          <div className="overflow-y-auto max-h-[70vh] px-2">
            {Object.values(sections).map((section) => (
              <DetailSection key={section.title} {...section} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const PrintLogTable = () => {
  const { role, userId } = useUser();
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [filters, setFilters] = useState({
    studentId: '',
    printerId: 'reset',
    dateStart: null,
    dateEnd: null
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedStudentId, setDebouncedStudentId] = useState(filters.studentId);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const rowsPerPage = isMobile ? 5 : 7;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setShowDetail(true);
  };

  const dispatch = useDispatch();
  const { studentLogs, allLogs, loading } = useSelector(selectStudentLog);
  const { printerList } = useSelector(selectPrinterList);

  const logs = useMemo(() => {
    if (role === 'USER') {
      return studentLogs;
    }
    return filters.studentId?.trim() ? studentLogs : allLogs;
  }, [role, studentLogs, allLogs, filters.studentId]);

  const tableHeaders = useMemo(() => {
    const headers = [
      { key: 'printer_id', label: 'ID máy in' },
      { key: 'file_name', label: 'Tên tệp' },
      { key: 'time_start', label: 'Giờ bắt đầu' },
      { key: 'time_end', label: 'Giờ kết thúc' },
      { key: 'printing_date', label: 'Ngày đăng ký' }
    ];

    if (role === 'ADMIN') {
      headers.unshift({ key: 'student_id', label: 'MSSV' });
    }

    return headers;
  }, [role]);

  const handleFilterChange = useCallback((field) => (e) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedStudentId(filters.studentId);
    }, 1000);
    return () => clearTimeout(timer);
  }, [filters.studentId]);

  useEffect(() => {
    const logStudentDTO = {
      printerId: filters.printerId === 'reset' ? '' : filters.printerId,
      dateStart: filters.dateStart,
      dateEnd: filters.dateEnd
    };

    if (role === 'USER' && userId) {
      dispatch(fetchLogStudent({ studentId: userId, logStudentDTO }));
    } else if (role === 'ADMIN') {
      if (debouncedStudentId?.trim()) {
        dispatch(fetchLogStudent({ studentId: debouncedStudentId, logStudentDTO }));
      } else {
        dispatch(fetchLogAllStudents(logStudentDTO));
      }
    }
  }, [role, userId, debouncedStudentId, filters.printerId, filters.dateStart, filters.dateEnd, dispatch]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = logs?.slice(indexOfFirstRow, indexOfLastRow) || [];
  const totalPages = Math.ceil((logs?.length || 0) / rowsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-8">
        LỊCH SỬ IN CỦA {role === 'USER' ? 'SINH VIÊN' : role === 'ADMIN' ? 'HỆ THỐNG' : 'BẠN'}
      </h1>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {role === "ADMIN" && (
            <FilterInput
              label="MSSV"
              value={filters.studentId}
              onChange={handleFilterChange('studentId')}
            />
          )}

          <PrinterSelect
            value={filters.printerId}
            onChange={handleFilterChange('printerId')}
            printers={printerList?.data || []}
          />

          <FilterInput
            label="TỪ"
            value={filters.dateStart}
            onChange={handleFilterChange('dateStart')}
            type="date"
          />

          <FilterInput
            label="ĐẾN"
            value={filters.dateEnd}
            onChange={handleFilterChange('dateEnd')}
            type="date"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Đang tải...</div>
      ) : logs.length > 0 ? (
        <>
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
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead>
                  <tr className="bg-themecolor1">
                    {tableHeaders.map(({ key, label }) => (
                      <th key={key} className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider">
                        {label}
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
                      {tableHeaders.map(({ key }) => (
                        <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                          {row[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md bg-white disabled:bg-gray-100 disabled:text-gray-400"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <span className="text-sm">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md bg-white disabled:bg-gray-100 disabled:text-gray-400"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-600 bg-white rounded-lg shadow">
          Không có dữ liệu lịch sử in
        </div>
      )}

      <PrintHistoryDetail
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        data={selectedRow || {}}
      />
    </div>
  );
};

export default PrintLogTable;