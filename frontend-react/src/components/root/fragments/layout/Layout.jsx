
import React from "react";
import HeaderMain from "../header/HeaderMain"
import Footer from "../footer/Footer"
import AdminSidebar from "../slidebar/AdminSideBar";
import { useUser } from "../../../../store/userContext";
import StudentSidebar from "../slidebar/StudentSidebar";

function Layout({ children }) {
  const { username, role, userId, isLoggedIn } = useUser();

  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <HeaderMain />
        <div className="flex max-md:flex-col">
          {role === "ADMIN"?(
            <AdminSidebar />
          ):(<StudentSidebar />)}
          <main className="flex flex-col mx-5 w-full max-md:ml-0 max-md:w-full">
            {children}
          </main>
        </div>
      <Footer />
    </div>
  );
}

export default Layout;
