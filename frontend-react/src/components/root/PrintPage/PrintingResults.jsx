import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { removePrintJob, requestPrintJob, selectPrintJobs } from "../../../store/printJobSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectPersonalInfor, updatePagesRemain } from "../../../store/personalInforSlice";

function PrintingResults({ setPrintingData }) {
  const dispatch = useDispatch();
  const printJobs = useSelector(selectPrintJobs);
  const { personalInfor } = useSelector(selectPersonalInfor);
  const [pagesRemain, setPagesReman] = useState(0);
  const [showNotEnoughPaperModal, setShowNotEnoughPaperModal] = useState(false);

  useEffect(() => {
    setPagesReman(personalInfor?.data?.page_remain);
  }, [personalInfor]);

  const handleDelete = (id) => {
    dispatch(removePrintJob(id));
    setCheckedJobs((prev) => {
      const newChecked = { ...prev };
      delete newChecked[id];
      return newChecked;
    });
  };

  const handleSendPrintRequest = (id, actualPages) => {
    if (actualPages > pagesRemain) {
      setShowNotEnoughPaperModal(true);
    } else {
      dispatch(requestPrintJob(id));
      dispatch(updatePagesRemain(-actualPages));
    }
  };

  return (
    <>
      <section className="mt-4 md:mt-6 mb-8 md:mb-12 mx-4 md:mr-9">
        <h2 className="text-lg md:text-xl font-semibold text-black">
          KẾT QUẢ XỬ LÝ
        </h2>
        
        {/* Desktop Table View */}
        <div className="hidden md:block mt-6 w-full bg-white rounded-lg shadow-lg">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-themecolor1 text-neutral-900">
              <tr>
                <th scope="col" className="px-3 py-3 text-center font-medium">ID Máy in</th>
                <th scope="col" className="px-3 py-3 text-center font-medium">Tên tệp</th>
                <th scope="col" className="px-3 py-3 text-center font-medium">Số trang</th>
                <th scope="col" className="px-3 py-3 text-center font-medium">Khổ giấy</th>
                <th scope="col" className="px-3 py-3 text-center font-medium">Số bản</th>
                <th scope="col" className="px-3 py-3 text-center font-medium">Tổng trang</th>
                <th scope="col" className="px-3 py-3 text-center font-medium">Chọn</th>
                <th scope="col" className="px-3 py-3 text-center font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {printJobs.map((job, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-purple-100'}`}>
                  <td className="px-3 py-3 text-center">{job.printerId}</td>
                  <td className="px-3 py-3 truncate text-center max-w-[200px]">{job.fileName}</td>
                  <td className="px-3 py-3 text-center">{job.numberPageOfFile}</td>
                  <td className="px-3 py-3 text-center">{job.pageSize}</td>
                  <td className="px-3 py-3 text-center">{job.numberCopy}</td>
                  <td className="px-3 py-3 text-center">{job.actualPages}</td>
                  <td className="px-3 py-3 text-center">
                    <button
                      className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                      onClick={() => handleSendPrintRequest(job.id, job.actualPages)}
                    >
                      In ngay
                    </button>
                  </td>
                  <td className="px-3 py-3 text-center">
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
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden mt-4 space-y-4">
          {printJobs.map((job, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium truncate max-w-[200px]">{job.fileName}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(job.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">ID Máy in:</p>
                  <p>{job.printerId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Số trang:</p>
                  <p>{job.numberPageOfFile}</p>
                </div>
                <div>
                  <p className="text-gray-600">Khổ giấy:</p>
                  <p>{job.pageSize}</p>
                </div>
                <div>
                  <p className="text-gray-600">Số bản:</p>
                  <p>{job.numberCopy}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600">Tổng trang quy đổi:</p>
                  <p>{job.actualPages}</p>
                </div>
              </div>
              <button
                className="w-full mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                onClick={() => handleSendPrintRequest(job.id, job.actualPages)}
              >
                In ngay
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for not enough paper */}
      {showNotEnoughPaperModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Không đủ giấy in</h3>
            <p className="text-gray-600 mb-4">
              Bạn không đủ giấy in để thực hiện yêu cầu này. Vui lòng mua thêm giấy in để tiếp tục.
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:justify-end">
              <button
                className="w-full md:w-auto px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => setShowNotEnoughPaperModal(false)}
              >
                Đóng
              </button>
              <Link
                to="/buypaper"
                className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded text-center"
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