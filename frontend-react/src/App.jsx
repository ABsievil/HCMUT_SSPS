import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
// import ProtectedRoute from "./components/root/Login/ProtectedRouter";
import ManageSystem from "./components/root/ManageSystem";
import Report from "./components/root/Report";
import ChangePassword from "./components/root/ChangePassword";
import PrintLog from "./components/root/PrintLog";
import { useDispatch } from "react-redux";
import { fetchPrintersabc } from "./store/PrintersabcSlice";
import React, { useEffect } from "react";
import PaymentLog from "./components/root/PaymentLog";
import NotFoundPage from "../src/components/root/404NotFoundPage";

// Authentication utility
const isTokenValid = () => {
  const token = localStorage.getItem('token');
  // Basic token validation - you might want to add more sophisticated checks
  return !!token; // Returns true if token exists
};

// Role-based authentication
const getUserRole = () => {
  return localStorage.getItem('userRole') || null;
};

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isAuthenticated = isTokenValid();
  const userRole = getUserRole();

  // If no token, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  else if (requiredRole && userRole !== requiredRole) {
    if ((userRole == "ADMIN") && (requiredRole == "USER")) { return children; }

    return <Navigate to="/notfound" replace />;
  }

  return children;
};

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPrintersabc()); // printerList is used alot throughout the app, fetching it here maybe effective
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/regis" element={<RegisterPage />} />
        <Route path="/notfound" element={<NotFoundPage />} />
        <Route path="/verifymail" element={<InputMail />} />
        <Route
          path="/verify-newpass"
          element={<Verification isNewPass={true} />}
        />
        <Route path="/verify" element={<Verification />} />
        <Route path="/newpassword" element={<CreateNewPassword />} />

        {/* USER ROLE Protected Routes */}
        <Route path="/account" element={<ProtectedRoute requiredRole="USER"> <AccountInformation /> </ProtectedRoute>} />
        <Route path="/change-password" element={<ProtectedRoute requiredRole="USER"> <ChangePassword /> </ProtectedRoute>} />
        <Route path="/print" element={<ProtectedRoute requiredRole="USER"> <PrintingSystem /> </ProtectedRoute>} />
        <Route path="/buyPaper" element={<ProtectedRoute requiredRole="USER"> <PrintingPage /> </ProtectedRoute>} />
        <Route path="/printlog" element={<ProtectedRoute requiredRole="USER"> <PrintLog /> </ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute requiredRole="USER"> <PaymentLog /> </ProtectedRoute>} />

        {/* ADMIN ROLE Protected Routes */}
        {/* <Route path="/account" element={<ProtectedRoute requiredRole="ADMIN"> <AccountInformation /> </ProtectedRoute>} /> */}
        {/* <Route path="/printlog" element={<ProtectedRoute requiredRole="ADMIN"> <PrintLog /> </ProtectedRoute>} /> */}
        {/* <Route path="/payment" element={<ProtectedRoute requiredRole="ADMIN"> <PaymentLog /> </ProtectedRoute>} /> */}
        <Route path="/report" element={<ProtectedRoute requiredRole="ADMIN"> <Report /> </ProtectedRoute>} />
        <Route path="/manage" element={<ProtectedRoute requiredRole="ADMIN"> <ManageSystem /> </ProtectedRoute>} />
        {/* <Route path="/change-password" element={<ProtectedRoute requiredRole="ADMIN"> <ChangePassword /> </ProtectedRoute>} /> */}

        {/* catch unknown url */}
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} />
    </Router>
  );
}
