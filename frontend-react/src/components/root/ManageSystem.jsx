import React from 'react';
import Layout from './fragments/layout/Layout';
import SystemInfo from './ManageSys/SystemInfo';

function SystemInfoPage() {
    return (
        <Layout>
            <div className='my-auto'>
                <SystemInfo />
            </div>
        </Layout>
    );
}

export default SystemInfoPage;