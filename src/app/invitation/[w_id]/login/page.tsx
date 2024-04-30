"use client";
import LoginPage from "@/components/login-page/LoginPage";
import React from "react";
import { usePathname } from "next/navigation";

const Login = () => {
  const pathname = usePathname();
  const w_id = pathname.split("/")[2];
  return (
    <LoginPage
      signupLink={`${pathname.replaceAll("/login", "/signup")}`}
      loginAPI="/api/invitation/login"
      w_id={w_id}
    />
  );
};

export default Login;
