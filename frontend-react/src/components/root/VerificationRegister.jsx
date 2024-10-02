import React from 'react';

function VerificationRegister() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the OTP submission logic here
    console.log('OTP Submitted');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden" style={{ width: '900px', height: '600px' }}>
        {/* Left Image Section */}
        <div className="w-1/2 h-full">
          <img 
            src="src/images/background1.jpg" // Replace with your image source
            alt="Verification Background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-1/2 p-8 h-full">
          {/* Top Navigation */}
          <div className="flex justify-between items-center mb-8">
            <a href="/regis" className="text-blue-700 hover:underline text-lg">Trở về</a>
            <div className="flex flex-col items-center">
              <span className="text-black text-lg">Đăng ký</span>
              <span className="text-black text-lg">2/2</span>
            </div>
          </div>

          {/* Verification Form */}
          <h2 className="text-2xl font-semibold mb-4">Kiểm tra Mail của bạn</h2>
          <p className="text-gray-600 mb-6">
            Chúng tôi đã gửi một mã gồm 6 số đến <span className="font-medium">username@gmail.com</span>. Hãy nhập đúng mã vào ô bên dưới.
          </p>

          {/* OTP Input */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex justify-center gap-2 mb-4">
              {Array(6).fill(0).map((_, index) => (
                <input 
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              ))}
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-300"
            >
              Xác nhận
            </button>
          </form>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-gray-600">Bạn chưa nhận được mã? <a href="#" className="text-blue-700 hover:underline">Gửi lại mã</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationRegister;
