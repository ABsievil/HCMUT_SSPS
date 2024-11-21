import React from 'react';
import Layout from "./fragments/layout/Layout";
import { useUser } from '../../store/userContext';
import StudentPrintLogTable from './PrintLog/StudentPrintLogTable';
import AdminPrintLogTable from './PrintLog/AdminPrintLogTable';

function PrintLog() {
    const { username, role, userId, isLoggedIn } = useUser();

    return (
        <Layout>
            {role === "ADMIN" ? <AdminPrintLogTable/> : <StudentPrintLogTable/>}
        </Layout>
    )
}

export default PrintLog;