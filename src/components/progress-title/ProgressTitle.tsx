import s from "./ProgressTitle.module.css";
import React from "react";
import Image from "next/image";
import { ProgressStatusType } from "@/type";
import Context, { ContextType } from "@/context/Store";

interface ProgressTitleProps {
  type: ProgressStatusType;
  title: string;
  count: number;
  bg_color_accent: string;
  newTaskHandler: (t: ProgressStatusType) => void;
  sortHandler?: () => {};
}

const ProgressTitle: React.FC<ProgressTitleProps> = (props) => {
  const { theme_ctx } = React.useContext(Context) as ContextType;

  const is_dark = theme_ctx === "dark";

  return (
    <div className={s.controler}>
      <div
        className={[s.bar, is_dark && s.dark].join(" ")}
        style={{
          borderTop: `4px solid ${props.bg_color_accent}`,
        }}
      >
        <h3 className={[s.title, "md", "medium"].join(" ")}>{props.title}</h3>
        <div className={[s.count, is_dark && s.dark].join(" ")}>
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
          <Image
            alt="plus"
            src={!is_dark ? "/icons/plus.svg" : "/icons/plus_white.svg"}
            width={18}
            height={18}
          />
        </button>
        {/* <button type="button" className={s.btn}>
          <Image
            alt="plus"
            src={!is_dark ? "/icons/filter.svg" : "/icons/filter_white.svg"}
            width={18}
            height={18}
          />
        </button> */}
      </div>
    </div>
  );
};

export default ProgressTitle;
