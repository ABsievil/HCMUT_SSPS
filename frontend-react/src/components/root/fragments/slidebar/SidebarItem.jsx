import React from "react";

function SidebarItem({ icon, text, isHighlighted }) {
  return (
    <div
      className={`flex gap-4 items-center py-3 mt-5 max-w-full w-full ${
        isHighlighted
          ? 'text-black bg-sky-600 border-r border-[#2D5E82] w-full' 
          : ''
      }`}
    >
      <div className="flex items-center gap-4 px-4">
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <div className="self-stretch my-auto w-[127px]">
          {text}
        </div>
      </div>
    </div>
  );
}

export default SidebarItem;
