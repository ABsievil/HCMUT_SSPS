import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, FileText, Printer, Download } from 'lucide-react';
import HeaderMain from './fragments/header/HeaderMain';
import Footer from './fragments/footer/Footer';
import Sidebar from "./fragments/slidebar/Sidebar";

const YEARS = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' }
];

// Các hằng số cho các tab
const TABS = {
    MONTHLY: 'monthly',
    YEARLY: 'yearly'
};

// Các component riêng biệt để tổ chức mã tốt hơn và tăng hiệu suất
const ReportCard = ({ title, children, onDownload }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <Download 
                    className="h-5 w-5 text-gray-500 cursor-pointer hover:text-blue-500 transition-colors" 
                    onClick={onDownload}
                />
            </div>
            {children}
        </div>
    </div>
);

const TabButton = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`py-4 px-2 -mb-px font-medium text-sm ${
            isActive
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
        }`}
    >
        {children}
    </button>
);

const MetricRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-gray-400" />
        <span className="text-gray-600">
            {label}: <span className="font-medium text-gray-800">{value}</span>
        </span>
    </div>
);

const Report = () => {
    const [activeTab, setActiveTab] = useState(TABS.MONTHLY);
    const [selectedYear, setSelectedYear] = useState(YEARS[0].value);

    // Dữ liệu memoized
    const monthlyReports = useMemo(() => [
        { id: 1, month: 'Tháng 1 2024', totalPrints: 15234, users: 45, date: '2024-01-31' },
        { id: 2, month: 'Tháng 2 2024', totalPrints: 12456, users: 42, date: '2024-02-29' },
        { id: 3, month: 'Tháng 3 2024', totalPrints: 14789, users: 48, date: '2024-03-31' },
    ], []);

    const yearlyReports = useMemo(() => [
        { id: 1, year: '2024', totalPrints: 156234, users: 156, averagePerMonth: 13019 },
        { id: 2, year: '2023', totalPrints: 145678, users: 142, averagePerMonth: 12139 },
    ], []);

    // Callback memoized
    const handleYearChange = useCallback((e) => {
        setSelectedYear(e.target.value);
    }, []);

    const handleDownload = useCallback((reportId, type) => {
        console.log(`Đang tải xuống báo cáo ${type} ${reportId}`);
        // Implement logic tải xuống tại đây
    }, []);

    // Các báo cáo đã lọc theo năm
    const filteredMonthlyReports = useMemo(() => 
        monthlyReports.filter(report => report.month.includes(selectedYear)),
    [monthlyReports, selectedYear]);

    const filteredYearlyReports = useMemo(() => 
        yearlyReports.filter(report => report.year === selectedYear),
    [yearlyReports, selectedYear]);

    return (
        <div className="min-h-screen flex flex-col">
            <HeaderMain />
            
            <div className="flex flex-1">
                <Sidebar />
                
                <main className="flex-1 bg-gray-50">
                    <div className="p-8">
                        {/* Tiêu đề trang */}
                        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-800">Báo cáo hệ thống</h1>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-gray-500" />
                                    <select
                                        value={selectedYear}
                                        onChange={handleYearChange}
                                        className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    >
                                        {YEARS.map(({ value, label }) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Các tab */}
                        <div className="bg-white rounded-lg shadow-sm mb-6">
                            <div className="border-b border-gray-200">
                                <div className="flex space-x-8 px-6">
                                    <TabButton 
                                        isActive={activeTab === TABS.MONTHLY}
                                        onClick={() => setActiveTab(TABS.MONTHLY)}
                                    >
                                        Báo cáo hàng tháng
                                    </TabButton>
                                    <TabButton 
                                        isActive={activeTab === TABS.YEARLY}
                                        onClick={() => setActiveTab(TABS.YEARLY)}
                                    >
                                        Báo cáo của năm
                                    </TabButton>
                                </div>
                            </div>
                        </div>

                        {/* Các thẻ báo cáo */}
                        <div className="space-y-6">
                            {activeTab === TABS.MONTHLY && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredMonthlyReports.map((report) => (
                                        <ReportCard 
                                            key={report.id}
                                            title={report.month}
                                            onDownload={() => handleDownload(report.id, 'monthly')}
                                        >
                                            <div className="space-y-4">
                                                <MetricRow 
                                                    icon={Printer}
                                                    label="Tổng số in"
                                                    value={report.totalPrints.toLocaleString()}
                                                />
                                                <MetricRow 
                                                    icon={FileText}
                                                    label="Người dùng hoạt động"
                                                    value={report.users}
                                                />
                                                <div className="text-sm text-gray-500 pt-2 border-t">
                                                    Được tạo vào: {report.date}
                                                </div>
                                            </div>
                                        </ReportCard>
                                    ))}
                                </div>
                            )}

                            {activeTab === TABS.YEARLY && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredYearlyReports.map((report) => (
                                        <ReportCard 
                                            key={report.id}
                                            title={`Năm ${report.year}`}
                                            onDownload={() => handleDownload(report.id, 'yearly')}
                                        >
                                            <div className="space-y-4">
                                                <MetricRow 
                                                    icon={Printer}
                                                    label="Tổng số in"
                                                    value={report.totalPrints.toLocaleString()}
                                                />
                                                <MetricRow 
                                                    icon={FileText}
                                                    label="Tổng người dùng"
                                                    value={report.users}
                                                />
                                                <div className="text-sm text-gray-600 pt-2 border-t">
                                                    Trung bình hàng tháng: <span className="font-medium text-gray-800">
                                                        {report.averagePerMonth.toLocaleString()}
                                                    </span> bản in
                                                </div>
                                            </div>
                                        </ReportCard>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            
            <Footer />
        </div>
    );
};

export default Report;
