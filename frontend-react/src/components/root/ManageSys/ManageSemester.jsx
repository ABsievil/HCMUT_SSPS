import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFileType, removeFileType, selectAvailableFileTypes, fetchFileType } from '../../../store/fileTypeSlice';
import { File, Plus } from "lucide-react";
import { toast } from 'react-toastify';
import { addSemester } from '../../../store/SemesterContext';

const SectionTitle = React.memo(({ children }) => (
    <h3 className="mt-4 mb-3 text-xl font-medium tracking-wide uppercase text-neutral-800">
        {children}
    </h3>
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
        semesterId: '',
        defaultpage: '',
        dateReset: '',
        pagePrice: '',
        dateStart: '',
        dateEnd: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.semesterId) newErrors.semesterId = 'Mã học kỳ là bắt buộc';
        if (!formData.dateReset) newErrors.dateReset = 'Ngày cung cấp giấy là bắt buộc';
        if (!formData.defaultpage) newErrors.defaultpage = 'Số trang cung cấp là bắt buộc';
        if (!formData.pagePrice) newErrors.pagePrice = 'Giá tiền mua giấy là bắt buộc';
        if (!formData.dateStart) newErrors.dateStart = 'Ngày bắt đầu học kỳ là bắt buộc';
        if (!formData.dateEnd) newErrors.dateEnd = 'Ngày kết thúc học kỳ là bắt buộc';

        // Validate dates
        if (formData.dateStart && formData.dateEnd) {
            if (new Date(formData.dateStart) >= new Date(formData.dateEnd)) {
                newErrors.dateEnd = 'Ngày kết thúc phải sau ngày bắt đầu';
            }
        }

        // Validate number inputs
        if (formData.defaultpage && isNaN(formData.defaultpage)) {
            newErrors.defaultpage = 'Số trang phải là số';
        }
        if (formData.pagePrice && isNaN(formData.pagePrice)) {
            newErrors.pagePrice = 'Giá tiền phải là số';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            addSemester(formData);
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
                Thêm học kỳ mới
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Mã học kỳ</label>
                    <input
                        type="text"
                        placeholder="VD: 232, 241"
                        value={formData.semesterId}
                        onChange={handleChange('semesterId')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.semesterId ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.semesterId && <p className="text-red-500 text-sm">{errors.semesterId}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Ngày cung cấp giấy định kỳ</label>
                    <input
                        type="date"
                        value={formData.dateReset}
                        onChange={handleChange('dateReset')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.dateReset ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.dateReset && <p className="text-red-500 text-sm">{errors.dateReset}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Số trang cung cấp định kỳ</label>
                    <input
                        type="number"
                        placeholder="VD: 100"
                        value={formData.defaultpage}
                        onChange={handleChange('defaultpage')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.defaultpage ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.defaultpage && <p className="text-red-500 text-sm">{errors.defaultpage}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Giá tiền mua giấy</label>
                    <input
                        type="number"
                        placeholder="VD: 20000"
                        value={formData.pagePrice}
                        onChange={handleChange('pagePrice')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.pagePrice ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.pagePrice && <p className="text-red-500 text-sm">{errors.pagePrice}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Ngày bắt đầu học kỳ</label>
                    <input
                        type="date"
                        value={formData.dateStart}
                        onChange={handleChange('dateStart')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.dateStart ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.dateStart && <p className="text-red-500 text-sm">{errors.dateStart}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Ngày kết thúc học kỳ</label>
                    <input
                        type="date"
                        value={formData.dateEnd}
                        onChange={handleChange('dateEnd')}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.dateEnd ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.dateEnd && <p className="text-red-500 text-sm">{errors.dateEnd}</p>}
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
    useEffect(() => {
        dispatch(fetchFileType(241));
    }, []);
    const {isLoading, types, availableTypes, error} = useSelector(selectAvailableFileTypes);
    const [periodicSupply, setPeriodicSupply] = useState(200);
    const [supplyDate, setSupplyDate] = useState('2018-10-12');
    const [customFileType, setCustomFileType] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    // New State for Selected Semester
    const [semesters, setSemesters] = useState([
        { value: '241', label: '20241 - Học kỳ 1 2024-2025' },
        { value: '242', label: '20242 - Học kỳ 2 2024-2025' },
    ]);
    const [selectedSemester, setSelectedSemester] = useState(semesters[0]?.value || '');

    const handleSemesterChange = useCallback((e) => {
        setSelectedSemester(e.target.value);
    }, []);

    const handleCustomFileTypeChange = useCallback((e) => {
        setCustomFileType(e.target.value.toLowerCase());
    }, []);

    const handleAddFileType = useCallback(() => {
        if (!customFileType) return;

        const formattedFileType = customFileType.startsWith('.') ? customFileType : `.${customFileType}`;

        if (availableTypes?.data.some((type) => type.value === formattedFileType)) {
            toast.error('Loại tệp này đã tồn tại!');
            return;
        }

        dispatch(addFileType({semester :'241' , accepted_file_type: formattedFileType}));
        setCustomFileType('');
        toast.success('Loại tệp đã được thêm thành công!');
    }, [customFileType, dispatch, availableTypes]);

    const handleRemoveFileType = useCallback(
        (typeToRemove) => {
            dispatch(removeFileType({semester: '241', typeToRemove}));
        },
        [dispatch]
    );

    return (
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-6 space-y-8">
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

                    {/* Select Semester Section */}
                    <div className="flex items-center gap-4">
                        <SectionTitle>CHỌN HỌC KỲ</SectionTitle>
                        <Select
                            id="selectSemester"
                            options={semesters}
                            className="flex-1"
                            value={selectedSemester}
                            onChange={handleSemesterChange}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <SectionTitle>NGÀY CUNG CẤP ĐỊNH KỲ</SectionTitle>
                        <input
                            id="supplyDate"
                            type="date"
                            value={supplyDate}
                            className="border border-gray-300 rounded-md p-2 flex-1 text-center"
                            disabled
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <SectionTitle>SỐ TRANG CUNG CẤP ĐỊNH KỲ</SectionTitle>
                        <input
                            id="periodicSupply"
                            type="number"
                            min={0}
                            value={periodicSupply}
                            className="border border-gray-300 rounded-md p-2 flex-1 text-center"
                            disabled
                        />
                    </div>

                    <SectionTitle>LOẠI TỆP ĐƯỢC TẢI LÊN</SectionTitle>
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex items-center gap-4 w-full">
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
                            {availableTypes.data?.map((type) => (
                                <div
                                    key={type.accepted_file_type}
                                    className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full"
                                >
                                    <span>{type.accepted_file_type}</span>
                                    {availableTypes.data.length > 1 && (
                                        <button
                                            onClick={() => handleRemoveFileType(type.accepted_file_type)}
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

