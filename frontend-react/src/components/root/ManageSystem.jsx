import React from 'react';
import Layout from './fragments/layout/Layout';
import AddPrinter from './ManageSys/AddPrinter';
import ManageSemester from './ManageSys/ManageSemester';

function SystemInfoPage() {
    return (
        <Layout>
            <h1 className="text-center text-2xl font-bold my-8">
                Trang điều chỉnh in ấn cho sinh viên
            </h1>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-12">
                <AddPrinter />
                <ManageSemester />
            </div>
        </Layout>
    );
}

export default SystemInfoPage;
