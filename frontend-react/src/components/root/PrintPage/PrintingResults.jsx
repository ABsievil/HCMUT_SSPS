import React from "react";

function PrintingResults() {
  const printJobs = [
    { id: "12345",  fileName: "congthuc.doc", status: "Đã in xong", date: "26/09/2024 2:22" },
    { id: "12346",  fileName: "baitap.pdf", status: "Đang chờ in", date: "26/09/2024 3:15" },
    { id: "12347",  fileName: "doan.docx", status: "Đang chờ in", date: "26/09/2024 4:30" },
  ];

  return (
    <section className="mt-16 max-md:mt-10 mb-12 mr-9">
      <h2 className="self-start  ml-7 text-xl font-semibold text-black max-md:ml-2.5">
        KẾT QUẢ XỬ LÝ
      </h2>
      <div className="flex flex-col mt-8 w-full bg-white rounded-lg shadow-lg max-md:mt-6 max-md:w-full">
        <div className="flex items-center gap-5 px-5 py-3 text-sm font-medium border-b bg-neutral-100 text-neutral-900">
          <div className="w-2/12 text-center">ID Máy in</div>
          <div className="w-3/12 text-center">Tên tệp</div>
          <div className="w-2/12 text-center">Tình trạng</div>
          <div className="w-2/12 text-center">Ngày đăng ký</div>
          <div className="w-2/12 text-center">Hành động</div>
        </div>
        {printJobs.map((job, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-5 px-5 py-3 border-b ${job.status === "Đã in xong" ? "bg-violet-100 text-violet-900" : "bg-white"}`}
          >
            <div className="w-2/12 text-center">{job.id}</div>
            <div className="w-3/12 truncate text-center">{job.fileName}</div>
            <div className="w-2/12 text-center">{job.status}</div>
            <div className="w-2/12 text-center">{job.date}</div>
            <div className="w-2/12 flex justify-center gap-2">
              {job.status === "Đang chờ in" && (
                <>
                  <button className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
                    In ngay
                  </button>
                  <button className="px-3 py-1 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg">
                    Hủy
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PrintingResults;
