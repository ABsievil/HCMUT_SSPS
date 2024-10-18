import React from 'react';
import Layout from "./fragments/layout/Layout";
import Table from './PrintLog/PrintLogTable';

function AdminPrintLog() {
    return (
        <Layout>
            <Table type="student-admin" />
            <Table type="admin" />
        </Layout>
    );
}

export default AdminPrintLog;
