import React, { useState } from 'react';

const SectionTitle = React.memo(({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-medium tracking-wide uppercase text-neutral-800">
        {children}
    </h3>
));

const Button = React.memo(({ children, className, ...props }) => (
    <button
        className={`px-4 py-3 text-base text-center text-white bg-slate-600 rounded-full hover:bg-slate-700 transition-colors ${className}`}
        {...props}
    >
        {children}
    </button>
));

const Select = React.memo(({ id, options, className, ...props }) => (
    <select
        id={id}
        className={`border border-gray-300 rounded-md p-3 ${className}`}
        {...props}
    >
        {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
));

const ManageFile = () => {
    const [periodicSupply, setPeriodicSupply] = useState(0);
    const [supplyDate, setSupplyDate] = useState('2018-10-12');

    const fileTypeOptions = [
        { value: ".doc", label: ".doc" },
        { value: ".docx", label: ".docx" },
        { value: ".pdf", label: ".pdf" },
        { value: ".txt", label: ".txt" },
        { value: ".rtf", label: ".rtf" },
    ];

    const handleNumberInput = (e) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setPeriodicSupply(value);
    };

    const handleDateChange = (e) => {
        setSupplyDate(e.target.value);
    };

    return (
        <div className="w-4/5 md:w-1/2 mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Điều chỉnh in ấn</h2>

            <SectionTitle>NGÀY CUNG CẤP ĐỊNH KỲ</SectionTitle>
            <input
                id="supplyDate"
                type="date"
                value={supplyDate}
                onChange={handleDateChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
            />

            <SectionTitle>SỐ TRANG CUNG CẤP ĐỊNH KỲ</SectionTitle>
            <input
                id="periodicSupply"
                type="number"
                min={0}
                value={periodicSupply}
                onChange={handleNumberInput}
                className="border border-gray-300 rounded-md p-2 w-1/2"
            />

            <SectionTitle>LOẠI TỆP ĐƯỢC TẢI LÊN</SectionTitle>
            <div className="flex items-center gap-4 mt-4 w-full">
                <Select id="fileType" options={fileTypeOptions} className="w-1/2" />
                <Button>Thêm loại tệp</Button>
            </div>
            <div className="flex justify-center mt-10">
                <Button className="w-1/3">XÁC NHẬN</Button>
            </div>
        </div>
    );
};

export default ManageFile;
