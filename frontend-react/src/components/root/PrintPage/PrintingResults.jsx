import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

function PrintingResults({ setPrintingData }) {
  const [checkedJobs, setCheckedJobs] = useState({});

  const printJobs = [
    { id: "12345", fileName: "congthuc.doc", totalPage: "100", date: "26/09/2024 2:22" },
    { id: "12346", fileName: "baitap.pdf", totalPage: "100", date: "26/09/2024 3:15" },
    { id: "12347", fileName: "doan.docx", totalPage: "100", date: "26/09/2024 4:30" },
  ];

  const totalPages = printJobs.reduce((sum, job) => {
    return sum + (checkedJobs[job.id] ? parseInt(job.totalPage, 10) : 0);
  }, 0);
  const handleUpdate = () => {
    // Gọi setPrintingData để cập nhật state ở PrintingSystem
    setPrintingData(totalPages);
  };
  const handleCheckboxChange = (id) => {
    setCheckedJobs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="mt-16 max-md:mt-10 mb-12 mr-9">
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
              <th scope="col" className="px-5 py-3 w-2/12 text-center font-medium">Ngày đăng ký</th>
              <th scope="col" className="px-5 py-3 w-1/12 text-center font-medium">Chọn</th>
              <th scope="col" className="px-5 py-3 w-1/12 text-center font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {printJobs.map((job, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-purple-100'}`}
              >
                <td className="px-5 py-3 text-center">{job.id}</td>
                <td className="px-5 py-3 truncate text-center">{job.fileName}</td>
                <td className="px-5 py-3 text-center">{job.totalPage}</td>
                <td className="px-5 py-3 text-center">{job.date}</td>
                <td className="px-5 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={!!checkedJobs[job.id]}
                    onChange={() => handleCheckboxChange(job.id)}
                  />
                </td>
                <td className="px-5 py-3 text-center">
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* Row for total pages and print button */}
          <tfoot className="bg-themecolor1 text-gray-900 font-semibold rounded-b-lg">
            <tr>
              <td className="px-5 py-3 text-center">Tổng số trang đã chọn:</td>
              <td className="px-5 py-3 truncate text-center"></td>
              <td className="px-5 py-3 text-center">{totalPages}</td>
              <td className="px-5 py-3 text-center"></td>
              <td className="px-5 py-3 text-center">
                <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                  onClick={handleUpdate}>
                  In ngay
                </button>
              </td>
              <td className="px-5 py-3 text-center"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

export default PrintingResults;
