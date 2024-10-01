import React, { useState } from "react";
import HeaderMain from "./fragments/header/HeaderMain";
import Footer from "./fragments/footer/Footer";
import { FaUser, FaLock } from "react-icons/fa";
import "frontend-react/src/CSS/login.css";
import "frontend-react/src/index.css";
const LoginPage = () => {
  return (
    <>
      {/*HeaderMain */}
      <HeaderMain />
      <div className="login-container">
        <div className="form-box-login">
          <form action="">
            <img
              src="src/images/hcmut-official-logo-1.png"
              alt="Logo"
              className="logo"
            />
            <h1>Trang đăng nhập</h1>
            <div className="input-box">
              <input type="text" placeholder="Email/MSSV" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Mật khẩu" required />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot-password">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="summit">Đăng nhập</button>
            <div className="register-link">
              <p>
                Bạn chưa có tài khoản? <a href="regis">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/*Footer */}
      <Footer />
    </>
  );
};

export default LoginPage;
