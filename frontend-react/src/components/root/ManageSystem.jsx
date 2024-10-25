import React from 'react';
import Layout from './fragments/layout/Layout';
import AddPrinter from './ManageSys/AddPrinter'
import ManageFile from './ManageSys/ManageFile'

function SystemInfoPage() {
    return (
        <Layout>
            <div className='flex flex-col gap-4 my-5'>
                <AddPrinter />
                <ManageFile />
            </div>
        </Layout>
    );
}

export default SystemInfoPage;