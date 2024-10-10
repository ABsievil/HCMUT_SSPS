import React from "react";
import { FaTrashAlt } from "react-icons/fa";

function PrintingResults() {
  const printJobs = [
    { id: "12345", fileName: "congthuc.doc", totalPage: "100", date: "26/09/2024 2:22" },
    { id: "12346", fileName: "baitap.pdf", totalPage: "100", date: "26/09/2024 3:15" },
    { id: "12347", fileName: "doan.docx", totalPage: "100", date: "26/09/2024 4:30" },
  ];
  const totalPages = printJobs.reduce((sum, job) => sum + parseInt(job.totalPage, 10), 0);

  return (
    <section className="mt-16 max-md:mt-10 mb-12 mr-9">
      <h2 className="self-start ml-7 text-xl font-semibold text-black max-md:ml-2.5">
        KẾT QUẢ XỬ LÝ
      </h2>
      <div className="flex flex-col mt-8 w-full bg-white rounded-lg shadow-lg max-md:mt-6 max-md:w-full">
        <div className="flex items-center gap-5 px-5 py-3 text-sm font-medium border-b bg-neutral-100 text-neutral-900">
          <div className="w-2/12 text-center">ID Máy in</div>
          <div className="w-3/12 text-center">Tên tệp</div>
          <div className="w-2/12 text-center">Số trang</div>
          <div className="w-2/12 text-center">Ngày đăng ký</div>
          <div className="w-1/12 text-center">Chọn</div>
          <div className="w-1/12 text-center"></div>
        </div>
        
        {printJobs.map((job, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-5 px-5 py-3 border-b ${job.status === "Đã in xong" ? "bg-violet-100 text-violet-900" : "bg-white"}`}
          >
            <div className="w-2/12 text-center">{job.id}</div>
            <div className="w-3/12 truncate text-center">{job.fileName}</div>
            <div className="w-2/12 text-center">{job.totalPage}</div>
            <div className="w-2/12 text-center">{job.date}</div>
            <div className="w-1/12 flex justify-center">
              <input type="checkbox" />
            </div>
            <div className="w-1/12 flex justify-center">
              <button className="text-red-500 hover:text-red-700">
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}

        {/* Row for total pages and print button */}
        <div className="flex items-center gap-5 px-5 py-3 bg-gray-100 text-gray-900 font-semibold rounded-b-lg">
          <div className="pl-6">Tổng số trang cần in:</div>
          <div className="w-6/12 ml-auto text-center pr-14">{totalPages}</div>
          <div className="flex justify-center mr-32 ">
            <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
              In ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrintingResults;
