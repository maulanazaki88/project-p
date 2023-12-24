import s from "./InputLarge.module.css";
import React from "react";

interface InputLargeProps {
  value: string;
  label: string;
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void
  maxChar?:number
}

const InputLarge: React.FC<InputLargeProps> = (props) => {
  return (
    <div className={s.field}>
      <label
        htmlFor={props.label}
        className={[s.label, "medium", "md"].join(" ")}
      >
        {props.label}
      </label>
      <textarea
        id={props.label}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={[s.textarea, "sm", "medium", ].join(" ")}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        maxLength={props.maxChar}
      />
      <div className={s.info} >
        <span className={[s.capacity, "medium", "sm", "soft"].join(" ")} >
          {`${props.value.length}/${props.maxChar ? props.maxChar : "-"}`}
        </span>
      </div>
    </div>
  );
};

export default InputLarge;
