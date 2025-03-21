import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { fetchPrintersabc } from "./store/PrintersabcSlice";

// Lazy load components
const HomePage = lazy(() => import("../src/components/root/HomePage"));
const PrintingSystem = lazy(() => import("../src/components/root/PrintPage"));
const PrintingPage = lazy(() => import("../src/components/root/BuyPaper"));
const LoginPage = lazy(() => import("../src/components/root/LoginPage"));
const RegisterPage = lazy(() => import("../src/components/root/RegisterPage"));
const Verification = lazy(() => import("./components/root/Verify/Verification"));
const InputMail = lazy(() => import("./components/root/Verify/InputMail"));
const CreateNewPassword = lazy(() => import("./components/root/CreateNewPassword"));
const AccountInformation = lazy(() => import("./components/root/AccountInformation"));
const ManageSystem = lazy(() => import("./components/root/ManageSystem"));
const Report = lazy(() => import("./components/root/Report"));
const ChangePassword = lazy(() => import("./components/root/ChangePassword"));
const PrintLog = lazy(() => import("./components/root/PrintLog"));
const PaymentLog = lazy(() => import("./components/root/PaymentLog"));
const NotFoundPage = lazy(() => import("../src/components/root/404NotFoundPage"));
const PaymentSuccess = lazy(() => import("./components/root/paymentSuccess"));

// Authentication utility
const isTokenValid = () => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if token exists
};

const getUserRole = () => {
  return localStorage.getItem("userRole") || null;
};

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isAuthenticated = isTokenValid();
  const userRole = getUserRole();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    if (userRole === "ADMIN" && requiredRole === "USER") {
      return children;
    }
    return <Navigate to="/notfound" replace />;
  }

  return children;
};

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPrintersabc());
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<div>Đang tải...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="/verifymail" element={<InputMail />} />
          <Route path="/verify-newpass" element={<Verification isNewPass={true} />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/newpassword" element={<CreateNewPassword />} />

          {/* USER ROLE Protected Routes */}
          <Route path="/account" element={<ProtectedRoute requiredRole="USER"><AccountInformation /></ProtectedRoute>} />
          <Route path="/change-password" element={<ProtectedRoute requiredRole="USER"><ChangePassword /></ProtectedRoute>} />
          <Route path="/print" element={<ProtectedRoute requiredRole="USER"><PrintingSystem /></ProtectedRoute>} />
          <Route path="/buyPaper" element={<ProtectedRoute requiredRole="USER"><PrintingPage /></ProtectedRoute>} />
          <Route path="/printlog" element={<ProtectedRoute requiredRole="USER"><PrintLog /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute requiredRole="USER"><PaymentLog /></ProtectedRoute>} />
          <Route path="/api/v1/payment/vn-pay-callback" element={<ProtectedRoute requiredRole="USER"><PaymentSuccess /></ProtectedRoute>} />

          {/* ADMIN ROLE Protected Routes */}
          <Route path="/report" element={<ProtectedRoute requiredRole="ADMIN"><Report /></ProtectedRoute>} />
          <Route path="/manage" element={<ProtectedRoute requiredRole="ADMIN"><ManageSystem /></ProtectedRoute>} />

          {/* Catch unknown URL */}
          <Route path="*" element={<Navigate to="/notfound" replace />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={1000} />
    </Router>
  );
}
