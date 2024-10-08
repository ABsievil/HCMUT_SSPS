import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import InputField from '../fragments/InputField/InputField'; // Import InputField

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the saved user from localStorage when the component mounts
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const { email: savedEmail, password: savedPassword } = JSON.parse(savedUser);
      if (savedEmail && savedPassword !== "") {
        setEmail(savedEmail); 
        // Automatically navigate to "/print" if there is a saved email
        navigate("/print");
      }
    }
  }, [navigate]); // Add navigate to the dependency array

  const handleSubmit = (event) => {
    event.preventDefault();

    // Save email and password to localStorage if "Remember Me" is checked
    const rememberMe = event.target.rememberMe.checked;
    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("user");
    }
    navigate("/print");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="flex flex-col max-w-full w-[400px]" onSubmit={handleSubmit}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d7576939ba90f1483dc1b48490e69d0dc4888cc061d7e09535e09ea9924476c?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
        alt="Logo"
        className="object-contain self-center max-w-full aspect-[0.99] w-[140px]"
      />
      <h2 className="self-center my-5 text-xl text-black">Trang đăng nhập</h2>

      {/* Email InputField */}
      <InputField
        id="emailInput"
        name="email"
        type="text"
        placeholder="Email/MSSV"
        required
        value={email} // Bind the input to the email state
        onChange={(e) => setEmail(e.target.value)} // Update email state
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/0acec3f0c21c585b693aab238ddf1a6054cfa9ee7646ac7df643f1272897cf03?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
      />

      {/* Password InputField */}
      <InputField
        id="passwordInput"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Mật khẩu"
        required
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/26d9c5399a667e190537f967c908e5b53fea2716a5b94db02389112e242bc353?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
        showPasswordToggle
        showPassword={showPassword}
        onTogglePassword={togglePasswordVisibility}
      />

      <div className="flex flex-col pl-2.5 mt-6 w-full">
        <div className="flex gap-6 w-full">
          <label className="flex flex-1 gap-2 text-sm text-zinc-500">
            <input
              type="checkbox"
              name="rememberMe"
              className="w-3 bg-white rounded border-2 border-gray-500"
            />
            Nhớ đăng nhập
          </label>
          <a href="/verifymail" className="text-sm text-blue-700 font-bold">
            Quên mật khẩu?
          </a>
        </div>
        <button
          type="submit"
          className="self-stretch w-full px-5 py-3 mt-6 text-sm text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors duration-300"
        >
          Đăng nhập
        </button>
        <div className="flex gap-3 self-start mt-6 text-sm">
          <p className="grow text-stone-950">Bạn chưa có tài khoản?</p>
          <a href="/regis" className="text-blue-700 underline font-bold">
            Tạo tài khoản
          </a>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
