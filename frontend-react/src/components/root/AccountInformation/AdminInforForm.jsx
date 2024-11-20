import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAdminInfor } from "../../../store/adminInforSlice";

const AdminInforForm = () => {
  const dispatch = useDispatch();
  const { isLoading, adminInfor, error } = useSelector(
    (state) => state.adminInfor
  );

  useEffect(() => {
    dispatch(fetchAdminInfor());
  }, [dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    adminId: "1111111",
    email: "admin@hcmut.edu.vn",
    fullName: "Admin Name",
    phoneNumber: "0999999999",
    dateOfBirth: "2024-01-01",
  });
  useEffect(() => {
    if (adminInfor.data) {
      setFormData({
        email: adminInfor.data.email,
        fullName: adminInfor.data.last_name +' '+ adminInfor.data.middle_name +' '+ adminInfor.data.first_name,
        phoneNumber: adminInfor.data.phone_number,
        dateOfBirth: adminInfor.data.date_of_birth,
      });
    }
  }, [adminInfor.data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Here you would typically make an API call to update the information
    toast.success("Thông tin cập nhật thành công!");

    setIsEditing(false);
  };

  const renderField = (label, name, value, type = "text") => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">{label}</label>
        {isEditing &&
        !["remainingPages", "usedPages", "studentId", "email"].includes(
          name
        ) ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <div className="bg-gray-100 p-2 rounded">{value}</div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-10/12 mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">THÔNG TIN CÁ NHÂN</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <div className='flex gap-3'>
            CHỈNH SỬA
            <Pencil className="w-5 h-5 text-gray-600" />
          </div>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {renderField("EMAIL", "email", formData.email)}
        {renderField("HỌ VÀ TÊN", "fullName", formData.fullName)}
        {renderField("SỐ ĐIỆN THOẠI", "phoneNumber", formData.phoneNumber)}
        {renderField("NGÀY SINH", "dateOfBirth", formData.dateOfBirth, "date")}
      </div>

      {isEditing && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="px-12 py-4 text-base font-semibold text-white uppercase bg-blue-700 hover:bg-blue-800 rounded-xl shadow-lg transition-colors"
          >
            XÁC NHẬN
          </button>
        </div>
      )}
    </div>
  );
};
export default AdminInforForm;