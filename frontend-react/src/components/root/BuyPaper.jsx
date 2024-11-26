import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVnPayPayment } from "../../store/paymentSlice"; // Adjust path if needed
import Layout from "./fragments/layout/Layout";
import InputField from "./fragments/InputField/InputField";
import { toast } from "react-toastify";
import { XCircle, CheckCircle, Loader, CreditCard, QrCode } from 'lucide-react';

const PAPER_TYPES = {
  A4: { label: "A4", price: 1500 },
  A3: { label: "A3", price: 3000 },
};

const AVAILABLE_PAGES = 10000;

const BANKS = [
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

const QRPaymentModal = ({ orderId, amount, onClose }) => {
  const [paymentStatus, setPaymentStatus] = useState('pending');

  useEffect(() => {
    let processingTimeout;
    let successTimeout;

    const checkPayment = () => {
      processingTimeout = setTimeout(() => {
        setPaymentStatus('processing');

        successTimeout = setTimeout(() => {
          setPaymentStatus('success');
          toast.success("Thanh toán thành công!");
        }, 3000);
      }, 1000);
    };

    checkPayment();

    // Cleanup timeouts
    return () => {
      if (processingTimeout) clearTimeout(processingTimeout);
      if (successTimeout) clearTimeout(successTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">QR Payment</h3>
          {paymentStatus !== 'processing' && (
            <div
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <XCircle className="w-6 h-6" />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <img
              src="src/images/qr-checkout.png"
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
              {paymentStatus === 'pending' && (
                <p className="text-gray-600">Đang chờ thanh toán...</p>
              )}

              {paymentStatus === 'processing' && (
                <div className="flex flex-col items-center space-y-2">
                  <Loader className="w-6 h-6 animate-spin text-blue-500" />
                  <p className="text-gray-600">Đang xác nhận thanh toán...</p>
                </div>
              )}

              {paymentStatus === 'success' && (
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
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(100);
  const [paperType, setPaperType] = useState("A4");
  const [showQRModal, setShowQRModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS.QR);
  const [selectedBank, setSelectedBank] = useState("");

  // Generate random order ID
  const generateOrderId = () => {
    return `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  // Calculate total amount using useMemo
  const totalAmount = useMemo(() => {
    const amount = quantity * PAPER_TYPES[paperType].price;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }, [quantity, paperType]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value >= 0 && value <= AVAILABLE_PAGES ? value : 0);
  };

  const handleSubmit = async () => {
    if (quantity <= 0 || quantity > AVAILABLE_PAGES) {
      toast.error("Vui lòng kiểm tra lại số lượng trang!");
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
          window.location.href = response.payload.paymentUrl;  // Redirect to payment page
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
              Tổng số trang có sẵn: {AVAILABLE_PAGES}
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
                Số lượng (tối đa {AVAILABLE_PAGES} trang):
              </label>
              <InputField
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min={0}
                max={AVAILABLE_PAGES}
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
                  disabled={quantity <= 0 || quantity > AVAILABLE_PAGES || (selectedPayment === PAYMENT_METHODS.BANK && !selectedBank)}
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
          onClose={() => setShowQRModal(false)}
        />
      )}
    </Layout>
  );
};

export default BuyPage;