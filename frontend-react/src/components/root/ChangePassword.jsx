import React from 'react'
import Layout from "./fragments/layout/Layout";
import ChangePassword from './AccountInformation/ChangePassword';

function AccountInformation() {
    return (
        <Layout>
            <div className='my-auto'>
                <ChangePassword />
            </div>
        </Layout>
    )
}

export default AccountInformation