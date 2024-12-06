import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { CircleCheckBig } from 'lucide-react';
import { toast } from 'react-toastify';
import { updatePagesRemain } from "../../store/personalInforSlice";
import { fetchPersonalInfor } from "../../store/personalInforSlice";
import { useUser } from "../../store/userContext";

const PaymentSuccess = () => {
  const { username, userId, isUserLoading } = useUser();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [paymentDetails, setPaymentDetails] = useState({
    params: {},
    purchasePages: 0,
    isPaymentLogUpdated: false, // Đảm bảo chỉ cập nhật một lần
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!isUserLoading && username && !paymentDetails.isPaymentLogUpdated) {
        setIsLoading(true);
        try {
          await dispatch(fetchPersonalInfor(username));
          await processPayment(); // Chỉ gọi khi chưa cập nhật
        } catch (err) {
          console.error("Error during payment process:", err);
          setError("Có lỗi xảy ra khi xử lý thanh toán.");
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isUserLoading, username, paymentDetails.isPaymentLogUpdated, dispatch]);

  const processPayment = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const vnp_Amount = queryParams.get('vnp_Amount');
    const vnp_BankTranNo = queryParams.get('vnp_BankTranNo');

    // Kiểm tra thông tin thanh toán
    if (!vnp_Amount || !vnp_BankTranNo) {
      setError("Thông tin thanh toán không hợp lệ.");
      setIsLoading(false);
      return;
    }

    // Chuẩn bị dữ liệu
    const paramsObject = {
      vnp_Amount,
      vnp_BankCode: queryParams.get('vnp_BankCode'),
      vnp_BankTranNo,
      vnp_OrderInfo: queryParams.get('vnp_OrderInfo'),
    };

    const quantity = Math.floor(vnp_Amount / 150000);

    // Gọi API để cập nhật log nếu chưa cập nhật
    if (!paymentDetails.isPaymentLogUpdated) {
      const updateResult = await updatePaymentLog(paramsObject, quantity);
      console.log("meo")
      if (updateResult) {
        setPaymentDetails({
          params: paramsObject,
          purchasePages: quantity,
          isPaymentLogUpdated: true, // Đánh dấu đã cập nhật
        });
        dispatch(updatePagesRemain(quantity));
        toast.success(`Đã nạp thành công ${quantity} trang in`);
      } else {
        setError("Không thể cập nhật lịch sử giao dịch.");
      }
    }

    setIsLoading(false);
  };

  const updatePaymentLog = async (paymentParams, quantity) => {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      toast.error('Không tìm thấy thông tin sinh viên');
      return false;
    }

    const PurchasePageDTO = {
      studentId,
      purchasePages: quantity,
      purchaseDate: new Date().toISOString().split('T')[0],
      purchaseTime: new Date().toTimeString().split(' ')[0],
      payingMethod: "VNPay",
      orderCode: paymentParams.vnp_BankTranNo,
    };

    try {
      console.log("meo")
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/purchasePage`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(PurchasePageDTO),
        }
      );

      if (!response.ok) throw new Error(`Payment log update failed: ${response.status}`);

      return true;
    } catch (error) {
      console.error('Error updating payment log:', error);
      toast.error("Không thể ghi nhận giao dịch");
      return false;
    }
  };

  const handleViewOrder = () => {
    if (paymentDetails.isPaymentLogUpdated) {
      window.location.href = '/payment';
    } else {
      toast.warn("Đang xử lý giao dịch. Vui lòng đợi.");
    }
  };

  const handleBackToHome = () => {
    if (paymentDetails.isPaymentLogUpdated) {
      window.location.href = '/account';
    } else {
      toast.warn("Đang xử lý giao dịch. Vui lòng đợi.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Đang xử lý thanh toán, vui lòng đợi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>{error}</p>
        <button
          onClick={() => window.location.href = '/buyPaper'}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Quay về Trang Chủ
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <CircleCheckBig size={80} className="text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          Thanh Toán Thành Công
        </h1>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {paymentDetails.params.vnp_Amount
            ? (paymentDetails.params.vnp_Amount / 100).toLocaleString()
            : "0"} VNĐ
        </h2>

        <p className="text-gray-600 mb-6">
          Bạn đã nạp thành công {paymentDetails.purchasePages || 0} trang in.
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
            disabled={!paymentDetails.isPaymentLogUpdated}
          >
            {paymentDetails.isPaymentLogUpdated ? 'Quay Về Trang Chủ' : 'Đang Xử Lý...'}
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Mã đơn hàng: <span className="font-bold">{paymentDetails.params.vnp_BankTranNo || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
