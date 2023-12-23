import s from "./ProgressTitle.module.css";
import React from "react";
import Image from "next/image";
import { ProgressStatusType } from "@/type";

interface ProgressTitleProps {
  type: ProgressStatusType;
  title: string;
  count: number;
  color: string;
  bg_color: string;
  bg_color_accent: string;
  newTaskHandler: (t: ProgressStatusType) => void;
  sortHandler?: () => {};
}

const ProgressTitle: React.FC<ProgressTitleProps> = (props) => {
  return (
    <div className={s.controler}>
      <div className={s.bar} style={{ backgroundColor: props.bg_color }}>
        <h3 className={[s.title, "md", "medium"].join(" ")}>{props.title}</h3>
        <div
          className={s.count}
          style={{
            color: props.bg_color,
            backgroundColor: props.bg_color_accent,
          }}
        >
          <span className={[s.text, "sm", "medium"].join(" ")}>
            {props.count}
          </span>
        </div>
      </div>
      <div className={s.tools}>
        <button
          className={s.btn}
          type="button"
          onClick={() => props.newTaskHandler(props.type)}
        >
          <Image alt="filter" src={"/icons/plus.svg"} width={18} height={18} />
        </button>
        <button type="button" className={s.btn}>
          <Image alt="plus" src={"/icons/filter.svg"} width={18} height={18} />
        </button>
      </div>
    </div>
  );
};

export default ProgressTitle;