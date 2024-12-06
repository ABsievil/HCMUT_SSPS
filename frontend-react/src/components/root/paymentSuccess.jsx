import React from 'react';
import { CircleCheckBig } from 'lucide-react';

const PaymentSuccess = () => {
  const handleViewOrder = () => {
    // Redirect to order details page
    window.location.href = '/don-hang';
  };

  const handleBackToHome = () => {
    // Navigate back to home page
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <CircleCheckBig 
            size={80} 
            className="text-green-500"
          />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Thanh Toán Thành Công
        </h1>
        
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn! Đơn hàng của bạn đã được xác nhận và đang được xử lý.
        </p>
        
        <div className="flex flex-col space-y-4">
          <button 
            onClick={handleViewOrder}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            Xem Chi Tiết Đơn Hàng
          </button>
          
          <button 
            onClick={handleBackToHome}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Quay Về Trang Chủ
          </button>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          Mã đơn hàng: <span className="font-bold">#{Math.floor(Math.random() * 1000000)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;