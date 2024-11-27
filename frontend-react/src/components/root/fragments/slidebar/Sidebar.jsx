import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import Cookies from 'js-cookie';
import { useUser } from "../../../../store/userContext";


const Sidebar = () => {
  const { username, role } = useUser(); // Lấy thông tin vai trò từ context
  const location = useLocation();
  const navigate = useNavigate();
  const [highlightedItem, setHighlightedItem] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Danh sách mục sidebar cho từng vai trò
  const sidebarItems = {
    ADMIN: [
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cc51959b7aa574dbb1fb56269de103e2d9b884f56bffb75d18b1579b4ef3ff89?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96", text: "Thông tin tài khoản", link: "/account" },
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1c4134eae08bde30084c70bf9ce3fba0cffea383b3ec61d772b2a1e70116cb49?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96", text: "Lịch sử in", link: "/printlog" },
      { icon: "src/images/icon-payment-nav.png", text: "Lịch sử thanh toán", link: "/payment" },
      { icon: "src/images/icon-file-nav.png", text: "Báo cáo", link: "/report" },
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/73dd0575c4ff34141b69921c28e0c0be6cbe1dbfebcfbe5828db94ee29ff575b?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96", text: "Cài đặt hệ thống", link: "/manage" },
      { icon: "src/images/icon-lock-nav.png", text: "Đổi mật khẩu", link: "/change-password" },
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9e6254714a807272e104cd11bfb80c4546f8c63032d7d5999b464192ba5220d9?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96", text: "Đăng xuất", link: "/logout" },
    ],
    USER: [
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cc51959b7aa574dbb1fb56269de103e2d9b884f56bffb75d18b1579b4ef3ff89?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96", text: "Thông tin tài khoản", link: "/account" },
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3979f5fa700a249165cd855fae46b710c5072631be07574fb4438f32ddb0c312?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96", text: "Trang in ấn", link: "/print" },
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2366765ec2dd4a998fa08e8feb917c77aa9abdd1ca371b3c6c3589a10419bef0?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96", text: "Mua giấy in", link: "/buypaper" },
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1c4134eae08bde30084c70bf9ce3fba0cffea383b3ec61d772b2a1e70116cb49?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96", text: "Lịch sử in", link: "/printlog" },
      { icon: "src/images/icon-payment-nav.png", text: "Lịch sử thanh toán", link: "/payment" },
      { icon: "src/images/icon-lock-nav.png", text: "Đổi mật khẩu", link: "/change-password" },
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9e6254714a807272e104cd11bfb80c4546f8c63032d7d5999b464192ba5220d9?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96", text: "Đăng xuất", link: "/logout" },
    ],
  };

  // Lấy danh sách mục tương ứng với vai trò
  const items = sidebarItems[role] || [];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentIndex = items.findIndex(item => item.link === currentPath);
    setHighlightedItem(currentIndex !== -1 ? currentIndex : 0);
  }, [location.pathname, items]);

  const handleItemClick = (index, link) => {
    if (highlightedItem === index) return;

    setIsLoading(true);

    setTimeout(() => {
      setHighlightedItem(index);
      if (link === "/logout") {
        handleLogout();
      } else {
        navigate(link);
      }
      setIsLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    Cookies.remove("jwt");
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <aside className="flex flex-col max-md:w-full w-[220px]">
      <div className="flex flex-col grow items-center px-1 pt-3.5 text-sm leading-snug text-white bg-[#2D5E82] max-md:pb-20 rounded-lg shadow-lg fixed h-[calc(100vh-2rem)] top-4 left-5 overflow-y-auto">
        <img
          loading="lazy"
          src="src/images/ellipse-1.png"
          alt="User avatar"
          className="object-contain rounded-full aspect-square w-[70px]"
        />
        <div className="mt-1.5">{username}</div>
        <nav className={`flex flex-col self-stretch mt-2 w-full ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              isHighlighted={highlightedItem === index}
              link={item.link}
              onClick={() => handleItemClick(index, item.link)}
              showText={true} // Always show text
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
