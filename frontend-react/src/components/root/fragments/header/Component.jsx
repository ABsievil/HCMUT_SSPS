import React from "react";

export const Component = ({ className }) => {
  return (
    <div className={`w-[1440px] h-[163px] ${className}`}>
      <div className="relative w-[1390px] h-[126px] top-[17px] left-[23px] bg-[#b7e0ff]">
        <div className="absolute w-[658px] h-[74px] top-[26px] left-[709px]">
          <img className="absolute w-[496px] h-4 top-[30px] left-0" alt="Frame" />
          <div className="flex w-56 h-[74px] items-center gap-4 absolute top-0 left-[434px] rounded">
            <div className="relative w-56 h-[74px] bg-[#87ceeb] rounded-[20px]">
              <div className="absolute w-56 h-6 top-6 left-0 [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xl text-center tracking-[0] leading-[normal]">
                Đăng nhập
              </div>
            </div>
          </div>
        </div>
        <img className="absolute w-[54px] h-[51px] top-[21px] left-[92px] object-cover" alt="Hcmut official logo" />
        <div className="absolute top-[85px] left-[94px] [font-family:'Josefin_Sans-Regular',Helvetica] font-normal text-[#1d2830] text-2xl tracking-[-1.44px] leading-6 whitespace-nowrap">
          SPSS
        </div>
      </div>
    </div>
  );
};