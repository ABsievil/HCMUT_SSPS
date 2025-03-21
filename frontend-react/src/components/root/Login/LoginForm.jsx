import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import InputField from '../fragments/InputField/InputField';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next'; // Thêm hook useTranslation

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation(); // Khởi tạo hàm t để dịch

  const handleSubmit = (event) => {
    event.preventDefault();

    const reqJson = {
      username: email,
      password: password,
    };

    fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqJson),
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "OK") {
          const decodedToken = jwtDecode(data.data);
          const role = decodedToken.role;

          localStorage.setItem('token', data.data);
          localStorage.setItem('userRole', role);
          window.location.href = '/account';
        } else if (data.status === "ERROR") {
          toast.error(t('login.errorLoginFailed')); // Sử dụng t để dịch thông báo lỗi
        }
      })
      .catch(error => {
        toast.error(t('login.errorLoginError')); // Sử dụng t để dịch thông báo lỗi
        console.error('Error:', error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      className="flex flex-col max-w-full mx-auto p-10 bg-white shadow-md rounded-md w-[450px] md:w-[500px]"
      onSubmit={handleSubmit}
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d7576939ba90f1483dc1b48490e69d0dc4888cc061d7e09535e09ea9924476c?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
        alt={t('login.logoAlt')} // Dịch thuộc tính alt nếu cần
        className="object-contain self-center w-[90px] sm:w-[120px] mb-4"
      />
      <h2 className="self-center text-lg sm:text-xl text-black mb-4">
        {t('login.heading')} {/* Dịch tiêu đề */}
      </h2>

      {/* Email InputField */}
      <InputField
        id="emailInput"
        name="email"
        type="text"
        placeholder={t('login.usernamePlaceholder')} // Dịch placeholder
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/0acec3f0c21c585b693aab238ddf1a6054cfa9ee7646ac7df643f1272897cf03?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
      />

      {/* Password InputField */}
      <InputField
        id="passwordInput"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder={t('login.passwordPlaceholder')} // Dịch placeholder
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/26d9c5399a667e190537f967c908e5b53fea2716a5b94db02389112e242bc353?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
        showPasswordToggle
        showPassword={showPassword}
        onTogglePassword={togglePasswordVisibility}
      />

      <div className="flex flex-col mt-6 w-full">
        <div className="flex justify-end text-sm mb-4">
          <a href="/verifymail" className="text-blue-700 font-bold">
            {t('login.forgotPassword')} {/* Dịch liên kết quên mật khẩu */}
          </a>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 text-sm sm:text-base text-white bg-blue-700 rounded-md hover:bg-blue-800 transition duration-300"
        >
          {t('login.loginButton')} {/* Dịch nút đăng nhập */}
        </button>
        <div className="flex flex-wrap gap-2 mt-4 text-sm">
          <p className="text-gray-700">{t('login.noAccountText')}</p> {/* Dịch văn bản */}
          <a href="/register" className="text-blue-700 font-bold underline">
            {t('login.createAccountLink')} {/* Dịch liên kết tạo tài khoản */}
          </a>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;