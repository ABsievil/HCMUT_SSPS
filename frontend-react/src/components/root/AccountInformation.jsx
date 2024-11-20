import React from "react";
import Layout from "./fragments/layout/Layout";
import PersonalInfoForm from "./AccountInformation/PersonalInfoForm";
import AdminInforForm from "./AccountInformation/AdminInforForm";
import { useUser } from '../../store/userContext';
function AccountInformation() {
  const { username, role, userId, isLoggedIn } = useUser();
  return (
    <Layout>
      <div className="my-auto">
        {role === "ADMIN" ? <AdminInforForm /> : <PersonalInfoForm />}
      </div>
    </Layout>
  );
}

export default AccountInformation;
