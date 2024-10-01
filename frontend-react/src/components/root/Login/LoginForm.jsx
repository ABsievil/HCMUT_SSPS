import React from 'react';

function LoginForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý logic đăng nhập ở đây
    console.log("Form submitted");
  };

  return (
    <form className="flex flex-col max-w-full w-[495px]" onSubmit={handleSubmit}>
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d7576939ba90f1483dc1b48490e69d0dc4888cc061d7e09535e09ea9924476c?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96" 
        alt="" 
        className="object-contain self-center max-w-full aspect-[0.99] w-[236px]" 
      />
      <h2 className="self-center mt-7 text-2xl text-black">Trang đăng nhập</h2>
      <div className="flex flex-wrap gap-6 pl-6 pr-8 py-6 mt-12 text-base font-medium whitespace-nowrap bg-white rounded-xl border border-black border-solid text-neutral-950 max-md:px-5 max-md:mt-10">
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0acec3f0c21c585b693aab238ddf1a6054cfa9ee7646ac7df643f1272897cf03?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96" 
          alt="" 
          className="object-contain shrink-0 aspect-[1.19] w-[38px]" 
        />
        <label htmlFor="emailInput" className="sr-only">Email/MSSV</label>
        <input 
          id="emailInput" 
          name="email" 
          type="text" 
          placeholder="Email/MSSV" 
          required 
          className="flex-auto rounded-md pl-4 py-3" 
        />
      </div>
      <div className="flex justify-between items-center px-6 py-6 mt-9 w-full text-base text-black bg-white rounded-xl border border-black border-solid max-md:px-5 max-md:max-w-full relative">
        <div className="flex gap-3">
          <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/26d9c5399a667e190537f967c908e5b53fea2716a5b94db02389112e242bc353?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96" 
            alt="" 
            className="object-contain shrink-0 aspect-[1.06] w-[37px]" 
          />
          <label htmlFor="passwordInput" className="my-auto"></label>
          <input 
            id="passwordInput" 
            name="password" 
            type="password" 
            placeholder="Mật khẩu" 
            required 
            className="flex-auto w-[375px] rounded-md pr-10 pl-4 py-3" 
          />
          <div className="absolute right-10 top-[40%] transform  cursor-pointer">
            <img 
              loading="lazy" 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/735a7a2e8eb7d2e9e0457ba4b35ee642beb50ac75cfee040d5ebe13cdc0e8746?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96" 
              alt="Show password" 
              className="object-contain aspect-[1.04] w-[23px]" 
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col pl-2.5 mt-12 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-10 w-full max-md:mr-2.5 max-md:max-w-full">
          <label className="flex flex-1 gap-3.5 text-base text-zinc-500">
            <input 
              type="checkbox" 
              className="w-4 h-4 bg-white rounded border-2 border-gray-500 border-solid" 
            />
            Remember Me
          </label>
          <a href="#" className="text-base text-blue-700">Forgot Password?</a>
        </div>
        <button 
          type="submit" 
          className="gap-2.5 self-stretch px-7 py-4 mt-8 text-sm leading-none text-center text-white bg-blue-700 rounded-md min-h-[47px] max-md:px-5"
        >
          Đăng nhập
        </button>
        <div className="flex gap-5 self-start mt-8 text-base">
          <p className="grow text-stone-950">Bạn chưa có tài khoản?</p>
          <a href="#" className="text-blue-700 underline">Tạo tài khoản</a>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
