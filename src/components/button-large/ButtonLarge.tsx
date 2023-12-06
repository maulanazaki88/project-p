import s from "./ButtonLarge.module.css";
import React from "react";
import Image from "next/image";
import local from "next/font/local";

const inter = local({ src: "../fonts/Inter-VariableFont_slnt,wght.ttf" });

interface ButtonLargeProps {
  text: string;
  color: string;
  bg_color: string;
  icon?: string;
  notification?: string | null;
}

const ButtonLarge: React.FC<ButtonLargeProps> = (props) => {
  const iconViews = props.icon && (
    <Image
      src={props.icon}
      alt={props.text}
      width={12}
      height={12}
      className={s.icon}
    />
  );
  const notifViews = props.notification && (
    <div className={s.notif}>{props.notification}</div>
  );

  return (
    <button className={s.btn}>
      <p className={[s.txt, "medium", "blend", inter.className].join(" ")}>
        {props.text}
      </p>
      {iconViews}
      {notifViews}
    </button>
  );
};

export default ButtonLarge;
