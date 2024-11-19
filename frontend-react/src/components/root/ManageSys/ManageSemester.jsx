import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFileType, removeFileType, selectFileTypes } from '../../../store/fileTypeSlice';
import { File, Plus } from "lucide-react";
import { toast } from 'react-toastify';

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

const AddNewSemesterForm = React.memo(({ onClose }) => {
    const [formData, setFormData] = useState({
        semester_name: '',
        paper_supply_date: '',
        pages_per_period: '',
        paper_cost: '',
        start_date: '',
        end_date: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.semester_name) newErrors.semester_name = 'Tên học kỳ là bắt buộc';
        if (!formData.paper_supply_date) newErrors.paper_supply_date = 'Ngày cung cấp giấy là bắt buộc';
        if (!formData.pages_per_period) newErrors.pages_per_period = 'Số trang cung cấp là bắt buộc';
        if (!formData.paper_cost) newErrors.paper_cost = 'Giá tiền mua giấy là bắt buộc';
        if (!formData.start_date) newErrors.start_date = 'Ngày bắt đầu học kỳ là bắt buộc';
        if (!formData.end_date) newErrors.end_date = 'Ngày kết thúc học kỳ là bắt buộc';

        // Validate dates
        if (formData.start_date && formData.end_date) {
            if (new Date(formData.start_date) >= new Date(formData.end_date)) {
                newErrors.end_date = 'Ngày kết thúc phải sau ngày bắt đầu';
            }
        }

        // Validate number inputs
        if (formData.pages_per_period && isNaN(formData.pages_per_period)) {
            newErrors.pages_per_period = 'Số trang phải là số';
        }
        if (formData.paper_cost && isNaN(formData.paper_cost)) {
            newErrors.paper_cost = 'Giá tiền phải là số';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(addSemester(formData));
            toast.success('Học kỳ đã được thêm thành công!');
            onClose();
        }
    };

    const handleChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Plus className="w-6 h-6" />
                Thêm học kỳ mới
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Tên học kỳ</label>
                    <input
                        type="text"
                        placeholder="VD: Học kỳ 1 2023-2024"
                        value={formData.semester_name}
                        onChange={handleChange('semester_name')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.semester_name ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.semester_name && <p className="text-red-500 text-sm">{errors.semester_name}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Ngày cung cấp giấy định kỳ</label>
                    <input
                        type="date"
                        value={formData.paper_supply_date}
                        onChange={handleChange('paper_supply_date')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.paper_supply_date ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.paper_supply_date && <p className="text-red-500 text-sm">{errors.paper_supply_date}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Số trang cung cấp định kỳ</label>
                    <input
                        type="number"
                        placeholder="VD: 100"
                        value={formData.pages_per_period}
                        onChange={handleChange('pages_per_period')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.pages_per_period ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.pages_per_period && <p className="text-red-500 text-sm">{errors.pages_per_period}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Giá tiền mua giấy</label>
                    <input
                        type="number"
                        placeholder="VD: 20000"
                        value={formData.paper_cost}
                        onChange={handleChange('paper_cost')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.paper_cost ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.paper_cost && <p className="text-red-500 text-sm">{errors.paper_cost}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Ngày bắt đầu học kỳ</label>
                    <input
                        type="date"
                        value={formData.start_date}
                        onChange={handleChange('start_date')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.start_date ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Ngày kết thúc học kỳ</label>
                    <input
                        type="date"
                        value={formData.end_date}
                        onChange={handleChange('end_date')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.end_date ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date}</p>}
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button variant="secondary" onClick={onClose}>
                    Hủy
                </Button>
                <Button type="submit">
                    Thêm học kỳ
                </Button>
            </div>
        </form>
    );
});

const ManageFile = () => {
    const dispatch = useDispatch();
    const fileTypes = useSelector(selectFileTypes);
    const [periodicSupply, setPeriodicSupply] = useState(200);
    const [supplyDate, setSupplyDate] = useState('2018-10-12');
    const [customFileType, setCustomFileType] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedFileType, setSelectedFileType] = useState(fileTypes[0]?.value || '');

    const handleCustomFileTypeChange = useCallback((e) => {
        setCustomFileType(e.target.value.toLowerCase());
    }, []);

    const handleAddFileType = useCallback(() => {
        if (!customFileType) return;

        const formattedFileType = customFileType.startsWith('.') ? customFileType : `.${customFileType}`;

        if (fileTypes.some(type => type.value === formattedFileType)) {
            toast.error('Loại tệp này đã tồn tại!');
            return;
        }

        dispatch(addFileType({ value: formattedFileType, label: formattedFileType }));
        setCustomFileType('');
        toast.success('Loại tệp đã được thêm thành công!');
    }, [customFileType, dispatch, fileTypes]);

    const handleRemoveFileType = useCallback((typeToRemove) => {
        dispatch(removeFileType(typeToRemove));
        if (selectedFileType === typeToRemove) {
            setSelectedFileType(fileTypes[0]?.value || '');
        }
        toast.success('Loại tệp đã được xóa thành công!');
    }, [selectedFileType, dispatch, fileTypes]);

    return (
        <div className="w-4/5 md:w-1/2 mx-auto bg-white shadow-lg rounded-xl p-6 space-y-8">
            {!showAddForm ? (
                <>
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <File />
                            Điều chỉnh thông tin học kì
                        </h2>
                        <Button onClick={() => setShowAddForm(true)} icon={Plus}>
                            Thêm học kì mới
                        </Button>
                    </div>

                    <SectionTitle>NGÀY CUNG CẤP ĐỊNH KỲ</SectionTitle>
                    <input
                        id="supplyDate"
                        type="date"
                        value={supplyDate}
                        className="border border-gray-300 rounded-md p-2 w-1/2"
                        disabled
                    />

                    <SectionTitle>SỐ TRANG CUNG CẤP ĐỊNH KỲ</SectionTitle>
                    <input
                        id="periodicSupply"
                        type="number"
                        min={0}
                        value={periodicSupply}
                        className="border border-gray-300 rounded-md p-2 w-1/2"
                        disabled
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
                            {fileTypes.map((type) => (
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
                </>
            ) : (
                <AddNewSemesterForm onClose={() => setShowAddForm(false)} />
            )}
        </div>
    );

};

export default ManageFile;
