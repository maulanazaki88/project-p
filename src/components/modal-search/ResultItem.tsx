import s from "./ResultItem.module.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface ResultItemProps {
  name: string;
  desc: string;
  link: string;
  type: "Workspace" | "Task";
  is_dark: boolean;
}

const ResultItem: React.FC<ResultItemProps> = (props) => {
  const task_icon = props.is_dark
    ? "/icons/task_white.svg"
    : "/icons/task_black.svg";
  const workspace_icon = props.is_dark
    ? "/icons/project_white.svg"
    : "/icons/project_black.svg";

  return (
    <Link href={props.link}>
      <div className={s.item}>
        <div className={s.tag}>
          <Image
            src={props.type === "Workspace" ? workspace_icon : task_icon}
            className={s.icon}
            alt={`search-result-${props.name}`}
            width={18}
            height={18}
          />
          <span></span>
        </div>
        <div className={[s.content, props.is_dark && s.dark].join(" ")}>
          <span className={[s.name, "md", "medium"].join(" ")}>
            {props.name}
          </span>
          <span className={[s.desc, "sm", "regular", "soft"].join(" ")}>
            {props.desc}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ResultItem;
