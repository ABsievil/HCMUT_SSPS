import React from 'react'
import Layout from "./BuyPaper/Layout";
import PersonalInfoForm from './AccountInformation/PersonalInfoForm'
import ChangePassword from './AccountInformation/ChangePassword';

function AccountInformation() {
  return (
    <Layout>
        <PersonalInfoForm/>
        <div className="m-2"></div>
        <ChangePassword/>
    </Layout>
  )
}

export default AccountInformation