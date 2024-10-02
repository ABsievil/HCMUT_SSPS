import React, { useState } from 'react';

function RegisForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic here
    console.log('Form submitted');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form className="flex flex-col max-w-full w-[495px]" onSubmit={handleSubmit}>
      <a href="#" className="text-left font-bold text-blue-700 hover:underline text-lg">Trở về</a>
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d7576939ba90f1483dc1b48490e69d0dc4888cc061d7e09535e09ea9924476c?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96" 
        alt="" 
        className="object-contain self-center max-w-full aspect-[0.99] w-[236px]" 
      />
      <h2 className="self-center mt-7 text-2xl text-black">Trang đăng ký</h2>
      <p className="self-center mt-2 text-base text-black">Vui lòng nhập đầy đủ thông tin</p>

      {/* Student ID Input */}
      <div className="flex items-center px-4 py-3 mt-6 text-base font-medium bg-white rounded-xl border border-gray-300">
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0acec3f0c21c585b693aab238ddf1a6054cfa9ee7646ac7df643f1272897cf03?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96" 
          alt="icon" 
          className="object-contain shrink-0 w-6 h-6 mr-3" 
        />
        <input 
          id="studentIdInput" 
          name="studentId" 
          type="text" 
          placeholder="Mã sinh viên" 
          required 
          className="flex-auto rounded-md pl-2 py-2"
        />
      </div>

      {/* Email Input */}
      <div className="flex items-center px-4 py-3 mt-4 text-base font-medium bg-white rounded-xl border border-gray-300">
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0acec3f0c21c585b693aab238ddf1a6054cfa9ee7646ac7df643f1272897cf03?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96" 
          alt="icon" 
          className="object-contain shrink-0 w-6 h-6 mr-3" 
        />
        <input 
          id="emailInput" 
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
          className="flex-auto rounded-md pl-2 py-2"
        />
      </div>

      {/* Password Input */}
      <div className="flex items-center px-4 py-3 mt-4 text-base font-medium bg-white rounded-xl border border-gray-300 relative">
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/26d9c5399a667e190537f967c908e5b53fea2716a5b94db02389112e242bc353?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96" 
          alt="icon" 
          className="object-contain shrink-0 w-6 h-6 mr-3" 
        />
        <input 
          id="passwordInput" 
          name="password" 
          type={showPassword ? 'text' : 'password'} 
          placeholder="Mật khẩu" 
          required 
          className="flex-auto rounded-md pl-2 py-2"
        />
        <div className="absolute right-7 top-[35%] transform  cursor-pointer">
            <img 
              loading="lazy" 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/735a7a2e8eb7d2e9e0457ba4b35ee642beb50ac75cfee040d5ebe13cdc0e8746?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96" 
              alt="Show password" 
              className="object-contain aspect-[1.04] w-[23px]" 
            />
          </div>
      </div>

      {/* Confirm Password Input */}
      <div className="flex items-center px-4 py-3 mt-4 text-base font-medium bg-white rounded-xl border border-gray-300 relative">
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/26d9c5399a667e190537f967c908e5b53fea2716a5b94db02389112e242bc353?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96" 
          alt="icon" 
          className="object-contain shrink-0 w-6 h-6 mr-3" 
        />
        <input 
          id="confirmPasswordInput" 
          name="confirmPassword" 
          type={showConfirmPassword ? 'text' : 'password'} 
          placeholder="Nhập lại mật khẩu" 
          required 
          className="flex-auto w-[375px] rounded-md pr-10 pl-2 py-2"
        />
        <div className="absolute right-7 top-[35%] transform  cursor-pointer">
            <img 
              loading="lazy" 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/735a7a2e8eb7d2e9e0457ba4b35ee642beb50ac75cfee040d5ebe13cdc0e8746?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96" 
              alt="Show password" 
              className="object-contain aspect-[1.04] w-[23px]" 
            />
          </div>
      </div>

      <button 
        type="submit" 
        className="mt-8 py-4 text-white bg-blue-700 rounded-md"
      >
        Tiếp tục
      </button>

      <p className="self-center mt-4 text-base">
        Bạn đã có tài khoản? <a href="#" className="text-blue-700 underline font-bold">Login</a>
      </p>
    </form>
  );
}

export default RegisForm;
