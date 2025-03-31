import React from "react";
import "./AuthLayout.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout relative">
      <div className="w-full h-screen flex flex-col justify-center items-center relative z-10 p-5">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
