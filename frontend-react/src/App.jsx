import { Routes, Route } from "react-router-dom";
import HomePage from "../src/components/root/HomePage";
import PrintingSystem from "../src/components/root/PrintPage";
import PrintingPage from "../src/components/root/BuyPaper";
import LoginPage from "../src/components/root/LoginPage";
import RegisterPage from "../src/components/root/RegisterPage";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/print" element={<PrintingSystem />} />
        <Route path="/buyPaper" element={<PrintingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/regis" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
