import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"; // for dispatch, and for store selection
import { Pencil, X } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../../store/userContext'; // get user id
import { fetchPersonalInfor } from '../../../store/personalInforSlice'; // fetch infor by id


const PersonalInfoForm = () => {
  const { username, role, userId, isLoggedIn } = useUser();
  //TODO: we may want to distinguish dispatch logic between admin and student using 'role'
  //here just work for students, cuz admin doesnt have an ID

  const dispatch = useDispatch();
  const { isLoading, personalInfor, error } = useSelector(
    (state) => state.personalInfor
  );

  useEffect(() => {
    dispatch(fetchPersonalInfor(userId));
  }, [userId, dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ // sample data
    studentId: '2211445',
    email: 'name.lastname@hcmut.edu.vn',
    fullName: 'Nguyen Van A',
    phoneNumber: '0123456789',
    dateOfBirth: '1990-01-01',
    schoolYear: '3',
    faculty: 'Khoa Khoa học và Kỹ thuat Máy Tính',
    remainingPages: '100',
  });

  useEffect(() => {
    // Update formData only when personalInfor.data is available
    if (personalInfor.data) {
      setFormData({
        studentId: personalInfor.data.student_id,
        email: personalInfor.data.email,
        fullName: personalInfor.data.last_name + ' ' + personalInfor.data.middle_name + ' ' + personalInfor.data.first_name,
        phoneNumber: personalInfor.data.phone_number,
        dateOfBirth: personalInfor.data.date_of_birth,
        schoolYear: personalInfor.data.school_year,
        faculty: personalInfor.data.faculty,
        remainingPages: personalInfor.data.page_remain,
      });
    }
  }, [personalInfor.data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        {isEditing && !['remainingPages', 'usedPages', 'studentId', 'email'].includes(name) ? (
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
          <div className="flex gap-3">
            {isEditing ? (
              <>
                HỦY THAO TÁC
                <X className="w-5 h-5 text-gray-600" />
              </>
            ) : (
              <>
                CHỈNH SỬA
                <Pencil className="w-5 h-5 text-gray-600" />
              </>
            )}
          </div>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {renderField("MÃ SỐ SINH VIÊN", "studentId", formData.studentId)}
        {renderField("EMAIL", "email", formData.email)}
        {renderField("HỌ VÀ TÊN", "fullName", formData.fullName)}
        {renderField("SỐ ĐIỆN THOẠI", "phoneNumber", formData.phoneNumber)}
        {renderField("NGÀY SINH", "dateOfBirth", formData.dateOfBirth, "date")}
        {renderField("SINH VIÊN NĂM", "schoolYear", formData.schoolYear)}
        {renderField("KHOA", "faculty", formData.faculty)}
        {renderField("SỐ TRANG IN CÒN LẠI", "remainingPages", formData.remainingPages)}
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

export default PersonalInfoForm;