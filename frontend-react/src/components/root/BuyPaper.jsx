import React, { useState, useMemo } from "react";
import Layout from "./fragments/layout/Layout";
import InputField from "./fragments/InputField/InputField";
import { toast } from "react-toastify";

const PAPER_TYPES = {
  A4: { label: "A4", price: 1500 }, // 1500 VND per page
  A3: { label: "A3", price: 3000 }, // 3000 VND per page
};

const AVAILABLE_PAGES = 10000; // Total pages available

const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-12 py-4 text-sm font-semibold tracking-wide text-white
     uppercase bg-blue-700 hover:bg-blue-800 rounded-3xl transition-colors
     duration-200 ${className}`}
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

const BuyPage = () => {
  const [quantity, setQuantity] = useState(100);
  const [paperType, setPaperType] = useState("A4");

  // Calculate total amount using useMemo to prevent unnecessary recalculations
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

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      quantity,
      paperType,
      totalAmount,
    });

    // Trigger toast notification after form submission
    toast.success("Xác nhận thành công! Tiến hành thanh toán")
  };

  return (
    <Layout>
      <div className="container mx-auto pt-10 px-4">
        {/* Centering the content using flexbox */}
        <div className="flex flex-col md:flex-row justify-center gap-10">
          {/* Form Section */}
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

          {/* Preview Section */}
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
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-20">
          <Button onClick={handleSubmit}>
            <span>Xác nhận</span>
          </Button>
        </div>
      </div>

    </Layout>
  );
};

export default BuyPage;
