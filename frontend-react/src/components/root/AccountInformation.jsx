import React from 'react'
import Layout from "./fragments/layout/Layout";
import PersonalInfoForm from './AccountInformation/PersonalInfoForm'
import ChangePassword from './AccountInformation/ChangePassword';

function AccountInformation() {
  return (
    <Layout>
      <div className='flex flex-col gap-4 my-auto'>
        <PersonalInfoForm />
        <ChangePassword />
      </div>
    </Layout>
  )
}

export default AccountInformation