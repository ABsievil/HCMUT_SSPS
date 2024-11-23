import React from "react";
import { Link } from "react-router-dom"; // Import Link

function SidebarItem({ icon, text, isHighlighted, link, onClick }) {
  return (
    <div
      className={`flex items-center py-3 mt-5 max-w-full w-full ${
        isHighlighted
          ? 'bg-sky-600  border-[#2D5E82]' 
          : 'hover:bg-sky-600  hover:border-[#2D5E82] hover:shadow-md'
      } transition-all duration-300 ease-in-out rounded-lg `}
      onClick={onClick}
    >
      <Link to={link} className="flex items-center gap-4 px-4 w-full"> 
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
        <div className={`self-stretch my-auto w-[140px] font-bold ${
          isHighlighted ? 'text-black' : 'text-white'
        }`}>
          {text}
        </div>
      </Link>
    </div>
  );
}

export default SidebarItem;
