import React from "react";
import { Link } from "react-router-dom"; // Import Link

function SidebarItem({ icon, text, isHighlighted, link, onClick }) {
  return (
    <div
      className={`flex gap-4 items-center py-3 mt-5 max-w-full w-full ${
        isHighlighted
          ? 'bg-sky-600 border-r border-[#2D5E82]' 
          : ''
      }`}
      onClick={onClick}
    >
      <Link to={link} className="flex items-center gap-4 px-4 w-full"> {/* Sử dụng Link */}
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          style={{
            filter: isHighlighted ? 'invert(1)' : 'invert(0)',
            transition: 'filter 0.3s ease'
          }}
        />
        <div className={`self-stretch my-auto w-[127px] font-bold ${
          isHighlighted ? 'text-black' : 'text-white'
        }`}>
          {text}
        </div>
      </Link>
    </div>
  );
}

export default SidebarItem;
