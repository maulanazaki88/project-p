import Image from "next/image";
import s from "./SquareButton.module.css";
import React from "react";

interface SquareButtonProps {
  text: string;
  icon?: string;
  color: string;
  bg_color: string;
  opacity: number;
  onClick?: () => void
}

const SquareButton: React.FC<SquareButtonProps> = (props) => {
  const ContentViews = props.icon ? (
    <Image alt={props.icon} src={props.icon} width={18} height={18} style={{opacity: props.opacity}}/>
  ) : (
    <span
      style={{ color: props.color }}
      className={[s.text, "medium", "sm", "blend"].join(" ")}
    >
      {props.text}
    </span>
  );

  return (
    <button type="button" onClick={props.onClick} style={{ backgroundColor: props.bg_color }} className={s.btn}>
      {ContentViews}
    </button>
  );
};

export default SquareButton;
