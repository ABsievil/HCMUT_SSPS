import React from 'react';
import Layout from "./fragments/layout/Layout";
import Table from './PrintLog/PrintLogTable';
import { useUser } from '../../store/userContext';

function PrintLog() {
    const { username, role, userId, isLoggedIn } = useUser();

    return (
        <Layout>
            {role === "ADMIN" ?
                <Table type="admin" /> : <Table type="student" />}
        </Layout>
    )
}

export default PrintLog;