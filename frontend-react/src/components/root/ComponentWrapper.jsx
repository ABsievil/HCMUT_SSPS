import React from "react";

export const ComponentWrapper = ({ className }) => {
  return (
    <div className={`w-[1440px] h-[328px] bg-white ${className}`}>
      <div className="relative w-[1442px] h-[326px] top-0.5">
        <div className="absolute w-[1440px] h-[269px] top-0 left-0 bg-[#3a6d8c]" />
        <div className="absolute w-[1442px] h-[59px] top-[266px] left-0">
          <div className="relative w-[1440px] h-[59px] bg-[#001f3f]">
            <p className="absolute w-[202px] top-px left-[652px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-transparent text-[13px] tracking-[0] leading-[13px]">
              <span className="text-white">
                <br />
                <br />
              </span>
              <span className="text-neutral-100">Copyright 2007-2024 BK-SPSS</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[162px] h-[119px] items-start gap-5 absolute top-[70px] left-[1165px]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-text-gray-100 text-base tracking-[0] leading-4 whitespace-nowrap">
            Tải ứng dụng
          </div>
          <img className="relative w-[162px] h-12" alt="Layer" />
          <img className="relative w-[162px] h-12 mb-[-33.30px]" alt="Group" />
        </div>
        <div className="absolute w-[281px] h-[103px] top-20 left-[67px]">
          <div className="relative w-[275px] h-[103px]">
            <p className="absolute w-60 top-[69px] left-0 [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-[13px] tracking-[0] leading-[13px]">
              ĐT (Tel.) : (84-8) 38647256 - 5258
            </p>
            <div className="absolute w-[275px] top-6 left-0 [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-[13px] tracking-[0] leading-[13px]">
              <br />
              Email : ddthu@hcmut.edu.vn
            </div>
            <div className="absolute w-[202px] top-0 left-0 [font-family:'Inter-Black',Helvetica] font-black text-white text-[13px] tracking-[0] leading-[13px]">
              Tổ kỹ thuật&nbsp;&nbsp;/ Technician
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};