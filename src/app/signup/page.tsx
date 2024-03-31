import SignUpPage from "@/components/signup-page/SignUpPage";
import React from "react";

const signup = () => {
  return <SignUpPage loginLink="/login" signupAPI="/api/user/signup" />;
};

export default signup;
