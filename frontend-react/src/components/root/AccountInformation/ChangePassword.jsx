import React, { useState } from 'react';
import InputField from '../fragments/InputField/InputField';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-10/12 mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 justify-center flex">THAY ĐỔI MẬT KHẨU</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">

        <div className="mb-4">
          <label className="block text-gray-700">MẬT KHẨU HIỆN TẠI</label>
          <InputField
            id="currentPassword"
            name="currentPassword"
            type="password"
            placeholder="Mật khẩu hiện tại"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            showPasswordToggle
            showPassword={showCurrentPassword}
            onTogglePassword={() => setShowCurrentPassword(!showCurrentPassword)}
          />
        </div>
        <div></div>

        <div className="mb-4">
          <label className="block text-gray-700">MẬT KHẨU MỚI</label>
          <InputField
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Mật khẩu mới"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            showPasswordToggle
            showPassword={showNewPassword}
            onTogglePassword={() => setShowNewPassword(!showNewPassword)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">NHẬP LẠI MẬT KHẨU MỚI</label>
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showPasswordToggle
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button className="w-1/3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          xác nhận
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
