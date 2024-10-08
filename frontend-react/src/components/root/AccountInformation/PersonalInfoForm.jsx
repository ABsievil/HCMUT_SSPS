import React from 'react';

const PersonalInfoForm = () => {
  return (
    <div className="w-10/12 mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 justify-center flex">THÔNG TIN CÁ NHÂN</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">

        <div>
          <label className="block text-gray-700">HỌ</label>
          <div className="bg-gray-100 p-2 rounded">Peter</div>
        </div>

        <div>
          <label className="block text-gray-700">TÊN</label>
          <div className="bg-gray-100 p-2 rounded">Griffin</div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">MÃ SỐ SINH VIÊN</label>
          <div className="bg-gray-100 p-2 rounded">thepetergriffin</div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">EMAIL</label>
          <div className="bg-gray-100 p-2 rounded">hello@designpros.io</div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">SỐ TRANG IN CÒN LẠI</label>
          <div className="bg-gray-100 p-2 rounded">100</div>
        </div>

      </div>
      <div className="flex justify-center">
        <button className="w-1/3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            xác nhận
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
