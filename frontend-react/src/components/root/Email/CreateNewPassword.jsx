import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import { useNavigate } from 'react-router-dom'; // Nhập useNavigate

function CreateNewPassword() {
  const navigate = useNavigate(); // Khởi tạo navigate

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

  const [showPassword, setShowPassword] = useState(false); // Trạng thái để hiển thị mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Trạng thái để hiển thị mật khẩu xác nhận

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Password Reset Submitted');
    // Điều hướng đến trang đăng nhập sau khi xử lý thành công
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-0">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl md:h-[600px] mx-4 my-4">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-full">
          <img 
            src="src/images/background-newpass.jpg" // Thay thế với đường dẫn hình ảnh thực tế
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8">
          {/* Top Navigation */}
          <div className="flex justify-between items-center mb-4">
            <a href="/verify-newpass" className="text-blue-700 hover:underline text-lg font-bold">Trở về</a>
            <div className="flex flex-col items-end">
              <span className="text-black text-lg font-bold">Tạo mật khẩu mới</span>
              <span className="text-black text-lg">3/3</span>
            </div>
          </div>

          {/* Reset Password Form */}
          <h2 className="text-2xl font-semibold mb-4">Tạo mật khẩu mới</h2>
          <p className="text-gray-600 mb-6">Nhập mật khẩu mới cho tài khoản của bạn</p>

          {/* Password Input */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-bold">Mật khẩu mới</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full px-4 py-2 pr-10 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-md" // Thêm pr-10 để tạo khoảng trống cho icon
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-2 top-[33%] transform -translate-y-1/2 border-none bg-transparent"
                >
                  {showPassword ? (
                    <AiOutlineEye className="w-5" /> // Mắt mở
                  ) : (
                    <AiOutlineEyeInvisible className="w-5" /> // Mắt đóng
                  )}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-bold">Nhập lại mật khẩu</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="w-full px-4 py-2 pr-10 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-md" // Thêm pr-10 để tạo khoảng trống cho icon
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  className="absolute right-2 top-[33%] transform -translate-y-1/2 border-none bg-transparent"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye className="w-5" /> // Mắt mở
                  ) : (
                    <AiOutlineEyeInvisible className="w-5" /> // Mắt đóng
                  )}
                </button>
              </div>
            </div>

            {/* Password Criteria */}
            <ul className="text-gray-600 mb-4 space-y-1 list-none">
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
