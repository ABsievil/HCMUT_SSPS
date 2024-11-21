import React from 'react';
import { X } from 'lucide-react';


// not currenty used yet, gonna use it after the data rendering is done
export const PrintLogDetail = ({ isOpen, onClose, data: singleLog }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 mx-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6">Chi tiết lịch sử in</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-800">Thông tin cơ bản</h3>
                            <div className="mt-2 space-y-2">
                                {singleLog.mssv && (
                                    <p><span className="font-medium">MSSV:</span> {singleLog.student_id}</p>
                                )}
                                <p><span className="font-medium">ID máy in:</span> {singleLog.printer_id}</p>
                                <p><span className="font-medium">Tên tệp:</span> {singleLog.file_name}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800">Thời gian</h3>
                            <div className="mt-2 space-y-2">
                                <p><span className="font-medium">Ngày in:</span> {singleLog.printing_date}</p>
                                <p><span className="font-medium">Bắt đầu:</span> {singleLog.time_start}</p>
                                <p><span className="font-medium">Kết thúc:</span> {singleLog.time_end}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-800">Thông số in</h3>
                            <div className="mt-2 space-y-2">
                                <p><span className="font-medium">Số trang 1 bản:</span> {singleLog.number_pages_of_file || '10'}</p>
                                <p><span className="font-medium">Số bản in:</span> {singleLog.number_copy || '10'}</p>
                                <p><span className="font-medium">Khổ giấy:</span> {singleLog.page_size || 'A4'}</p>
                                <p><span className="font-medium">Trang/mặt:</span> {singleLog.pages_per_side || '1'}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800">Trạng thái</h3>
                            <div className="mt-2 space-y-2">
                                <p>
                                    <span className="font-medium">Tình trạng:</span>
                                    <span className="ml-2 px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                                        {singleLog.status || 'Hoàn thành'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};