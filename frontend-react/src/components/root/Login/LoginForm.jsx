import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (event) => {
    event.preventDefault();
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
        alt=""
        className="object-contain self-center max-w-full aspect-[0.99] w-[180px]"
      />
      <h2 className="self-center mt-5 text-xl text-black">Trang đăng nhập</h2>
      <div className="flex flex-wrap gap-4 pl-4 pr-6 py-4 mt-8 text-sm font-medium bg-white rounded-lg border border-black text-neutral-950">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0acec3f0c21c585b693aab238ddf1a6054cfa9ee7646ac7df643f1272897cf03?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
          alt="Icon"
          className="object-contain w-[30px]"
        />
        <label htmlFor="emailInput" className="sr-only">
          Email/MSSV
        </label>
        <input
          id="emailInput"
          name="email"
          type="text"
          placeholder="Email/MSSV"
          required
          className="flex-auto rounded-md pl-3 py-2"
        />
      </div>
      <div className="relative flex justify-between items-center px-4 py-4 mt-4 w-full text-sm text-black bg-white rounded-lg border border-black">
        <div className="flex gap-2 w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/26d9c5399a667e190537f967c908e5b53fea2716a5b94db02389112e242bc353?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
            alt="Password Icon"
            className="object-contain w-[30px]"
          />
          <label htmlFor="passwordInput" className="sr-only"></label>
          <input
            id="passwordInput"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            required
            className="relative flex-auto rounded-md pl-3 py-2 mx-2"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-8 top-[38%] cursor-pointer border-none bg-transparent"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col pl-2.5 mt-9 w-full">
        <div className="flex gap-6 w-full">
          <label className="flex flex-1 gap-2 text-sm text-zinc-500">
            <input
              type="checkbox"
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
          className="self-stretch w-full px-5 py-3 mt-6 text-sm text-center text-white bg-blue-700 rounded-md  hover:bg-blue-800 transition-colors duration-300"
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
