import React from 'react';
import Layout from "./fragments/layout/Layout";
import PaymentLogTable from './PayLog/PaymentLogTable';

function PaymentLog() {
    return (
        <Layout>
            <PaymentLogTable />
        </Layout>
    );
}

export default PaymentLog;
