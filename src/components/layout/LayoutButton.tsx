"use client";
import s from "./LayoutButton.module.css";
import React from "react";
import Image from "next/image";
import { MenuType } from "./LayoutSidebar";

interface LayoutButtonProps {
  icon?: string;
  onClick: (e: MenuType) => void;
  name: MenuType;
  bg_color?: string
}

const LayoutButton: React.FC<LayoutButtonProps> = (props) => {
  const [show_modal, setShowModal] = React.useState<boolean>(false);
  return (
    <button
      name={props.name}
      className={s.btn}
      onClick={() => {
        props.onClick(props.name);
      }}
      onMouseOver={() => {
        setShowModal(true);
      }}
      onMouseLeave={() => {
        setShowModal(false);
      }}
      style={{backgroundColor: props.bg_color ? props.bg_color : "#fff"}}
    >
      {props.icon ? (
        <Image
          src={props.icon}
          alt={`icon-${props.name}`}
          width={18}
          height={18}
          className={s.icon}
        />
      ) : (
        <span className={s.char}>{props.name[0].toLocaleUpperCase()}</span>
      )}

      <div
        style={{ opacity: show_modal ? 1 : 0 }}
        className={s.modal}
      >
        <span className={s.modal_txt} >{props.name}</span>
      </div>
    </button>
  );
};

export default LayoutButton;
