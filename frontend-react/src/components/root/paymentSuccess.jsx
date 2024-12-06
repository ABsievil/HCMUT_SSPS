import React, { useEffect, useState } from 'react';
import { CircleCheckBig } from 'lucide-react';


const updatePaymentLog = async (studentId, purchasePages) => {
  try {
    const PurchasePageDTO = {
      studentId: studentId,
      purchasePages: purchasePages,
      purchaseDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      purchaseTime: new Date().toTimeString().split(' ')[0], // Current time in HH:MM:SS format
      payingMethod: "VNPay"
    };
    // console.log(PurchasePageDTO)
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/purchasePage`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(PurchasePageDTO)
      }
    );

    if (!response.ok) {
      throw new Error(`Payment log update failed: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error updating payment log:', error);
    toast.error("Không thể ghi nhận giao dịch");
    return false;
  }
};

const PaymentSuccess = () => {

  const [params, setParams] = useState({});
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paramsObject = {
      vnp_Amount: queryParams.get('vnp_Amount'),
      vnp_BankCode: queryParams.get('vnp_BankCode'),
      vnp_BankTranNo: queryParams.get('vnp_BankTranNo'),
      vnp_CardType: queryParams.get('vnp_CardType'),
      vnp_OrderInfo: queryParams.get('vnp_OrderInfo'),
      vnp_PayDate: queryParams.get('vnp_PayDate'),
      vnp_ResponseCode: queryParams.get('vnp_ResponseCode'),
      vnp_TmnCode: queryParams.get('vnp_TmnCode'),
      vnp_TransactionNo: queryParams.get('vnp_TransactionNo'),
      vnp_TransactionStatus: queryParams.get('vnp_TransactionStatus'),
      vnp_TxnRef: queryParams.get('vnp_TxnRef'),
      vnp_SecureHash: queryParams.get('vnp_SecureHash')
    };
    setParams(paramsObject);
  }, []);

  const handleViewOrder = () => {
    // Redirect to order details page
    window.location.href = '/payment';
  };

  const handleBackToHome = () => {
    // Navigate back to home page
    window.location.href = '/buyPaper';
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
        
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          Thanh Toán Thành Công
        </h1>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {params.vnp_Amount / 100} VNĐ
        </h1>
        
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn! Đơn hàng của bạn đã được xác nhận và đang được xử lý.
        </p>
        
        <div className="flex flex-col space-y-4">
          <button 
            onClick={handleViewOrder}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Xem Lịch Sử Mua Hàng
          </button>
          
          <button 
            onClick={handleBackToHome}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Quay Về Trang Chủ
          </button>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          Mã đơn hàng: <span className="font-bold">{params.vnp_BankTranNo}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;


