import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAvailablePrinters, updatePrinterStatus } from '../../../store/printersSlice';

const RadioButton = React.memo(({ id, label, name, checked, onChange }) => (
    <div className="flex items-center p-2 rounded-lg">
        <input
            type="radio"
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            className="w-4 h-4 text-blue-600"
        />
        <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900">
            {label}
        </label>
    </div>
));

const SectionTitle = React.memo(({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-medium tracking-wide uppercase text-neutral-800">
        {children}
    </h3>
));

const Button = React.memo(({ children, className, ...props }) => (
    <button
        className={`px-4 py-3 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 transition-colors ${className}`}
        {...props}
    >
        {children}
    </button>
));

const Select = React.memo(({ id, options, className, ...props }) => (
    <select
        id={id}
        className={`border border-gray-300 rounded-md p-1 ${className}`}
        {...props}
    >
        {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
));

const AddPrinter = () => {
    const dispatch = useDispatch();
    const availablePrinters = useSelector(selectAvailablePrinters);
    
    const [selectedPrinterId, setSelectedPrinterId] = useState(availablePrinters[0]?.id || '');

    const printerOptions = availablePrinters.map((printer) => ({
        value: printer.id,
        label: `${printer.name} - ${printer.location} (${printer.status})`
    }));

    const handlePrinterChange = (event) => {
        setSelectedPrinterId(event.target.value);
    };

    const handleStatusChange = (status) => {
        dispatch(updatePrinterStatus({ id: selectedPrinterId, status }));
    };

    const selectedPrinter = availablePrinters.find(printer => printer.id === selectedPrinterId);

    return (
        <div className="w-4/5 md:w-1/2 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Thêm máy in</h2>
            <div>
                <SectionTitle>CHỌN MÁY IN</SectionTitle>
                <div className='flex gap-4 flex-wrap'>
                    <Select
                        id="printerId"
                        options={printerOptions}
                        value={selectedPrinterId}
                        onChange={handlePrinterChange}
                        className="w-1/2"
                    />
                    <Button>Thêm máy in</Button>
                </div>
                <div className="mt-4 space-y-2">
                    <RadioButton
                        id="active"
                        label="Kích hoạt"
                        name="printerStatus"
                        checked={selectedPrinter?.status === 'Sẵn sàng'}
                        onChange={() => handleStatusChange('Sẵn sàng')}
                    />
                    <RadioButton
                        id="inactive"
                        label="Dừng hoạt động"
                        name="printerStatus"
                        checked={selectedPrinter?.status === 'Đang bảo trì'}
                        onChange={() => handleStatusChange('Đang bảo trì')}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <Button className="w-1/3">XÁC NHẬN</Button>
            </div>
        </div>
    );
};

export default AddPrinter;
