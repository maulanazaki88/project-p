import s from "./InputSmall.module.css";
import React, { HTMLInputTypeAttribute } from "react";
import Image from "next/image";
import local from "next/font/local";

const inter = local({ src: "../fonts/Inter-VariableFont_slnt,wght.ttf" });

interface InputSmallProps {
  placeholder: string;
  icon: string;
  value: string;
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  warning: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  maxChar?: number;
  hideInfo?: boolean;
}

const InputSmall: React.FC<InputSmallProps> = (props) => {
  return (
    <div className={[s.comp, inter.className].join(" ")}>
      <label
        className={[s.label, "medium", "md"].join(" ")}
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <div className={s.field}>
        <Image
          className={s.icon}
          src={props.icon}
          alt="placeholder"
          width={18}
          height={18}
        />
        <input
          onChange={(e) => props.onChange(e)}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          className={[s.input, "medium", "sm"].join(" ")}
          name={props.name}
          id={props.name}
          onBlur={props.onBlur}
          required
          maxLength={props.maxChar}
        />
      </div>
      {!props.hideInfo && (
        <div className={s.info}>
          <span
            className={[s.warning, "sm", "regular"].join(" ")}
            style={{ color: props.warning === "-" ? "transparent" : "red" }}
          >
            {props.warning}
          </span>
          <span className={[s.capacity, "medium", "sm", "soft"].join(" ")}>
            {`${props.value.length}/${props.maxChar ? props.maxChar : "-"}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default InputSmall;
