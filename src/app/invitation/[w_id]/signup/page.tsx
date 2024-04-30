"use client";
import SignUpPage from "@/components/signup-page/SignUpPage";
import React from "react";
import { usePathname } from "next/navigation";

const Signup = () => {
  const pathname = usePathname();
  const w_id = pathname.split("/")[2];
  return (
    <SignUpPage
      loginLink={`${pathname.replaceAll("/signup", "/login")}`}
      signupAPI="/api/invitation/signup"
      w_id={w_id}
    />
  );
};

export default Signup;
