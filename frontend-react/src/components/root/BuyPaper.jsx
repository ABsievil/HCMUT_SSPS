import React, { useState } from "react";
import Layout from "./fragments/layout/Layout";
import InputField from "./fragments/InputField/InputField";

function PrintingPage() {
  const [quantity, setQuantity] = useState(100);
  const [totalAmount, setTotalAmount] = useState("150.000 VNĐ");
  const [paperType, setPaperType] = useState("A4");

  return (
    <Layout>
      <div className="flex flex-col mt-20 w-full max-md:mt-10 max-md:max-w-full px-6">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col ml-20px">
            <div className="flex flex-col w-[41%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch my-auto w-full max-md:mt-10">

                <div className="flex gap-5 w-full">
                  <label htmlFor="paperType" className="grow my-auto text-xl leading-snug text-black">
                    Loại giấy in:
                  </label>
                  <div className="flex flex-auto whitespace-nowrap bg-white rounded-xl border border-black border-solid">
                    <select
                      id="paperType"
                      value={paperType}
                      onChange={(e) => setPaperType(e.target.value)}
                      className="ml-auto text-xl text-black bg-transparent rounded-xl border-none w-full"
                    >
                      <option value="A4">A4</option>
                      <option value="A3">A3</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-10 mt-20 text-xl leading-snug text-black max-md:mt-10">
                  <label htmlFor="quantity" className="my-auto">
                    Số lượng:
                  </label>
                  <InputField
                    type="number"
                    id="quantity"
                    defaultValue={quantity}
                    min={0}
                  />
                </div>

                <label htmlFor="totalAmount" className="self-start mt-20 text-xl leading-snug text-black max-md:mt-10">
                  Số tiền cần thanh toán
                </label>
                <InputField
                  type="text"
                  id="totalAmount"
                  value={totalAmount}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col ml-5 w-[59%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a3f32bd116ec870a5a0033720b078688ccb180bcad345877fab489633d1539a?placeholderIfAbsent=true&apiKey=985f1fb8be044ffd914af5aef5360e96"
                alt="Printing preview"
                className="object-contain grow w-full aspect-[1.69] max-md:mt-10 max-md:max-w-full"
              />
            </div>
          </div>
        </div>

        <button className="flex flex-col justify-center self-center px-12 py-4 my-10 max-w-full text-sm font-semibold tracking-wide leading-6 text-center text-white uppercase bg-blue-700 hover:bg-blue-800 rounded-3xl w-[180px] max-md:px-5 max-md:mt-10">
          <div className="gap-2.5 self-stretch">XÁC NHẬN</div>
        </button>
      </div>
    </Layout>
  );
}

export default PrintingPage;
