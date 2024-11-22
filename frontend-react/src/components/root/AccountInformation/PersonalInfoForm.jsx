import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // for dispatch, and for store selection
import { Pencil, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../../store/userContext"; // get user id
import { fetchPersonalInfor } from "../../../store/personalInforSlice"; // fetch infor by id

const PersonalInfoForm = () => {
  const [errors, setErrors] = useState({});
  const { username, role, userId, isLoggedIn } = useUser();

  const dispatch = useDispatch();
  const { isLoading, personalInfor, error } = useSelector(
    (state) => state.personalInfor
  );

  useEffect(() => {
    dispatch(fetchPersonalInfor(userId));
  }, [userId, dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // sample data
    studentId: "2211445",
    email: "name.lastname@hcmut.edu.vn",
    fullName: "Nguyen Van A",
    phoneNumber: "0123456789",
    dateOfBirth: "1990-01-01",
    schoolYear: "3",
    faculty: "Khoa Khoa học và Kỹ thuat Máy Tính",
    remainingPages: "100",
  });

  useEffect(() => {
    // Update formData only when personalInfor.data is available
    if (personalInfor.data) {
      setFormData({
        studentId: personalInfor.data.student_id,
        email: personalInfor.data.email,
        fullName:
          personalInfor.data.last_name +
          " " +
          personalInfor.data.middle_name +
          " " +
          personalInfor.data.first_name,
        phoneNumber: personalInfor.data.phone_number,
        dateOfBirth: personalInfor.data.date_of_birth,
        schoolYear: personalInfor.data.school_year,
        faculty: personalInfor.data.faculty,
        remainingPages: personalInfor.data.page_remain,
      });
    }
  }, [personalInfor.data, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Xóa lỗi nếu dữ liệu hợp lệ
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "fullName" && value.trim()) {
        delete newErrors.fullName;
      }
      if (name === "phoneNumber" && value.trim()) {
        delete newErrors.phoneNumber;
      }
      if (name === "schoolYear" && parseInt(value, 10) > 0) {
        delete newErrors.schoolYear;
      }
      if (name === "faculty" && value.trim()) {
        delete newErrors.faculty;
      }
      return newErrors;
    });
  };

  const handleSubmit = () => {
    const newErrors = {};

    // Kiểm tra các trường bắt buộc
    if (!formData.fullName.trim())
      newErrors.fullName = "Họ và tên không được để trống";
    if (!/^\d{10,11}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Số điện thoại phải có 10-11 chữ số";
    }
    if (
      !formData.schoolYear.trim() ||
      isNaN(Number(formData.schoolYear)) ||
      Number(formData.schoolYear) <= 0
    ) {
      newErrors.schoolYear = "Sinh viên năm phải là số hợp lệ và lớn hơn 0";
    }
    if (!formData.faculty.trim())
      newErrors.faculty = "Khoa không được để trống";

    // Nếu có lỗi, hiển thị và dừng việc gửi yêu cầu
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Vui lòng điền đầy đủ thông tin hợp lệ!");
      return;
    }

    setErrors({}); // Xóa lỗi nếu không có

    // Tạo payload từ formData
    const payload = {
      student_id: formData.studentId,
      last_name: formData.fullName.split(" ")[0], // Tách họ từ fullName
      middle_name: formData.fullName.split(" ").slice(1, -1).join(" "), // Tách tên đệm
      first_name: formData.fullName.split(" ").slice(-1).join(""), // Tách tên
      email: formData.email,
      date_of_birth: formData.dateOfBirth,
      phone_number: formData.phoneNumber,
      school_year: formData.schoolYear,
      faculty: formData.faculty,
    };

    // Gửi yêu cầu cập nhật
    fetch(
      `${
        import.meta.env.VITE_REACT_APP_BE_API_URL
      }/api/v1/Student/updateStudent`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Cập nhật thông tin thất bại");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchPersonalInfor(userId)); // Làm mới thông tin
        toast.success("Cập nhật thông tin thành công");
        setIsEditing(false); // Đóng chế độ chỉnh sửa
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.message || "Cập nhật thông tin thất bại. Vui lòng thử lại"
        );
      });
  };

  const renderField = (label, name, value, type = "text") => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">{label}</label>
        {isEditing &&
        !["remainingPages", "usedPages", "studentId", "email"].includes(
          name
        ) ? (
          <>
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleInputChange}
              className={`w-full p-2 border ${
                errors[name] ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 ${
                errors[name] ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
          </>
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
          onClick={() => {
            setIsEditing(!isEditing);
            if (!isEditing) setErrors({});
          }}
          className="p-2 hover:bg-gray-200 bg-gray-100 rounded-md transition-colors"
        >
          <div className="flex gap-3">
            {isEditing ? (
              <>
                HỦY CHỈNH SỬA
                <X className="w-5 h-5 text-red-600" />
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
        {renderField(
          "SỐ TRANG IN CÒN LẠI",
          "remainingPages",
          formData.remainingPages
        )}
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