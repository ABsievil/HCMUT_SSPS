import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAvailablePrinters, updatePrinterStatus } from '../../../store/printersSlice';
import { Printer, Plus, Settings, CheckCircle, XCircle } from 'lucide-react';

// Reusable components with enhanced styling
const RadioButton = React.memo(({ id, label, name, checked, onChange, icon: Icon }) => (
    <label
        htmlFor={id}
        className={`
      flex items-center gap-3 p-4 rounded-lg cursor-pointer
      border-2 transition-all duration-200
      ${checked
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-200'}
    `}
    >
        <input
            type="radio"
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            className="hidden"
        />
        {Icon && <Icon className={`w-5 h-5 ${checked ? 'text-blue-500' : 'text-gray-400'}`} />}
        <span className="font-medium">{label}</span>
    </label>
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

const Select = React.memo(({ label, options, error, icon: Icon, ...props }) => (
    <div className="space-y-2">
        {label && (
            <label className="block text-sm font-medium text-gray-700">{label}</label>
        )}
        <div className="relative">
            {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icon className="w-5 h-5" />
                </div>
            )}
            <select
                className={`
            w-full px-4 py-3 ${Icon ? 'pl-10' : ''}
            border-2 rounded-lg bg-white
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition duration-200
            ${error ? 'border-red-500' : 'border-gray-200'}
          `}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
));

// Form for adding new printer

const AddNewPrinterForm = React.memo(({ onClose }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        location: '',
        status: '',
        type: '',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.id) newErrors.id = 'ID máy in là bắt buộc';
        if (!formData.name) newErrors.name = 'Tên máy in là bắt buộc';
        if (!formData.location) newErrors.location = 'Vị trí là bắt buộc';
        if (!formData.status) newErrors.status = 'Trạng thái là bắt buộc';
        if (!formData.type) newErrors.type = 'Model máy in là bắt buộc';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle submission
            console.log('Submit new printer:', formData);
            onClose();
        }
    };

    const handleChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Plus className="w-6 h-6" />
                Thêm máy in mới
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                    type="text"
                    placeholder="ID máy in"
                    value={formData.id}
                    onChange={handleChange('id')}
                    className={`
                        w-full px-4 py-3 rounded-lg border-2
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ${errors.id ? 'border-red-500' : 'border-gray-200'}
                    `}
                />
                <input
                    type="text"
                    placeholder="Tên máy in"
                    value={formData.name}
                    onChange={handleChange('name')}
                    className={`
                        w-full px-4 py-3 rounded-lg border-2
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ${errors.name ? 'border-red-500' : 'border-gray-200'}
                    `}
                />
                <input
                    type="text"
                    placeholder="Vị trí"
                    value={formData.location}
                    onChange={handleChange('location')}
                    className={`
                        w-full px-4 py-3 rounded-lg border-2
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ${errors.location ? 'border-red-500' : 'border-gray-200'}
                    `}
                />
                <input
                    type="text"
                    placeholder="Model máy in"
                    value={formData.type}
                    onChange={handleChange('type')}
                    className={`
                        w-full px-4 py-3 rounded-lg border-2
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ${errors.type ? 'border-red-500' : 'border-gray-200'}
                    `}
                />
                <select
                    value={formData.status}
                    onChange={handleChange('status')}
                    className={`
                        w-full px-4 py-3 rounded-lg border-2
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ${errors.status ? 'border-red-500' : 'border-gray-200'}
                    `}
                >
                    <option value="Sẵn sàng">Sử dụng ngay</option>
                    <option value="Đang bảo trì">Chưa sử dụng được</option>
                </select>
            </div>
            <div className="flex justify-end gap-4">
                <Button variant="secondary" onClick={onClose}>
                    Hủy
                </Button>
                <Button type="submit">
                    Thêm máy in
                </Button>
            </div>
        </form>
    );
});

// Main component
const AddPrinter = () => {
    const dispatch = useDispatch();
    const availablePrinters = useSelector(selectAvailablePrinters);
    const [selectedPrinterId, setSelectedPrinterId] = useState(availablePrinters[0]?.id || '');
    const [showAddForm, setShowAddForm] = useState(false);

    const printerOptions = availablePrinters.map((printer) => ({
        value: printer.id,
        label: `${printer.name} - ${printer.location} (${printer.status})`
    }));

    const handlePrinterChange = (event) => {
        setSelectedPrinterId(event.target.value);
    };

    const handleStatusChange = useCallback((status) => {
        dispatch(updatePrinterStatus({ id: selectedPrinterId, status }));
    }, [dispatch, selectedPrinterId]);

    const selectedPrinter = availablePrinters.find(printer => printer.id === selectedPrinterId);

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-8">
            {!showAddForm ? (
                <>
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Printer />
                            Quản lý máy in
                        </h2>
                        <Button onClick={() => setShowAddForm(true)} icon={Plus}>
                            Thêm máy in mới
                        </Button>
                    </div>

                    <div className="space-y-6">
                        <Select
                            label="Chọn máy in"
                            options={printerOptions}
                            value={selectedPrinterId}
                            onChange={handlePrinterChange}
                            icon={Printer}
                        />

                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-700 flex items-center gap-2">
                                <Settings />
                                Trạng thái hoạt động
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <RadioButton
                                    id="active"
                                    label="Kích hoạt"
                                    name="printerStatus"
                                    checked={selectedPrinter?.status === 'Sẵn sàng'}
                                    onChange={() => handleStatusChange('Sẵn sàng')}
                                    icon={CheckCircle}
                                />
                                <RadioButton
                                    id="inactive"
                                    label="Dừng hoạt động"
                                    name="printerStatus"
                                    checked={selectedPrinter?.status === 'Đang bảo trì'}
                                    onChange={() => handleStatusChange('Đang bảo trì')}
                                    icon={XCircle}
                                />
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <Button >
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <AddNewPrinterForm onClose={() => setShowAddForm(false)} />
            )}
        </div>
    );
};

export default React.memo(AddPrinter);