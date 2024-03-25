import LoginPage from "@/components/login-page/LoginPage";
import React from "react";
import { usePathname } from "next/navigation";

const Login = () => {
  const pathname = usePathname()
  return <LoginPage signupLink={`${pathname}/sign-up`} />;
};

export default Login;
