import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './Login/InputField'; // Import the InputField component

function CreateNewPassword() {
  const navigate = useNavigate();

  const TickIcon = ({ color = "gray", size = "1.3em" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="inline-block"
    >
      <path d="M20.293 6.293a1 1 0 00-1.414 0L10 14.586 5.121 9.707a1 1 0 00-1.414 1.414l6.364 6.364a1 1 0 001.414 0l10-10a1 1 0 000-1.414z" />
    </svg>
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Password Reset Submitted');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-0">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl md:h-[600px] mx-4 my-4">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-full">
          <img 
            src="src/images/background-newpass.jpg" 
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <div className="flex justify-between items-center mb-4">
            <a href="/verify-newpass" className="text-blue-700 hover:underline text-lg font-bold">Trở về</a>
            <div className="flex flex-col items-end">
              <span className="text-black text-lg font-bold">Tạo mật khẩu mới</span>
              <span className="text-black text-lg">3/3</span>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Tạo mật khẩu mới</h2>
          <p className="text-gray-600 mb-6">Nhập mật khẩu mới cho tài khoản của bạn</p>

          {/* Password Input */}
          <form onSubmit={handleSubmit} className="mb-6">
            <InputField
              id="passwordInput"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu mới"
              required
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/26d9c5399a667e190537f967c908e5b53fea2716a5b94db02389112e242bc353?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <InputField
              id="confirmPasswordInput"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              required
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/26d9c5399a667e190537f967c908e5b53fea2716a5b94db02389112e242bc353?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
              showPasswordToggle
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            {/* Password Criteria */}
            <ul className="text-gray-600 my-4 space-y-1 list-none">
              <li><TickIcon color="blue" /> Mật khẩu phải từ 8 đến 32 kí tự</li>
              <li><TickIcon color="blue" /> Phải chứa tối thiểu một ký tự in hoa</li>
              <li><TickIcon color="gray" /> Phải chứa tối thiểu một số</li>
              <li><TickIcon color="gray" /> Phải chứa tối thiểu một ký tự đặc biệt</li>
            </ul>

            <button 
              type="submit" 
              className="w-full py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-300"
            >
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewPassword;
