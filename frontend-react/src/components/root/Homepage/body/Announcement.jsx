import React from "react";

function Announcement({ image, title, author, date, content }) {
  return (
    <div className="flex flex-wrap gap-5 px-9 pt-5 pb-7 mt-9 bg-sky-200 max-md:px-5 max-md:mr-1">
      <img
        loading="lazy"
        src={image}
        alt=""
        className="object-contain shrink-0 self-start mt-2 rounded-full aspect-[0.94] w-[66px]"
      />
      <div className="flex-auto w-[1223px] max-md:max-w-full">
        {/* Thêm margin-bottom để tăng khoảng cách giữa title và author */}
        <div className="mb-2 text-lg font-bold">{title}</div>
        <div className="mb-4">
          Bởi{" "}
          <a href="#" className="text-black underline">
            {author}
          </a>{" "}
          - {date}
        </div>
        <span
          className="leading-5"
          dangerouslySetInnerHTML={{ __html: content }}
        ></span>
      </div>
    </div>
  );
}

export default Announcement;
