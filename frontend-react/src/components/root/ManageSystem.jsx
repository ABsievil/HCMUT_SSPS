import React from 'react';
import Layout from './fragments/layout/Layout';
import AddPrinter from './ManageSys/AddPrinter';
import ManageFile from './ManageSys/ManageFile';

function SystemInfoPage() {
    return (
        <Layout>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 m-5 md:m-10">
                <AddPrinter />
                <ManageFile />
            </div>
        </Layout>
    );
}

export default SystemInfoPage;
