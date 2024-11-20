import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAvailablePrinters, updatePrinterStatus } from '../../../store/printersSlice';
import { Printer, Plus, Settings, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { addPrinter } from '../../../store/singlePrinterSlice';

// Reusable components with enhanced styling
const RadioButton = React.memo(({ id, label, name, checked, onChange, icon: Icon }) => (
    <label
        htmlFor={id}
        className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer
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
    const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1";
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
    <div className="space-y-4">
        {label && (
            <label className="mt-8 mb-3 text-xl font-medium tracking-wide uppercase text-neutral-800">{label}</label>
        )}
        <div className="relative">
            {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icon className="w-5 h-5" />
                </div>
            )}
            <select
                className={`w-full px-4 py-3 ${Icon ? 'pl-10' : ''} border-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${error ? 'border-red-500' : 'border-gray-200'}`}
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
        // it has to be this exact oder, do not swap lines
        brand_name: '',
        printer_model: '',
        description: '',
        campus: '',
        building: '',
        room: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.campus) newErrors.campus = 'cơ sở đặt máy in là bắt buộc';
        if (!formData.building) newErrors.building = 'Tòa nhà là bắt buộc';
        if (!formData.room) newErrors.room = 'Số phòng là bắt buộc';
        if (!formData.brand_name) newErrors.brand_name = 'Tên hãng máy in là bắt buộc';
        if (!formData.printer_model) newErrors.printer_model = 'Model máy in là bắt buộc';
        if (!formData.description) newErrors.description = 'Mô tả là bắt buộc';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
            // Handle successful form submission (e.g., dispatching an action to add the printer)
            dispatch(addPrinter(formData));
            toast.success('Máy in đã được thêm thành công!');
            onClose(); // Close the form after submission
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
        <form onSubmit={handleSubmit} className="space-y-8">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
                Thêm máy in mới
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-11">
                {/* Campus */}
                <div>
                    <select
                        value={formData.campus}
                        onChange={handleChange('campus')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.campus ? 'border-red-500' : 'border-gray-200'}`}
                    >
                        <option value="">Chọn cơ sở</option>
                        <option value="01">Cơ sở 1</option>
                        <option value="02">Cơ sở 2</option>
                    </select>
                    {errors.campus && (
                        <div className="text-red-500 text-sm mt-1">{errors.campus}</div>
                    )}
                </div>

                {/* Building */}
                <div>
                    <input
                        type="text"
                        placeholder="Tòa nhà"
                        value={formData.building}
                        onChange={handleChange('building')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.building ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.building && (
                        <div className="text-red-500 text-sm mt-1">{errors.building}</div>
                    )}
                </div>

                {/* Room */}
                <div>
                    <input
                        type="text"
                        placeholder="Phòng"
                        value={formData.room}
                        onChange={handleChange('room')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.room ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.room && (
                        <div className="text-red-500 text-sm mt-1">{errors.room}</div>
                    )}
                </div>

                {/* Brand Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Tên hãng"
                        value={formData.brand_name}
                        onChange={handleChange('brand_name')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.brand_name ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.brand_name && (
                        <div className="text-red-500 text-sm mt-1">{errors.brand_name}</div>
                    )}
                </div>

                {/* Printer Model */}
                <div>
                    <input
                        type="text"
                        placeholder="Model máy in"
                        value={formData.printer_model}
                        onChange={handleChange('printer_model')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.printer_model ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.printer_model && (
                        <div className="text-red-500 text-sm mt-1">{errors.printer_model}</div>
                    )}
                </div>

                {/* Description */}
                <div>
                    <input
                        type="text"
                        placeholder="Mô tả"
                        value={formData.description}
                        onChange={handleChange('description')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.description && (
                        <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-2">
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
        toast.success('Trạng thái máy in đã được cập nhật!');
    }, [dispatch, selectedPrinterId]);

    const selectedPrinter = availablePrinters.find(printer => printer.id === selectedPrinterId);

    return (
        <div className="mx-auto bg-white shadow-lg rounded-xl p-6 space-y-8 h-full">
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

                        <div className="space-y-6">
                            <h3 className="mt-8 mb-3 text-xl font-medium tracking-wide uppercase text-neutral-800 flex gap-2">
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
                    </div>
                </>
            ) : (
                <AddNewPrinterForm onClose={() => setShowAddForm(false)} />
            )}
        </div>
    );
};

export default React.memo(AddPrinter);
