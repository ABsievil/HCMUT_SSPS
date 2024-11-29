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

  useEffect(()=>{
    setPagesReman(personalInfor?.data?.page_remain);
  }, [personalInfor])
  
  const handleDelete = (id) => {
    dispatch(removePrintJob(id));
    setCheckedJobs((prev) => {
      const newChecked = { ...prev };
      delete newChecked[id];
      return newChecked;
    });
  }
  // const 
  const handleSendPrintRequest = (id, actualPages) => {
    if (actualPages > pagesRemain)
      setShowNotEnoughPaperModal(true);
    else
    {
      dispatch(requestPrintJob(id));
      dispatch(updatePagesRemain(-actualPages));
    }
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
                <th scope="col" className="px-5 py-3 w-1/12 text-center font-medium">ID Máy in</th>
                <th scope="col" className="px-5 py-3 w-2/12 text-center font-medium">Tên tệp</th>
                <th scope="col" className="px-5 py-3 w-1.5/12 text-center font-medium">Số trang</th>
                <th scope="col" className="px-5 py-3 w-1.5/12 text-center font-medium">Khổ giấy</th>
                <th scope="col" className="px-5 py-3 w-1/12 text-center font-medium">Số bản</th>
                <th scope="col" className="px-5 py-3 w-2/12 text-center font-medium">Tổng trang quy đổi</th>
                <th scope="col" className="px-5 py-3 w-1/12 text-center font-medium">Chọn</th>
                <th scope="col" className="px-5 py-3 w-1/12 text-center font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {printJobs.map((job, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-purple-100'}`}>
                  <td className="px-5 py-3 text-center">{job.printerId}</td>
                  <td className="px-5 py-3 truncate text-center">{job.fileName}</td>
                  <td className="px-5 py-3 text-center">{job.numberPageOfFile}</td>
                  <td className="px-5 py-3 text-center">{job.pageSize}</td>
                  <td className="px-5 py-3 text-center">{job.numberCopy}</td>
                  <td className="px-5 py-3 text-center">{job.actualPages}</td>
                  <td className="px-5 py-3 text-center">
                    <button
                      className="px-2 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg w-20"
                      onClick={() => handleSendPrintRequest(job.id, job.actualPages)}
                    >
                      In ngay
                    </button>
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