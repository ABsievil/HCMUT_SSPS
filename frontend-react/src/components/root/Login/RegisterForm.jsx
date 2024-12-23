import React, { useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import InputField from '../fragments/InputField/InputField';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { saveRegisterInfor, sendEmail } from '../../../store/authSlice';

function RegisForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Xác nhận mật khẩu không trùng khớp");
      return;
    }
    const uname = email.split('@')[0];
    const studentDTO = {
      username: uname,
      password: password,
      last_name: '',
      middle_name: '',
      first_name: '',
      email: email,
      date_of_birth: '',
      phone_number: '',
      role: 'USER',
      student_id: studentId,
      school_year: 1,
      faculty: '',
      page_remain: 90
    };
    dispatch(saveRegisterInfor(studentDTO));
    dispatch(sendEmail(email));
    navigate("/verify");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form className="flex flex-col max-w-full p-5 px-10 bg-white shadow-md rounded-md w-[450px] md:w-[500px]" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-2">
        <div className='flex justify-center items-center'>
          <IoMdArrowRoundBack size={20} color='blue' />
          <a href="/login" className="text-left text-blue-700 hover:underline text-lg font-bold">Trở về</a>
        </div>
        <div className="flex flex-col items-end mt-4">
          <span className="text-black text-lg sm:text-xl font-bold">Đăng ký</span>
          <span className="text-black text-sm sm:text-lg">1/2</span>
        </div>
      </div>

      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d7576939ba90f1483dc1b48490e69d0dc4888cc061d7e09535e09ea9924476c?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
        alt="Logo"
        className="object-contain self-center max-w-[90px] sm:max-w-[120px] aspect-[0.99] w-full"
      />
      <h2 className="self-center mt-7 text-2xl text-black">Trang đăng ký</h2>
      <p className="self-center my-2 text-base sm:text-lg text-black">Vui lòng nhập đầy đủ thông tin</p>

      {/* Student ID Input */}
      <InputField
        id="studentIdInput"
        name="studentId"
        type="Text"
        placeholder="Mã sinh viên"
        required
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/0acec3f0c21c585b693aab238ddf1a6054cfa9ee7646ac7df643f1272897cf03?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
      />

      {/* Email Input */}
      <InputField
        id="emailInput"
        name="email"
        type="email"
        placeholder="Email"
        required
        value={email} // Bind the input to the email state
        onChange={(e) => setEmail(e.target.value)} // Update email state
        icon="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Envelope_font_awesome.svg/1024px-Envelope_font_awesome.svg.png"
      />

      <InputField
        id="passwordInput"
        name="password"
        type="password"
        placeholder="Mật khẩu"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/26d9c5399a667e190537f967c908e5b53fea2716a5b94db02389112e242bc353?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
        showPasswordToggle
        showPassword={showPassword}
        onTogglePassword={togglePasswordVisibility}
      />

      <InputField
        id="confirmPasswordInput"
        name="confirmPassword"
        type="password"
        placeholder="Nhập lại mật khẩu"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/26d9c5399a667e190537f967c908e5b53fea2716a5b94db02389112e242bc353?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
        showPasswordToggle
        showPassword={showConfirmPassword}
        onTogglePassword={toggleConfirmPasswordVisibility}
      />

      <button
        type="submit"
        className="mt-8 py-4 text-white bg-blue-700 rounded-md hover:bg-blue-800 text-lg sm:text-xl"
      >
        Tiếp tục
      </button>

      <p className="self-center mt-4 text-base sm:text-lg">
        Bạn đã có tài khoản? <a href="/login" className="text-blue-700 underline font-bold">Đăng nhập</a>
      </p>
    </form>
  );
}

export default RegisForm;
