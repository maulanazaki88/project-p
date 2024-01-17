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

  console.log(props.username)

  const render_name = props.username.toUpperCase()

  return (
    <div
      style={{
        backgroundColor: props.bg_color,
        color: props.txt_color,
        border: props.withBorder ? "2px solid #fff" : "none",
      }}
      className={s.avatar}
    >
      <span className={s.text}>{render_name.slice(0, 2)}</span>
      {props.isOnline && <div className={s.green_light} />}
    </div>
  );
};

export default Avatar;
