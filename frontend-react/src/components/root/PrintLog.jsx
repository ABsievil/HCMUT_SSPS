import React from 'react';
import Layout from "./fragments/layout/Layout";
import PrintLogTable from './PrintLog/PrintLogTable';

function PrintLog() {
    return (
        <Layout>
            <PrintLogTable />
        </Layout>
    );
}

export default PrintLog;
