import LoginPage from "@/components/login-page/LoginPage";
import React from "react";

const login = () => {
  return <LoginPage signupLink="/signup" loginAPI="/api/user/login" />;
};

export default login;
