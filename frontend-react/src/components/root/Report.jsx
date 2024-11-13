import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, FileText, Printer, Download } from 'lucide-react';
import Layout from "./fragments/layout/Layout";
import pdfMake from 'pdfmake/build/pdfmake';

// Register the 'Times-Roman' font
pdfMake.addFonts({
    'Times-Roman': {
        normal: 'Times-Roman',
        italics: 'Times-Roman-Italic',
        bolditalics: 'Times-Roman-BoldItalic'
    }
});

const YEARS = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' }
];

const TABS = {
    MONTHLY: 'monthly',
    YEARLY: 'yearly'
};

const generateReportPDF = (report, type) => {
    // Title based on the report type (monthly or yearly)
    const title = type === 'monthly' 
        ? `Monthly Report: ${report.month}` 
        : `Yearly Report: ${report.year}`;

    const metrics = type === 'monthly' 
        ? [
            { label: 'Total Prints', value: report.totalPrints.toLocaleString() },
            { label: 'Active Users', value: report.users },
            { label: 'Creation Date', value: report.date }
          ] 
        : [
            { label: 'Total Prints', value: report.totalPrints.toLocaleString() },
            { label: 'Total Users', value: report.users },
            { label: 'Average Per Month', value: report.averagePerMonth.toLocaleString() }
          ];

    const docDefinition = {
        content: [
            // Title Section
            { 
                text: title, 
                fontSize: 22,  
                alignment: 'center', 
                margin: [0, 20, 0, 20] 
            },

            // Metrics Section
            ...metrics.map((metric) => ({
                text: `${metric.label}: ${metric.value}`,
                fontSize: 14,
                margin: [0, 5, 0, 5]
            })),

            // Divider line for separation
            { 
                canvas: [{ 
                    type: 'line', 
                    x1: 20, 
                    y1: 65 + metrics.length * 10, 
                    x2: 190, 
                    y2: 65 + metrics.length * 10, 
                    lineWidth: 0.5, 
                    lineColor: 'gray' 
                }] 
            },

            // Footer Section (with page number)
            { 
                text: 'Reporting System', 
                fontSize: 12, 
                alignment: 'left', 
                margin: [20, 10, 0, 0] 
            },
        ],
        pageSize: 'A4',
        pageMargins: [20, 60, 20, 60], // Adjust margins for better layout
        defaultStyle: {
            font: 'Times-Roman', // Ensure using registered font
            alignment: 'left'
        },
        // Page numbering setup
        pageBreakBefore: function(currentNode, followingNodes, type) {
            if (type === 'footer') {
                return false; // Prevent page break before the footer
            }
            return currentNode.pageNumber === 1; // Start the first page immediately
        }
    };

    // Generate and download PDF
    pdfMake.createPdf(docDefinition).download(`report-${type}-${report.month || report.year}.pdf`);
};

const ReportCard = ({ title, onDownload, children }) => (
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
        className={`py-4 px-2 -mb-px font-medium text-sm ${isActive
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

    // Monthly and yearly reports data, memoized
    const monthlyReports = useMemo(() => [
        { id: 1, month: 'Tháng 1 2024', totalPrints: 15234, users: 45, date: '2024-01-31' },
        { id: 2, month: 'Tháng 2 2024', totalPrints: 12456, users: 42, date: '2024-02-29' },
        { id: 3, month: 'Tháng 3 2024', totalPrints: 14789, users: 48, date: '2024-03-31' },
    ], []);

    const yearlyReports = useMemo(() => [
        { id: 1, year: '2024', totalPrints: 156234, users: 156, averagePerMonth: 13019 },
        { id: 2, year: '2023', totalPrints: 145678, users: 142, averagePerMonth: 12139 },
    ], []);

    // Memoize filtered reports
    const filteredMonthlyReports = useMemo(() =>
        monthlyReports.filter(report => report.month.includes(selectedYear)),
        [monthlyReports, selectedYear]);

    const filteredYearlyReports = useMemo(() =>
        yearlyReports.filter(report => report.year === selectedYear),
        [yearlyReports, selectedYear]);

    // Handle year change
    const handleYearChange = useCallback((e) => {
        setSelectedYear(e.target.value);
    }, []);

    // Handle download
    const handleDownload = useCallback((reportId, type) => {
        const report = type === 'monthly' ? filteredMonthlyReports.find(r => r.id === reportId) : filteredYearlyReports.find(r => r.id === reportId);
        if (report) {
            generateReportPDF(report, type);
        } else {
            alert("Report not found!");
        }
    }, [filteredMonthlyReports, filteredYearlyReports]);

    return (
        <Layout>
            <div className="flex flex-1">
                <main className="flex-1 bg-gray-50">
                    <div className="p-8">
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

                        {/* Tab buttons */}
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

                        {/* Reports */}
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
        </Layout>
    );
};

export default Report;
