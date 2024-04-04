import s from "./RoundButton.module.css";
import React, { ButtonHTMLAttributes } from "react";
import Loading from "../loading/LoadingLight";
import Image from "next/image";

interface RoundButtonProps {
  color: string;
  opacity: number;
  icon: string;
  rotate?: number;
  icon_scale?: number;
  button_scale?: number;
  notification?: number;
  onClick?: (e: any | null) => void;
  type?: "button" | "reset" | "submit" | undefined;
  style?: React.CSSProperties;
  isLoading?: boolean;
  highlightOnActive?: boolean;
}

const RoundButton: React.FC<RoundButtonProps> = (props) => {
  return (
    <button
      className={[s.btn, props.highlightOnActive && s.highlight].join(" ")}
      style={{
        backgroundColor: props.color,
        rotate: props.rotate ? `${props.rotate}deg` : `0deg`,
        scale: props.button_scale ? props.button_scale : 1,
        ...props.style
      }}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
    >
      <div className={s.content}>
        {props.isLoading ? (
          <Loading />
        ) : (
          <Image
            alt={props.icon}
            src={props.icon}
            width={18}
            height={18}
            className={s.icon}
            style={{
              opacity: props.opacity,
              scale: props.icon_scale ? props.icon_scale : 1,
            }}
          />
        )}
      </div>
      {props.notification && <div className={s.notification} />}
    </button>
  );
};

export default RoundButton;
