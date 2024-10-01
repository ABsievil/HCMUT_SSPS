import React from "react";


function PrintingResults() {
  const printJobs = [
    { id: "12345", mssv: "2211185", fileName: "congthuc.doc", status: "Đã in xong", date: "26/09/2024 2:22" },
    { id: "12346", mssv: "2211186", fileName: "baitap.pdf", status: "Đang chờ in", date: "26/09/2024 3:15" },
    { id: "12347", mssv: "2211187", fileName: "doan.docx", status: "Đang chờ in", date: "26/09/2024 4:30" },
  ];

  return (
    <section className="mt-16 max-md:mt-10 mb-12">
      <h2 className="self-start mt-8 ml-7 text-xl font-semibold text-black max-md:ml-2.5">
        KẾT QUẢ XỬ LÝ
      </h2>
      <div className="flex flex-col mt-8 w-full bg-white rounded-lg shadow-lg max-md:mt-6 max-md:w-full">
        <div className="flex gap-5 px-5 py-3 text-sm font-medium border-b bg-neutral-100 text-neutral-900">
          <div className="w-4 h-4"></div>
          <div className="w-1/6">ID Máy in</div>
          <div className="w-1/6">MSSV</div>
          <div className="w-1/4">Tên tệp</div>
          <div className="w-1/4">Tình trạng</div>
          <div className="w-1/4">Ngày đăng ký</div>
          <div className="w-[100px]"></div> {/* Cột dành cho nút Hủy */}
        </div>
        {printJobs.map((job, index) => (
          <div key={index} className={`flex items-center gap-5 px-5 py-3 border-b ${job.status === "Đã in xong" ? "bg-violet-100 text-violet-900" : "bg-white"}`}>
            <div className={`w-4 h-4 rounded-full ${job.status === "Đã in xong" ? "border border-violet-700" : ""}`}></div>
            <div className="w-1/6">{job.id}</div>
            <div className="w-1/6">{job.mssv}</div>
            <div className="w-1/4 truncate">{job.fileName}</div>
            <div className="w-1/4">{job.status}</div>
            <div className="w-1/4">{job.date}</div>
            <div className="w-[100px] flex justify-end"> {/* Thêm chiều rộng cố định cho nút */}
              {job.status !== "Đã in xong" && (
                <button className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg">
                  Hủy
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PrintingResults;
