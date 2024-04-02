import s from "./ResultItem.module.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface ResultItemProps {
  name: string;
  desc: string;
  link: string;
  type: "Workspace" | "Task";
}

const ResultItem: React.FC<ResultItemProps> = (props) => {
  return (
    <Link href={props.link}>
      <div className={s.item}>
        <div className={s.tag}>
          <Image
            src={
              props.type === "Workspace"
                ? "/icons/project_black.svg"
                : "/icons/task_black.svg"
            }
            className={s.icon}
            alt={`search-result-${props.name}`}
            width={18}
            height={18}
          />
          <span></span>
        </div>
        <div className={s.content}>
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
