// InputField.jsx
import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function InputField({ 
  id, 
  name, 
  type, 
  placeholder, 
  required, 
  icon, 
  showPasswordToggle, 
  showPassword, 
  onTogglePassword, 
  value,        // Nhận value từ props
  onChange      // Nhận onChange từ props
}) {
  return (
    <div className="flex items-center px-4 py-2 mt-4 text-base font-medium bg-white rounded-xl border border-gray-300 relative">
      {icon && (
        <img
          loading="lazy"
          src={icon}
          alt="icon"
          className="object-contain shrink-0 w-6 h-6 mr-6"
        />
      )}
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : type} // Sử dụng showPassword để xác định loại
        placeholder={placeholder}
        required={required}
        value={value} // Bind value
        onChange={onChange} // Bind onChange
        className="flex-auto rounded-md pl-2 py-1 outline-none"
      />
      {showPasswordToggle && (
        <div className="absolute right-7 top-[35%] cursor-pointer" onClick={onTogglePassword}>
          {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
        </div>
      )}
    </div>
  );
}

export default InputField;
