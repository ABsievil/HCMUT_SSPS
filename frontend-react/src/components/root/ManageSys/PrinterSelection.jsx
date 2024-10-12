import React from 'react';
import PropTypes from 'prop-types';

const InputField = React.memo(({ id, label, type = "text", ...props }) => (
    <div className="flex flex-col items-start w-full">
        <label htmlFor={id} className="mb-2 font-medium text-neutral-800">
            {label}
        </label>
        <input
            type={type}
            id={id}
            className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...props}
        />
    </div>
));

InputField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
};

const RadioButton = React.memo(({ id, label, name }) => (
    <div className="flex items-center p-2 bg-white rounded-lg">
        <input type="radio" id={id} name={name} className="w-4 h-4 text-blue-600" />
        <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900">
            {label}
        </label>
    </div>
));

RadioButton.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

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

const Select = React.memo(({ id, options, ...props }) => (
    <select
        id={id}
        {...props}
    >
        {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
));

const PrinterSelection = () => {
    const printerOptions = [
        { value: "", label: "Chọn máy in" },
        { value: "printer1", label: "Máy in 1" },
        { value: "printer2", label: "Máy in 2" },
        { value: "printer3", label: "Máy in 3" },
        { value: "printer4", label: "Máy in 4" },
    ];

    const fileTypeOptions = [
        { value: "", label: "Chọn loại tệp" },
        { value: ".doc", label: ".doc" },
        { value: ".docx", label: ".docx" },
        { value: ".pdf", label: ".pdf" },
        { value: ".txt", label: ".txt" },
        { value: ".rtf", label: ".rtf" },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-24">
                <div>
                    <SectionTitle>CHỌN MÁY IN</SectionTitle>
                    <div className='flex gap-4'>
                        <Select id="printerId" options={printerOptions} className="flex-grow" />
                        <Button>Thêm máy in</Button>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <RadioButton id="active" label="Đang hoạt động" name="printerStatus" />
                        <RadioButton id="inactive" label="Dừng hoạt động" name="printerStatus" />
                    </div>
                    <SectionTitle>LOẠI TỆP ĐƯỢC TẢI LÊN</SectionTitle>
                    <div className="flex  items-center gap-4 mt-4 w-full">
                        <Select id="fileType" options={fileTypeOptions} className="flex-grow py-2 border rounded" />
                        <Button>Thêm loại tệp</Button>
                    </div>
                </div>
                <div>
                    <SectionTitle>NGÀY CUNG CẤP ĐỊNH KỲ</SectionTitle>
                    <InputField
                        id="supplyDate"
                        label="Ngày cung cấp"
                        type="date"
                        defaultValue="2018-10-12"
                    />
                    <SectionTitle>SỐ TRANG CUNG CẤP ĐỊNH KỲ</SectionTitle>
                    <InputField
                        id="periodicSupply"
                        type="number"
                        defaultValue="50"
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value) || 0);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PrinterSelection;