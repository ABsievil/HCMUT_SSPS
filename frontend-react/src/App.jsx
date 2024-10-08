import { Routes, Route } from "react-router-dom";

// Components
import HomePage from "../src/components/root/HomePage";
import PrintingSystem from "../src/components/root/PrintPage";
import PrintingPage from "../src/components/root/BuyPaper";
import LoginPage from "../src/components/root/LoginPage";
import RegisterPage from "../src/components/root/RegisterPage";
import Verification from "./components/root/Verification";
import VerificationMail from "./components/root/Email/VerifycationMail";
import CreateNewPassword from "./components/root/Email/CreateNewPassword";
import StudentPrintLog from "./components/root/StudentPrintLog";
import AccountInformation from "./components/root/AccountInformation";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/regis" element={<RegisterPage />} />
        <Route path="/verify" element={<Verification />} />

        <Route path="/verifymail" element={<VerificationMail />} />
        <Route path="/verify-newpass" element={<Verification isNewPass={true} />} />
        <Route path="/newpassword" element={<CreateNewPassword />} />

        <Route path="/print" element={<PrintingSystem />} />
        <Route path="/buyPaper" element={<PrintingPage />} />
        <Route path="/printlog" element={<StudentPrintLog />} />
        <Route path="/account" element={<AccountInformation/>} />
      </Routes>
    </div>
  );
}
