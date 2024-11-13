import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
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
import StudentPrintLog from "./components/root/StudentPrintLog";
import AdminPrintLog from './components/root/AdminPrintLog';
import AccountInformation from "./components/root/AccountInformation";
import ProtectedRoute from "./components/root/Login/ProtectedRouter";
import ManageSystem from './components/root/ManageSystem'
import Report from './components/root/Report'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/regis" element={<RegisterPage />} />
        <Route path="/verify" element={<Verification />} />

        <Route path="/verifymail" element={<InputMail />} />
        <Route path="/verify-newpass" element={<Verification isNewPass={true} />} />
        <Route path="/newpassword" element={<CreateNewPassword />} />

        {/* Protected Route */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountInformation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/print"
          element={
            <ProtectedRoute>
              <PrintingSystem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyPaper"
          element={
            <ProtectedRoute>
              <PrintingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/printlog"
          element={
            <ProtectedRoute>
              <StudentPrintLog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminprintlog"
          element={
            <ProtectedRoute>
              <AdminPrintLog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <ManageSystem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
