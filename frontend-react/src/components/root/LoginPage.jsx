import React from 'react';
import Header from './fragments/header/HeaderMain';
import LoginForm from './Login/LoginForm';
import Footer from './fragments/footer/Footer';

function LoginPage() {
  return (
    <div>
      <Header />
      <div className="flex overflow-hidden flex-col items-center bg-white">
        <main className="flex flex-col justify-center items-center p-7 my-7 ml-10 max-w-full bg-zinc-200 w-[500px] max-md:px-5 max-md:mt-10">
          <LoginForm />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
