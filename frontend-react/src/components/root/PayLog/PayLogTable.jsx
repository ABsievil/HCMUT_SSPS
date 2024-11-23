import React from "react";
import { useUser } from "../../../store/userContext";
import AdminPaymentLogTable from "./AdminPayLogTable";
import StudentPaymentLogTable from "./StudentPayLogTable";

const PayLog = () => {
    const { role } = useUser();
    if (role === "ADMIN"){
        return <AdminPaymentLogTable />
    }
    else{
        return <StudentPaymentLogTable />
    }
}

export default PayLog;