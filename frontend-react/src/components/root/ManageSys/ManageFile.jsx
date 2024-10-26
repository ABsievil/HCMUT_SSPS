import React, { useState } from 'react';
import InputField from '../fragments/InputField/InputField';

const SectionTitle = React.memo(({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-medium tracking-wide uppercase text-neutral-800">
        {children}
    </h3>
));

const Button = React.memo(({ children, className, ...props }) => (
    <button
        className={`px-4 py-2 text-base text-center text-white bg-slate-600 rounded-full hover:bg-slate-700 transition-colors ${className}`}
        {...props}
    >
        {children}
    </button>
));

const Select = React.memo(({ id, options, className, ...props }) => (
    <select
        id={id}
        className={`border border-gray-300 rounded-md p-2 ${className}`}
        {...props}
    >
        {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
));

const ManageFile = () => {
    // Khởi tạo state cho số trang và ngày cung cấp
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
        <div className="w-10/12 mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Điều chỉnh in ấn</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">

                <div>
                    <SectionTitle>NGÀY CUNG CẤP ĐỊNH KỲ</SectionTitle>
                    <InputField
                        id="supplyDate"
                        label="Ngày cung cấp"
                        type="date"
                        value={supplyDate} // Cập nhật giá trị ngày cung cấp
                        onChange={handleDateChange} // Thêm hàm xử lý thay đổi ngày
                    />
                    <SectionTitle>SỐ TRANG CUNG CẤP ĐỊNH KỲ</SectionTitle>
                    <InputField
                        id="periodicSupply"
                        type="number"
                        min={0}
                        defaultValue={periodicSupply} // Cập nhật giá trị số trang định kỳ
                        onInput={handleNumberInput} // Hàm xử lý thay đổi số trang
                    />

                    <SectionTitle>LOẠI TỆP ĐƯỢC TẢI LÊN</SectionTitle>
                    <div className="flex items-center gap-4 mt-4 w-full">
                        <Select id="fileType" options={fileTypeOptions} className="flex-grow" />
                        <Button>Thêm loại tệp</Button>
                    </div>
                </div>

            </div>
            <Button className="mt-10 w-full max-md:px-5 max-md:mt-6">XÁC NHẬN</Button>
        </div>
    );
};

export default ManageFile;
