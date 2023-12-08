import s from "./RoundButton.module.css";
import React from "react";
import Image from "next/image";

interface RoundButtonProps {
  color: string;
  opacity: number;
  icon: string;
  rotate?: number;
  scale?: number;
  notification?: number;
}

const RoundButton: React.FC<RoundButtonProps> = (props) => {
  return (
    <button
      className={s.btn}
      style={{
        backgroundColor: props.color,
        rotate: props.rotate ? `${props.rotate}deg` : `0deg`,
      }}
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
