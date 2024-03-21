import s from "./RoundButton.module.css";
import React, { ButtonHTMLAttributes } from "react";
import Image from "next/image";

interface RoundButtonProps {
  color: string;
  opacity: number;
  icon: string;
  rotate?: number;
  scale?: number;
  notification?: number;
  onClick?: (e: any | null) => void;
  type?: "button" | "reset" | "submit" | undefined;
  style?: React.CSSProperties
}

const RoundButton: React.FC<RoundButtonProps> = (props) => {
  return (
    <button
      className={s.btn}
      style={{
        backgroundColor: props.color,
        rotate: props.rotate ? `${props.rotate}deg` : `0deg`,
        ...props.style
      }}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
    >
      <Image
        alt={props.icon}
        src={props.icon}
        width={18}
        height={18}
        className={s.icon}
        style={{ opacity: props.opacity, scale: props.scale ? props.scale : 1 }}
      />
      {props.notification && <div className={s.notification} />}
    </button>
  );
};

export default RoundButton;
