import React from 'react';

function CheckCodeFromMail() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('OTP Submitted');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden" style={{ width: '900px', height: '600px' }}>
        {/* Left Image Section */}
        <div className="w-1/2 h-full">
          <img 
            src="src/images/background2.jpeg"
            alt="Verification Background"
            className="object-cover w-full h-full border border-blue-500"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-1/2 p-8 h-full">
          {/* Top Navigation */}
          <div className="flex justify-between items-center mb-4">
            <a href="/regis" className="text-blue-700 hover:underline text-lg">Trở về</a>
            <div className="flex flex-col items-center">
              <span className="text-black text-lg">Tạo mật khẩu mới</span>
              <span className="text-black text-lg">2/3</span>
            </div>
          </div>

          {/* Verification Form */}
          <h2 className="text-2xl font-semibold mb-4">Kiểm tra Mail</h2>
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
              Tiếp tục
            </button>
          </form>

          {/* Resend Code */}
          <div className="text-center mt-4">
            <p className="text-gray-600 mb-2">Không nhận được mã? Kiểm tra thư trong mục spam hoặc</p>
            <a href="#" className="text-blue-700 hover:underline">Thử một email khác</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckCodeFromMail;
