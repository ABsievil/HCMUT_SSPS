import React from 'react'

function ChangePassword() {
  return (
    <div className="w-10/12 mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 justify-center flex">THAY ĐỔI MẬT KHẨU</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">

        <div className="mb-4">
          <label className="block text-gray-700">MẬT KHẨU HIỆN TẠI</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-themecolor1"
          />
        </div>
        <div></div>

        <div className="mb-4">
          <label className="block text-gray-700">MẬT KHẨU MỚI</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-themecolor1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">NHẬP LẠI MẬT KHẨU MỚI</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-themecolor1"
          />
        </div>

      </div>
      <div className="flex justify-center">
        <button className="w-1/3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            xác nhận
        </button>
      </div>
    </div>
  )
}

export default ChangePassword