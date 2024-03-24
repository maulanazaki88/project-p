import s from "./UsernameButton.module.css";
import React from "react";

const UsernameButtonSkeleton: React.FC = () => {
  return (
    <div className={[s.btn, s.skeleton].join(" ")}></div>
  );
};

export default UsernameButtonSkeleton;
