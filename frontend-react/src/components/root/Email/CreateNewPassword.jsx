import React from 'react';

function CreateNewPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Password Reset Submitted');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden" style={{ width: '900px', height: '600px' }}>
        {/* Left Image Section */}
        <div className="w-1/2 h-full">
          <img 
            src="src/images/background2.jpeg"
            alt="Background"
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
              <span className="text-black text-lg">3/3</span>
            </div>
          </div>

          {/* Reset Password Form */}
          <h2 className="text-2xl font-semibold mb-4">Tạo mật khẩu mới</h2>
          <p className="text-gray-600 mb-6">Nhập mật khẩu mới cho tài khoản của bạn</p>

          {/* Password Input */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Mật khẩu mới</label>
              <div className="flex items-center rounded-md border border-gray-300">
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/26d9c5399a667e190537f967c908e5b53fea2716a5b94db02389112e242bc353?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96" 
                  alt="Icon" 
                  className="w-6 h-6 text-gray-700 mr-2"
                />
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border-l border-gray-300 focus:outline-none focus:border-blue-500 rounded-md"
                  required 
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Nhập lại mật khẩu</label>
              <div className="flex items-center rounded-md border border-gray-300">
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/26d9c5399a667e190537f967c908e5b53fea2716a5b94db02389112e242bc353?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
                  alt="Icon" 
                  className="w-6 h-6 text-gray-700 mr-2"
                />
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border-l border-gray-300 focus:outline-none focus:border-blue-500 rounded-md"
                  required 
                />
              </div>
            </div>

            {/* Password Criteria */}
            <ul className="text-gray-600 mb-4 space-y-1">
              <li>✔️ Mật khẩu phải từ 8 đến 32 kí tự</li>
              <li>✔️ Phải chứa tối thiểu một ký tự in hoa</li>
              <li>✔️ Phải chứa tối thiểu một số</li>
              <li>✔️ Phải chứa tối thiểu một ký tự đặc biệt</li>
            </ul>

            <button 
              type="submit" 
              className="w-full py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-300"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewPassword;
