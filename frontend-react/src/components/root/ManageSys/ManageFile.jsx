import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFileType, removeFileType, selectFileTypes } from '../../../store/fileTypeSlice';
import { File } from "lucide-react";

const SectionTitle = React.memo(({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-medium tracking-wide uppercase text-neutral-800">
        {children}
    </h3>
));

const Button = React.memo(({ children, variant = 'primary', className = '', icon: Icon, ...props }) => {
    const baseStyle = "px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-1";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
        secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300",
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {Icon && <Icon className="w-5 h-5" />}
            {children}
        </button>
    );
});

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
    const dispatch = useDispatch();
    const fileTypes = useSelector(selectFileTypes);
    const [periodicSupply, setPeriodicSupply] = useState(0);
    const [supplyDate, setSupplyDate] = useState('2018-10-12');
    const [customFileType, setCustomFileType] = useState('');
    const [selectedFileType, setSelectedFileType] = useState(fileTypes[0]?.value || '');

    const handleNumberInput = useCallback((e) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setPeriodicSupply(value);
    }, []);

    const handleDateChange = useCallback((e) => {
        setSupplyDate(e.target.value);
    }, []);

    const handleCustomFileTypeChange = useCallback((e) => {
        setCustomFileType(e.target.value.toLowerCase());
    }, []);

    const handleAddFileType = useCallback(() => {
        if (!customFileType) return;

        const formattedFileType = customFileType.startsWith('.') ? customFileType : `.${customFileType}`;

        if (fileTypes.some(type => type.value === formattedFileType)) {
            alert('Loại tệp này đã tồn tại!');
            return;
        }

        dispatch(addFileType({ value: formattedFileType, label: formattedFileType }));
        setCustomFileType('');
    }, [customFileType, dispatch, fileTypes]);

    const handleRemoveFileType = useCallback((typeToRemove) => {
        dispatch(removeFileType(typeToRemove));
        if (selectedFileType === typeToRemove) {
            setSelectedFileType(fileTypes[0]?.value || '');
        }
    }, [selectedFileType, dispatch, fileTypes]);

    const handleSubmit = useCallback(() => {
        const formData = {
            periodicSupply,
            supplyDate,
            selectedFileType,
            allowedFileTypes: fileTypes.map(type => type.value),
        };
        console.log('Form submitted:', formData);
        // Implement your submit logic here
    }, [periodicSupply, supplyDate, selectedFileType, fileTypes]);

    return (
        <div className="w-4/5 md:w-1/2 mx-auto bg-white shadow-lg rounded-xl p-6 space-y-8">

            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <File />
                Điều chỉnh in ấn
            </h2>

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
            <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-4 w-full">
                    <Select
                        id="fileType"
                        options={fileTypes}
                        className="w-1/2"
                        value={selectedFileType}
                        onChange={(e) => setSelectedFileType(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Thêm loại tệp mới (vd: .png)"
                        value={customFileType}
                        onChange={handleCustomFileTypeChange}
                        className="border border-gray-300 rounded-md p-2 flex-1"
                    />
                    <Button onClick={handleAddFileType}>Thêm</Button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {fileTypes.map(type => (
                        <div
                            key={type.value}
                            className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full"
                        >
                            <span>{type.value}</span>
                            {fileTypes.length > 1 && (
                                <button
                                    onClick={() => handleRemoveFileType(type.value)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <Button onClick={handleSubmit}>XÁC NHẬN</Button>
            </div>
        </div>
    );
};

export default ManageFile;
