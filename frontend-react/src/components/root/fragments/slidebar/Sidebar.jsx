import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation và useNavigate
import SidebarItem from "./SidebarItem";

const sidebarItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cc51959b7aa574dbb1fb56269de103e2d9b884f56bffb75d18b1579b4ef3ff89?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96",
    text: "Thông tin tài khoản",
    link: "/account"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3979f5fa700a249165cd855fae46b710c5072631be07574fb4438f32ddb0c312?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96",
    text: "Trang in ấn",
    link: "/print"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2366765ec2dd4a998fa08e8feb917c77aa9abdd1ca371b3c6c3589a10419bef0?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96",
    text: "Mua giấy in",
    link: "/buypaper"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1c4134eae08bde30084c70bf9ce3fba0cffea383b3ec61d772b2a1e70116cb49?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96",
    text: "Lịch sử in",
    link: "/printlog"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/73dd0575c4ff34141b69921c28e0c0be6cbe1dbfebcfbe5828db94ee29ff575b?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96",
    text: "Cài đặt hệ thống",
    link: "/manage"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9e6254714a807272e104cd11bfb80c4546f8c63032d7d5999b464192ba5220d9?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96",
    text: "Đăng xuất",
    link: "/logout"
  },
];

function Sidebar() {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [highlightedItem, setHighlightedItem] = useState(0); // Chọn item đầu tiên mặc định

  // Cập nhật highlightedItem dựa trên đường dẫn hiện tại
  useEffect(() => {
    const currentPath = location.pathname;
    const currentIndex = sidebarItems.findIndex(item => item.link === currentPath);
    setHighlightedItem(currentIndex !== -1 ? currentIndex : 0); // Nếu không tìm thấy, mặc định về 0
  }, [location.pathname]); // Chạy effect khi đường dẫn thay đổi

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa savedEmail
    navigate("/login"); // Điều hướng về trang đăng nhập
  };

  return (
    <aside className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow items-center px-1 pt-3.5 pb-80 w-full text-sm leading-snug text-white bg-[#2D5E82] max-md:pb-20 max-md:mt-10">
        <img
          loading="lazy"
          src="src/images/ellipse-1.png"
          alt="User avatar"
          className="object-contain rounded-full aspect-square w-[70px]"
        />
        <div className="mt-1.5">User name</div>
        <nav className="flex flex-col self-stretch mt-8 w-full">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              isHighlighted={highlightedItem === index}
              link={item.link}
              onClick={item.text === "Đăng xuất" ? handleLogout : () => setHighlightedItem(index)} // Gọi handleLogout khi bấm "Đăng xuất"
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
