import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createVnPayPayment } from "../../store/paymentSlice"; // Adjust path if needed
import Layout from "./fragments/layout/Layout";
import InputField from "./fragments/InputField/InputField";
import { toast } from "react-toastify";
import { XCircle, CheckCircle, Loader, CreditCard, QrCode } from 'lucide-react';
import { updatePagesRemain } from "../../store/personalInforSlice";

const updatePaymentLog = async (studentId, purchasePages) => {
  try {
    const PurchasePageDTO = {
      studentId: studentId,
      purchasePages: purchasePages,
      purchaseDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      purchaseTime: new Date().toTimeString().split(' ')[0], // Current time in HH:MM:SS format
      payingMethod: "QRcode"
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

const PAPER_TYPES = {
  A4: { label: "A4", price: 1500 },
  A3: { label: "A3", price: 3000 },
};

const BANKS = [
  "NCB",
  "Vietcombank",
  "Techcombank",
  "BIDV",
  "Agribank",
  "VPBank",
  "MBBank",
  "TPBank",
  "ACB"
];

const PAYMENT_METHODS = {
  QR: 'qr',
  BANK: 'bank'
};

const QRPaymentModal = ({ orderId, amount, onClose, quantity }) => {
  const dispatch = useDispatch();
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const fetchTransactions = useCallback(async (orderId) => {
    if (paymentStatus === "success" || paymentStatus === "error") return;

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/transactions/list?Limit=10`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!data?.data?.transactions) {
        throw new Error("Invalid response structure");
      }

      const matchingTransactions = data.data.transactions.filter(transaction =>
        transaction.transaction_content.includes(orderId)
      );

      // Clean amount and ensure it is formatted to 2 decimal places
      const cleanAmount = parseFloat(amount.replace(/[^0-9-]+/g, '')).toFixed(2);

      if (matchingTransactions.length > 0) {
        const isPaymentSuccessful = matchingTransactions.some(
          transaction => parseFloat(transaction.amount_in) === parseFloat(cleanAmount)
        );

        if (isPaymentSuccessful) {
          const studentId = localStorage.getItem('studentId')
          const isPaymentLogged = await updatePaymentLog(studentId, quantity);
          if (isPaymentLogged) {
            dispatch(updatePagesRemain(quantity));

            setPaymentStatus("success");
            toast.success("Thanh toán thành công!");
            onClose();
          }
        } else {
          setPaymentStatus("error");
          toast.error("Thanh toán không thành công. Vui lòng thử lại.");
        }
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setPaymentStatus("error");
      toast.error("Đã xảy ra lỗi khi xác minh thanh toán.");
    } finally {
      setLoading(false);
      setIsConfirming(false);
    }
  }, [orderId, amount, onClose, paymentStatus, dispatch, quantity]);

  const handleConfirmPayment = useCallback(() => {
    setPaymentStatus("processing");
    setIsConfirming(true);
    fetchTransactions(orderId);
  }, [fetchTransactions, orderId]);

  useEffect(() => {
    // Only start periodic checks if user has confirmed payment
    if (isConfirming) {
      const intervalId = setInterval(() => fetchTransactions(orderId), 20000);
      return () => clearInterval(intervalId);
    }
  }, [orderId, fetchTransactions, isConfirming]);

  const renderPaymentStatusContent = useMemo(() => {
    if (paymentStatus === "pending" && !isConfirming) {
      return <p className="text-gray-600">Đang chờ thanh toán... Vui lòng quét mã QR</p>;
    }

    if (paymentStatus === "processing" || isConfirming) {
      return (
        <div className="flex flex-col items-center space-y-2">
          <Loader className="w-6 h-6 animate-spin text-blue-500" />
          <p className="text-gray-600">Đang xác nhận thanh toán...</p>
        </div>
      );
    }

    if (paymentStatus === "success") {
      return (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="w-6 h-6" />
            <span>Thanh toán thành công!</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Cảm ơn bạn đã mua hàng
          </button>
        </div>
      );
    }

    return null;
  }, [paymentStatus, isConfirming, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">QR Payment</h3>
          <div onClick={onClose} className="text-gray-600 hover:text-gray-800 cursor-pointer">
            <XCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="space-x-6 flex flex-row">
          <div className="flex justify-center">
            <img
              src="src/images/qr-checkout.jpg"
              alt="QR Code"
              className="border rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Mã đơn hàng:</span>
              <span className="font-mono">{orderId}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium">Số tiền:</span>
              <span className="font-semibold">{amount}</span>
            </div>

            <div className="bg-blue-50 border-blue-200 text-blue-700 rounded-lg p-4 mb-4">
              <p className="text-sm">Lưu ý: Vui lòng ghi mã đơn hàng trong nội dung chuyển khoản.</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              {renderPaymentStatusContent}

              {paymentStatus !== "success" && !isConfirming && (
                <button
                  onClick={handleConfirmPayment}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Xác nhận thanh toán
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const Button = ({ children, onClick, className = "", disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-12 py-4 text-sm font-semibold tracking-wide text-white
     uppercase bg-blue-700 hover:bg-blue-800 rounded-3xl transition-colors
     duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
  >
    {children}
  </button>
);

const Select = ({ value, onChange, options, label, id }) => (
  <div className="flex gap-5 w-full items-center">
    <label htmlFor={id} className="text-xl text-black font-semibold">
      {label}
    </label>
    <div className="flex-1">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full text-xl text-black bg-white rounded-xl border border-gray-300 p-2"
      >
        {Object.entries(options).map(([key, { label }]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const PaymentMethodSelector = ({ selectedMethod, onMethodChange, selectedBank, onBankChange }) => (
  <div className="space-y-4">
    <div className="space-y-3">
      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
        <input
          type="radio"
          name="paymentMethod"
          value={PAYMENT_METHODS.QR}
          checked={selectedMethod === PAYMENT_METHODS.QR}
          onChange={(e) => onMethodChange(e.target.value)}
          className="mr-3"
        />
        <QrCode className="w-5 h-5 mr-2" />
        <span>Quét mã QR code</span>
      </label>

      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
        <input
          type="radio"
          name="paymentMethod"
          value={PAYMENT_METHODS.BANK}
          checked={selectedMethod === PAYMENT_METHODS.BANK}
          onChange={(e) => onMethodChange(e.target.value)}
          className="mr-3"
        />
        <CreditCard className="w-5 h-5 mr-2" />
        <span>Thanh toán bằng ngân hàng</span>
      </label>
    </div>

    {selectedMethod === PAYMENT_METHODS.BANK && (
      <div className="mt-4">
        <select
          className="w-full px-4 py-2 text-left bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedBank}
          onChange={(e) => onBankChange(e.target.value)}
        >
          <option value="">Chọn ngân hàng</option>
          {BANKS.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
      </div>
    )}
  </div>
);

const BuyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [paperType, setPaperType] = useState("A4");
  const [showQRModal, setShowQRModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS.QR);
  const [selectedBank, setSelectedBank] = useState("");

  // Fetch the remaining pages from the personalInfor state
  const { personalInfor } = useSelector((state) => state.personalInfor);

  const [remainingPages, setRemainingPages] = useState(() => {
    // Ưu tiên lấy từ Redux state, nếu không có thì lấy từ localStorage
    return personalInfor?.data?.page_remain ??
      parseInt(localStorage.getItem('remainingPages') ?? '10000');
  });

  useEffect(() => {
    if (personalInfor?.data?.page_remain !== undefined) {
      setRemainingPages(personalInfor.data.page_remain);
      // Lưu vào localStorage để sử dụng sau này
      localStorage.setItem('remainingPages', personalInfor.data.page_remain);
    }
  }, [personalInfor]);

  const generateOrderId = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000); // 6 random digits
    return `${randomDigits}`;
  };

  const totalAmount = useMemo(() => {
    const amount = quantity * PAPER_TYPES[paperType].price;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }, [quantity, paperType]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value >= 0 && value <= remainingPages ? value : 0); // Ensure quantity doesn't exceed remaining pages
  };

  const handleSubmit = async () => {
    if (quantity <= 0 || quantity > remainingPages) {
      toast.error(`Vui lòng kiểm tra lại số lượng trang! (Tối đa ${remainingPages} trang)`);
      return;
    }

    if (selectedPayment === PAYMENT_METHODS.BANK && !selectedBank) {
      toast.error("Vui lòng chọn ngân hàng!");
      return;
    }

    const numericAmount = PAPER_TYPES[paperType].price * quantity; // Get raw numeric value

    if (selectedPayment === PAYMENT_METHODS.BANK) {
      try {
        const response = await dispatch(createVnPayPayment({ amount: numericAmount, bankCode: selectedBank }));
        if (response.payload?.paymentUrl) {
          window.location.href = response.payload.paymentUrl;
        } else {
          toast.error("Không thể nhận được URL thanh toán");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi xử lý thanh toán.");
      }
    } else {
      setOrderId(generateOrderId());
      setShowQRModal(true);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto pt-10 px-4">
        <div className="flex flex-col md:flex-row justify-center gap-10">
          <div className="space-y-8 w-full md:w-1/3 bg-white rounded-lg shadow-md p-6">
            <p className="text-xl text-black">
              Tổng số trang có sẵn: {remainingPages}
            </p>
            <Select
              id="paperType"
              label="Loại giấy in:"
              value={paperType}
              onChange={(e) => setPaperType(e.target.value)}
              options={PAPER_TYPES}
            />

            <div className="flex flex-col">
              <label htmlFor="quantity" className="text-xl text-black">
                Số lượng (tối đa {remainingPages} trang):
              </label>
              <InputField
                type="number"
                id="quantity"
                value={String(quantity)}
                onChange={handleQuantityChange}
                min={0}
                max={remainingPages}
                className="flex-1"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="totalAmount" className="block text-xl text-black">
                Đơn giá: {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(PAPER_TYPES[paperType].price)} / trang
              </label>
              <label htmlFor="totalAmount" className="block text-xl text-black font-semibold">
                Số tiền cần thanh toán: {totalAmount}
              </label>
            </div>
          </div>

          <div className="w-full md:w-1/4 flex flex-col justify-center items-center bg-gray-100 rounded-lg shadow-md p-6">
            <img
              loading="lazy"
              src="src/images/paper.jpg"
              alt="Printing preview"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
            <p className="text-center mt-4 text-lg text-black">
              Giấy định lượng 80gsm với độ dày cao, bề mặt giấy đẹp rất phù hợp để in photo
            </p>
          </div>

          <div className="lg:w-1/3 w-full lg:pl-8 mt-6 lg:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Chọn phương thức thanh toán</h2>
              <PaymentMethodSelector
                selectedMethod={selectedPayment}
                onMethodChange={setSelectedPayment}
                selectedBank={selectedBank}
                onBankChange={setSelectedBank}
              />

              <div className="mt-6 pt-6 border-t">
                <Button
                  onClick={handleSubmit}
                  disabled={quantity <= 0 || quantity > remainingPages || (selectedPayment === PAYMENT_METHODS.BANK && !selectedBank)}
                  className="w-full"
                >
                  Xác nhận thanh toán
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showQRModal && (
        <QRPaymentModal
          orderId={orderId}
          amount={totalAmount}
          quantity={quantity}
          onClose={() => setShowQRModal(false)}
        />
      )}
    </Layout>
  );
};

export default BuyPage;