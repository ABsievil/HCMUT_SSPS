import React from 'react';
import PrinterSelection from './PrinterSelection';

function SystemInfo() {
  return (
    <section className="flex flex-col py-20 w-4/5 md:w-3/5 mx-auto rounded-md bg-slate-100 max-md:mt-10 max-md:max-w-full">
      <h2 className="self-center text-2xl font-black leading-tight text-center text-neutral-800">
        THÔNG TIN HỆ THỐNG
      </h2>
      <div className="flex flex-col mt-4 w-full max-md:pl-5 max-md:mt-10 max-md:max-w-full">
        <PrinterSelection />
        <button className="self-center pt-3.5 pr-10 pb-3 pl-10 mt-14 text-sm font-semibold tracking-wide leading-6 text-center text-white uppercase bg-blue-700 rounded-3xl max-md:px-5 max-md:mt-10">
          XÁC NHẬN
        </button>
      </div>
    </section>
  );
}

export default SystemInfo;