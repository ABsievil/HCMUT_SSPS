import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "frontend-react/src/CSS/login.css";
import "frontend-react/src/index.css";
import HeaderMain from "../fragments/header/HeaderMain";
import Footer from "../fragments/footer/Footer";
const RegisterPage = () => {
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
            <h1>Trang đăng ký</h1>
            <div>
              <h2>Vui lòng nhập đầy đủ thông tin</h2>
            </div>
            <div className="input-box">
              <input type="text" placeholder="Mã số sinh viên" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Email" required />
              <MdEmail className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Mật khẩu" required />
              <FaLock className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Nhập lại mật khẩu" required />
              <FaLock className="icon" />
            </div>
            <button type="summit">Tiếp tục</button>
            <div className="register-link">
              <p>
                Bạn đã có tài khoản? <a href="regis">Login</a>
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

export default RegisterPage;
