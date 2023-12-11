import Image from "next/image";
import s from "./ButtonMedium.module.css";
import React from "react";

interface ButtonMediumProps {
  text: string;
  icon?: string;
  color: string;
  accent_color?: string;
  rotate_icon?: number;
  onClick?: (e: any | null) => void;
}

const ButtonMedium: React.FC<ButtonMediumProps> = (props) => {
  const IconViews = props.icon && (
    <div
      className={s.round}
      style={{
        backgroundColor: props.accent_color ? props.accent_color : props.color,
      }}
    >
      <Image
        src={props.icon}
        alt={props.text}
        width={0}
        height={0}
        className={s.icon}
        style={{
          rotate: props.rotate_icon ? `${props.rotate_icon}deg` : "0deg",
        }}
      />
    </div>
  );

  return (
    <button
      type="button"
      className={s.btn}
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
    >
      <span className={[s.text, "medium", "sm"].join(" ")}>{props.text}</span>
      {IconViews}
    </button>
  );
};

export default ButtonMedium;
