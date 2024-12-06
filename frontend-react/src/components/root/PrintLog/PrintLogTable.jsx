import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPrinterList } from '../../../store/PrintersabcSlice';
import { selectStudentLog } from '../../../store/printLogSlice';
import { useUser } from '../../../store/userContext';
import { fetchLogAllStudents, fetchLogStudent } from '../../../store/printLogSlice';


const FilterInput = ({ label, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value || ''} // Ensure value is never null
      onChange={onChange}
      className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    />
  </div>
);

const PrinterSelect = ({ value, onChange, printers }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">CHỌN MÁY IN</label>
    <select
      value={value}
      onChange={onChange}
      className="mt-1 block w- pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <option value="reset">Tất cả máy in</option>
      {printers.length > 0 ? (
        printers.map((printer) => (
          <option key={printer.printer_id} value={printer.printer_id}>
            {`${printer.brand_name} ${printer.printer_model} - ${printer.building} ${printer.room} - ${printer.state ? "sẵn sàng" : "ngừng hoạt động"}`}
          </option>
        ))
      ) : (
        <option value="" disabled>Không có máy in nào</option>
      )}
    </select>
  </div>
);

const PrintHistoryDetail = React.memo(({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const DetailSection = ({ title, items }) => (
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <div className="mt-2 space-y-2">
        {items.map(([label, value]) => (
          <p key={label}>
            <span className="font-medium">{label}:</span> {value}
          </p>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 mx-4 overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Chi tiết lịch sử in</h2>
        
        {/* Adding a scrollable content area */}
        <div className="grid grid-cols-2 gap-4 overflow-auto max-h-[70vh]">
          {Object.values(sections).map((section) => (
            <DetailSection key={section.title} {...section} />
          ))}
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
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const rowsPerPage = 7; // Number of rows per page
  const [debouncedStudentId, setDebouncedStudentId] = useState(filters.studentId);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setShowDetail(true); // This will trigger the modal to open
  };

  const dispatch = useDispatch();
  const { studentLogs, allLogs, loading, error } = useSelector(selectStudentLog);
  const { isLoading: printersLoading, printerList, error: printersError } = useSelector(selectPrinterList);

  const logs = useMemo(() => {
    if (role === 'USER') {
      return studentLogs;
    }
    return filters.studentId?.trim() ? studentLogs : allLogs;
  }, [role, studentLogs, allLogs, filters.studentId]);

  useEffect(() => {
    const logStudentDTO = {
      printerId: filters.printerId === 'reset' ? '' : filters.printerId,
      dateStart: filters.dateStart,
      dateEnd: filters.dateEnd
    };

    if (role === 'USER' && userId) {
      dispatch(fetchLogStudent({
        studentId: userId,
        logStudentDTO
      }));
      return;
    }

    if (role === 'ADMIN') {
      if (filters.studentId?.trim()) {
        dispatch(fetchLogStudent({
          studentId: filters.studentId,
          logStudentDTO
        }));
      } else {
        dispatch(fetchLogAllStudents(logStudentDTO));
      }
    }
  }, [
    role,
    userId,
    filters.printerId,
    filters.dateStart,
    filters.dateEnd,
    filters.studentId,
    dispatch
  ]);

  const tableHeaders = useMemo(() => {
    const headers = [
      { key: 'printer_id', label: 'ID máy in' },
      { key: 'file_name', label: 'Tên tệp' },
      { key: 'time_start', label: 'Giờ bắt đầu' },
      { key: 'time_end', label: 'Giờ kết thúc' },
      { key: 'printing_date', label: 'Ngày đăng ký' }
    ];

    // Add MSSV column only if in ADMIN role and studentId filter is applied
    if (role === 'ADMIN' ) {
      headers.unshift({ key: 'student_id', label: 'MSSV' });
    }

    return headers;
  }, [role, filters.studentId]);

  const handleFilterChange = useCallback((field) => (e) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);
  

  // Debounce logic for studentId filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedStudentId(filters.studentId);
    }, 1000); // Debounce for 500ms
    return () => clearTimeout(timer); // Cleanup on change
  }, [filters.studentId]);

  useEffect(() => {
    // Reset pagination whenever filters change
    setCurrentPage(1);
  
    const logStudentDTO = {
      printerId: filters.printerId === 'reset' ? '' : filters.printerId,
      dateStart: filters.dateStart,
      dateEnd: filters.dateEnd
    };
  
    if (role === 'USER' && userId) {
      dispatch(fetchLogStudent({
        studentId: userId,
        logStudentDTO
      }));
      return;
    }
  
    if (role === 'ADMIN') {
      if (debouncedStudentId?.trim()) {
        dispatch(fetchLogStudent({
          studentId: debouncedStudentId,
          logStudentDTO
        }));
      } else {
        dispatch(fetchLogAllStudents(logStudentDTO));
      }
    }
  }, [
    role,
    userId,
    debouncedStudentId,
    filters.printerId,
    filters.dateStart,
    filters.dateEnd,
    dispatch
  ]);

  // Pagination logic: calculate the rows to display based on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = logs.slice(indexOfFirstRow, indexOfLastRow);

  // Pagination controls
  const totalPages = Math.ceil(logs.length / rowsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

  return (
    <div className="overflow-x-auto drop-shadow-lg mx-10 min-h-screen ">
      <h1 className="text-center text-2xl font-bold my-8">
        LỊCH SỬ IN CỦA {role === 'USER' ? 'SINH VIÊN' : role === 'ADMIN' ? 'HỆ THỐNG' : 'BẠN'}
      </h1>

      <div className="p-4 ">
        <div className="flex justify-center items-center space-x-4">
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

      {logs.length > 0 ? (
        <>
          <table className="w-full md:w-[90%] bg-white mt-3 m-auto">
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
                  className={`${index % 2 === 0 ? 'bg-white hover:bg-gray-200' : 'bg-purple-100 hover:bg-purple-200'} cursor-pointer transition-colors duration-150`}
                  onClick={() => handleRowClick(row)}
                >
                  {tableHeaders.map(({ key }) => (
                    <td key={key} className="py-4 text-center">
                      {/* Check if the current column is 'student_id' */}
                      {key === 'student_id' ? row.student_id : row[key]} {/* Ensure student_id is accessed correctly */}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:bg-gray-300"
            >
              Trước
            </button>

            <span className="mx-4 self-center">
              Trang {currentPage} của {totalPages}
            </span>

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
        <div className="text-center py-8 text-gray-600">
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
