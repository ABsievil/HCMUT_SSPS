import React from 'react';
import Layout from "./fragments/layout/Layout";
import PayLog from './PayLog/PayLogTable';

function PaymentLog() {
    return (
        <Layout>
            <PayLog />
        </Layout>
    );
}

export default PaymentLog;