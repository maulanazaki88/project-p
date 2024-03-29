import SignUpPage from "@/components/signup-page/SignUpPage";
import React from "react";
import { usePathname } from "next/navigation";

const Signup = () => {
  const pathname = usePathname();
  return <SignUpPage loginLink={`${pathname}/login`} />;
};

export default Signup;
