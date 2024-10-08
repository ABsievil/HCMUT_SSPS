import React from "react";
import HeaderMain from "./fragments/header/HeaderMain";
import RegisForm from "./Login/RegisterForm";
import Footer from "./fragments/footer/Footer";

function RegisPage() {
  return (
    <div>
      <HeaderMain />
      <div className="flex overflow-hidden flex-col items-center bg-white">
        <main className="flex flex-col justify-center items-center px-7 py-4 my-7 max-w-full bg-zinc-200 w-[650px] max-md:px-5 max-md:mt-10">
          <RegisForm />
        </main>
      </div>
      <Footer />
    </div>
  );
}
export default RegisPage;
