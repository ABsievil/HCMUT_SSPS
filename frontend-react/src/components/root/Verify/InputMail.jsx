import React from 'react';
import { useNavigate } from 'react-router-dom'; // Nhập useNavigate
import InputField from '../fragments/InputField/InputField'; // Import the InputField component

function VerificationMail() {
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    
    console.log('Verification email form submitted with email:', email);
    
    // Điều hướng đến trang xác nhận mật khẩu mới
    navigate("/verify-newpass");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-0">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl md:h-[500px] mx-4 my-4">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-full">
          <img 
            src="src/images/background-newpass.jpg" // Thay thế với đường dẫn hình ảnh thực tế
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 h-full">
          {/* Top Navigation */}
          <div className="flex justify-between items-center mb-8">
            <a href="/login" className="text-blue-700 hover:underline text-lg font-bold">Trở về</a>
            <div className="flex flex-col items-end">
              <span className="text-black text-lg font-bold">Tạo mật khẩu mới</span>
              <span className="text-black text-lg">1/3</span>
            </div>
          </div>

          {/* Password Reset Form */}
          <h2 className="text-2xl font-semibold mb-4">Quên mật khẩu</h2>
          <p className="text-gray-700 mb-6">
            Nhập Email của bạn để gửi mã xác nhận thay đổi mật khẩu.
          </p>

          <form onSubmit={handleSubmit} className="mb-6">
            {/* Email Input using InputField */}
            <InputField
              id="emailInput"
              name="email" // Đảm bảo rằng tên là 'email' để dễ lấy giá trị
              type="email"
              placeholder="Email"
              required
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Envelope_font_awesome.svg/1024px-Envelope_font_awesome.svg.png" // Email icon
            />

            <button 
              type="submit" 
              className="w-full py-3 mt-6 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-300"
            >
              Tiếp tục
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerificationMail;
