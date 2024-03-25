import LoginPage from "@/components/login-page/LoginPage";
import React from "react";
import { usePathname } from "next/navigation";

const login = () => {
  const pathname = usePathname()
  return <LoginPage signupLink={`${pathname}/sign-up`} />;
};

export default login;
