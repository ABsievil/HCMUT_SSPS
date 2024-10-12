import { Routes, Route } from "react-router-dom";

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
import ManageSystem from './components/root/ManageSystem'


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

        <Route path="/account" element={<AccountInformation/>} />
        <Route path="/print" element={<PrintingSystem />} />
        <Route path="/buyPaper" element={<PrintingPage />} />
        <Route path="/printlog" element={<StudentPrintLog />} />
        <Route path="/adminprintlog" element={<AdminPrintLog />} />
        <Route path="/manage" element={<ManageSystem/>} />

      </Routes>
    </div>
  );
}
