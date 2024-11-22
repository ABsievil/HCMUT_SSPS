import React, { useState } from "react";
import InputField from "../fragments/InputField/InputField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../../store/userContext";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { username, role, userId, isLoggedIn } = useUser();

  const HandlePassword = (username, currentPassword, newPassword1, newPassword2) => {
    if (!currentPassword.trim() || !newPassword1.trim() || !newPassword2.trim()) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (newPassword1 !== newPassword2) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }
    const reqJson = {
      username: username,
      oldPassword: currentPassword,
      newPassword: newPassword1,
    };
    fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/changeStudentPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqJson),
      credentials: "include"
    }).then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          toast.success("Mật khẩu đã thay đổi thành công!");
        } else {
          toast.error("Mật khẩu hiện tại không chính xác.");
        }
      })
      .catch((error) => {
        toast.error("Đã xảy ra lỗi khi thay đổi mật khẩu.");
        console.error("Error:", error);
      });
  }

  return (
    <div className="w-3/5 mx-auto bg-white shadow-md rounded-lg p-10">
      <h2 className="text-2xl font-bold mb-4 justify-center flex">
        THAY ĐỔI MẬT KHẨU
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700">MẬT KHẨU HIỆN TẠI</label>
          <InputField
            id="currentPassword"
            name="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Mật khẩu hiện tại"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            showPasswordToggle
            showPassword={showCurrentPassword}
            onTogglePassword={() =>
              setShowCurrentPassword(!showCurrentPassword)
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">MẬT KHẨU MỚI</label>
          <InputField
            id="newPassword"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
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
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Nhập lại mật khẩu mới"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showPasswordToggle
            showPassword={showConfirmPassword}
            onTogglePassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => HandlePassword(
            username,
            currentPassword,
            newPassword,
            confirmPassword
          )}
          className="self-center px-12 py-4 text-base font-semibold text-white uppercase bg-blue-700 hover:bg-blue-800 rounded-xl max-md:w-full shadow-lg"
        >
          XÁC NHẬN
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;