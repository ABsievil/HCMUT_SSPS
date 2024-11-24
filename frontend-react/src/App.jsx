import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import HomePage from "../src/components/root/HomePage";
import PrintingSystem from "../src/components/root/PrintPage";
import PrintingPage from "../src/components/root/BuyPaper";
import LoginPage from "../src/components/root/LoginPage";
import RegisterPage from "../src/components/root/RegisterPage";
import Verification from "./components/root/Verify/Verification";
import InputMail from "./components/root/Verify/InputMail";
import CreateNewPassword from "./components/root/CreateNewPassword";
import AccountInformation from "./components/root/AccountInformation";
import ProtectedRoute from "./components/root/Login/ProtectedRouter";
import ManageSystem from "./components/root/ManageSystem";
import Report from "./components/root/Report";
import ChangePassword from "./components/root/ChangePassword";
import PrintLog from "./components/root/PrintLog";
import { useDispatch } from "react-redux";
import { fetchPrintersabc } from "./store/PrintersabcSlice";
import React, {useEffect} from "react";
import PaymentLog from "./components/root/PaymentLog";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPrintersabc()); // printerList is used alot throughout the app, fetching it here maybe effective
  }, []);

  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/regis" element={<RegisterPage />} />
          <Route path="/verifymail" element={<InputMail />} />
          <Route
            path="/verify-newpass"
            element={<Verification isNewPass={true} />}
          />
          <Route path="/verify" element={<Verification />} />
          <Route path="/newpassword" element={<CreateNewPassword />} />
        </Route>

        <Route>
          <Route path="/account" element={<AccountInformation />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/print" element={<PrintingSystem />} />
          <Route path="/buyPaper" element={<PrintingPage />} />
          <Route path="/printlog" element={<PrintLog />} />
          <Route path="/payment" element={<PaymentLog />} />
        </Route>

        <Route>
          <Route path="/account" element={<AccountInformation />} />
          <Route path="/printlog" element={<PrintLog />} />
          <Route path="/payment" element={<PaymentLog />} />
          <Route path="/manage" element={<ManageSystem />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} />
    </Router>
  );
}
