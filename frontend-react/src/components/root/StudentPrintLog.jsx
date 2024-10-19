import React from 'react';
import Layout from "./fragments/layout/Layout";
import Table from './PrintLog/PrintLogTable';

function StudentPrintLog()
{
    return(
        <Layout>
            <Table type="student"/>
        </Layout>
    )
}

export default StudentPrintLog;