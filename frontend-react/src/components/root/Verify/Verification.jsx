import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Nhập useNavigate

function Verification({ isNewPass = false, email = '' }) { // Nhận email từ prop
  const navigate = useNavigate(); // Khởi tạo navigate
  const [otp, setOtp] = useState(Array(6).fill('')); // Mảng lưu mã OTP

  const handleChange = (index, value) => {
    if (value.match(/^[0-9]$/) || value === '') { // Kiểm tra chỉ cho phép số từ 0-9
      const newOtp = [...otp];
      newOtp[index] = value; // Cập nhật mã OTP
      setOtp(newOtp);

      // Chuyển đến ô tiếp theo nếu nhập đúng
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const otpCode = otp.join('');
    console.log('OTP Submitted:', otpCode); // Xử lý OTP tại đây

    // Điều hướng đến trang mới sau khi xác nhận
    if (isNewPass) {
      navigate("/newpassword");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-0">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl md:h-[500px] mx-4 my-4">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-full">
          <img 
            src={isNewPass ? "src/images/background-newpass.jpg" : "src/images/background-verify.jpg"} // Thay thế với đường dẫn hình ảnh thực tế
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 h-full">
          {/* Top Navigation */}
          <div className="flex justify-between items-center mb-8">
            <a href={isNewPass ? "/verifymail" : "/regis"} className="text-blue-700 hover:underline text-lg font-bold">Trở về</a>
            <div className="flex flex-col items-end">
              <span className="text-black text-lg font-bold">{isNewPass ? "Tạo mật khẩu mới" : "Đăng ký"}</span>
              <span className="text-black text-lg">{isNewPass ? "2/3" : "2/2"}</span>
            </div>
          </div>

          {/* Verification Form */}
          <h2 className="text-2xl font-semibold mb-4">Kiểm tra Mail của bạn</h2>
          <p className="text-gray-600 mb-6">
            Chúng tôi đã gửi một mã gồm 6 số đến <span className="font-medium text-blue-700">{email}</span>. Hãy nhập đúng mã vào ô bên dưới.
          </p>

          {/* OTP Input */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={value}
                  maxLength="1"
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-12 h-12 font-bold text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              ))}
            </div>
            {/* Căn giữa nút xác nhận */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-[80%] md:w-full py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-300"
              >
                Xác nhận
              </button>
            </div>
          </form>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-gray-600">Bạn chưa nhận được mã? <a href="#" className="text-blue-700 hover:underline font-bold">Gửi lại mã</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;
