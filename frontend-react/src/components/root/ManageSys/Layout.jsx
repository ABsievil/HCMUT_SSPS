import React from 'react';
import Header from '../fragments/header/HeaderMain';
import Sidebar from '../fragments/slidebar/Sidebar';
import Footer from '../fragments/footer/Footer';

function Layout({ children }) {
  return (
    <div className="flex overflow-hidden flex-col bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <Header />
      <div className="flex max-md:flex-col">
        <Sidebar />
        <main className="flex flex-col w-full justify-center items-center max-md:ml-0 max-md:w-full">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;