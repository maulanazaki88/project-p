import s from "./Avatar.module.css";
import React from "react";

interface AvatarProps {
  username: string;
  bg_color: string;
  isOnline?: boolean;
  txt_color: string;
  withBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div
      style={{
        backgroundColor: props.bg_color,
        color: props.txt_color,
        border: props.withBorder ? "2px solid #fff" : "none",
      }}
      className={s.avatar}
    >
      {props.username.toLocaleUpperCase().slice(0, 2)}
    </div>
  );
};

export default Avatar;
