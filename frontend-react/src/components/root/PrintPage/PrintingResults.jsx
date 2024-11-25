import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { removePrintJob, selectPrintJobs } from "../../../store/printJobSlice";
import { useDispatch, useSelector } from "react-redux";


function PrintingResults({ setPrintingData }) {
  const dispatch = useDispatch();
  const [checkedJobs, setCheckedJobs] = useState({});

  const printJobs = useSelector(selectPrintJobs);

  const [showNotEnoughPaperModal, setShowNotEnoughPaperModal] = useState(false);

  const MAX_AVAILABLE_PAGES = 250;

  const totalPages = printJobs.reduce((sum, job) => {
    return sum + (checkedJobs[job.id] ? parseInt(job.numberPageOfFile, 10) : 0);
  }, 0);

  const handleUpdate = () => {
    if (totalPages > MAX_AVAILABLE_PAGES) {
      setShowNotEnoughPaperModal(true);
    } else if (totalPages > 0) {
      // Cập nhật dữ liệu in
      setPrintingData(totalPages);
      
      // Xóa các hàng đã chọn
      // const remainingJobs = printJobs.filter(job => !checkedJobs[job.id]);
      // setPrintJobs(remainingJobs);
      
      // Reset checkedJobs state
      setCheckedJobs({});
      
      // Hiển thị thông báo thành công
      toast.success("Đơn in của bạn đã được xác nhận thành công");
    } else {
      toast.warn("Vui lòng chọn ít nhất một tệp để in");
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedJobs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = (id) => {
    dispatch(removePrintJob(id));
    setCheckedJobs((prev) => {
      const newChecked = { ...prev };
      delete newChecked[id];
      return newChecked;
    });
  }
  return (
    <>
      <section className="mt-6 max-md:mt-10 mb-12 mr-9">
        <h2 className="self-start ml-7 text-xl font-semibold text-black max-md:ml-2.5">
          KẾT QUẢ XỬ LÝ
        </h2>
        <div className="mt-8 w-full bg-white rounded-lg shadow-lg max-md:mt-6">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-themecolor1 text-neutral-900">
              <tr>
                <th scope="col" className="px-5 py-3 w-2/12 text-center font-medium">ID Máy in</th>
                <th scope="col" className="px-5 py-3 w-3/12 text-center font-medium">Tên tệp</th>
                <th scope="col" className="px-5 py-3 w-2/12 text-center font-medium">Số trang</th>
                <th scope="col" className="px-5 py-3 w-2/12 text-center font-medium">Khổ giấy</th>
                <th scope="col" className="px-5 py-3 w-1/12 text-center font-medium">Số bản</th>
                <th scope="col" className="px-5 py-3 w-1/12 text-center font-medium">Chọn</th>
                <th scope="col" className="px-5 py-3 w-1/12 text-center font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {printJobs.map((job, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-purple-100'}`}>
                  <td className="px-5 py-3 text-center">{job.printerId} {job.id}</td>
                  <td className="px-5 py-3 truncate text-center">{job.fileName}</td>
                  <td className="px-5 py-3 text-center">{job.numberPageOfFile}</td>
                  <td className="px-5 py-3 text-center">{job.pageSize}</td>
                  <td className="px-5 py-3 text-center">{job.numberCopy}</td>
                  <td className="px-5 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={!!checkedJobs[job.id]}
                      onChange={() => handleCheckboxChange(job.id)}
                    />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(job.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-themecolor1 text-gray-900 font-semibold rounded-b-lg">
              <tr>
                <td className="px-4 py-3 text-center">Tổng số trang đã chọn:</td>
                <td className="px-5 py-3 truncate text-center"></td>
                <td className="px-5 py-3 text-center">{totalPages}</td>
                <td className="px-5 py-3 truncate text-center"></td>
                <td className="px-5 py-3 text-center"></td>
                <td className="px-5 py-3 text-center">
                  <button
                    className="px-2 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg w-20"
                    onClick={handleUpdate}
                  >
                    In ngay
                  </button>
                </td>
                <td className="px-5 py-3 text-center"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Modal for not enough paper */}
      {showNotEnoughPaperModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Không đủ giấy in</h3>
            <p className="text-gray-600 mb-4">
              Bạn không đủ giấy in để thực hiện yêu cầu này. Vui lòng mua thêm giấy in để tiếp tục.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => setShowNotEnoughPaperModal(false)}
              >
                Đóng
              </button>
              <Link
                to="/buypaper"
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
                onClick={() => setShowNotEnoughPaperModal(false)}
              >
                Mua giấy in
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PrintingResults;