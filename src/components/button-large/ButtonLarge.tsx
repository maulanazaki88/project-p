import s from "./ButtonLarge.module.css";
import React from "react";
import Image from "next/image";
import local from "next/font/local";

const inter = local({ src: "../fonts/Inter-VariableFont_slnt,wght.ttf" });

export interface ButtonLargeProps {
  text: string;
  color: string;
  bg_color: string;
  icon?: string;
  notification?: number | null;
  rowReverse?: boolean;
  onClick?: (e: any | null) => void;
  disabled? :boolean
  icon_scale?:number
}

const ButtonLarge: React.FC<ButtonLargeProps> = (props) => {
  const iconViews = props.icon && (
    <Image
      src={props.icon}
      alt={props.text}
      width={12}
      height={12}
      className={s.icon}
      style={{scale: props.icon_scale ? props.icon_scale : 1}}
    />
  );
  const notifViews = props.notification && (
    <div className={[s.notif, "reguler", "sm"].join(" ")}>
      {props.notification}
    </div>
  );

  return (
    <button
      className={s.btn}
      disabled={props.disabled}
      style={{
        backgroundColor: props.bg_color,
        color: props.color,
        flexDirection: props.rowReverse ? "row-reverse" : "row",
      }}
      onClick={props.onClick}
    >
      <p className={[s.txt, "medium", "blend", inter.className, "sm"].join(" ")}>
        {props.text}
      </p>
      {iconViews}
      {notifViews}
    </button>
  );
};

export default ButtonLarge;
