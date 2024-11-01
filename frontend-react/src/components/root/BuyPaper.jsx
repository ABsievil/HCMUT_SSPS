import React, { useState, useMemo } from "react";
import Layout from "./fragments/layout/Layout";
import InputField from "./fragments/InputField/InputField";

const PAPER_TYPES = {
  A4: { label: "A4", price: 1500 }, // 1500 VND per page
  A3: { label: "A3", price: 3000 }, // 3000 VND per page
} 

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
    <label htmlFor={id} className="text-xl text-black">
      {label}
    </label>
    <div className="flex-1">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full text-xl text-black bg-white rounded-xl border border-black p-2"
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

const PrintingPage = () => {
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
    setQuantity(value >= 0 ? value : 0);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      quantity,
      paperType,
      totalAmount,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="md:col-span-5">
            <div className="space-y-8">
              <Select
                id="paperType"
                label="Loại giấy in:"
                value={paperType}
                onChange={(e) => setPaperType(e.target.value)}
                options={PAPER_TYPES}
              />

              <div className="flex gap-5 items-center">
                <label htmlFor="quantity" className="text-xl text-black">
                  Số lượng:
                </label>
                <InputField
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={0}
                  className="flex-1"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="totalAmount" className="block text-xl text-black">
                  Số tiền cần thanh toán
                </label>
                <InputField
                  type="text"
                  id="totalAmount"
                  value={totalAmount}
                  readOnly
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="md:col-span-7">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a3f32bd116ec870a5a0033720b078688ccb180bcad345877fab489633d1539a?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
              alt="Printing preview"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <Button onClick={handleSubmit}>
            <span>Xác nhận</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PrintingPage;