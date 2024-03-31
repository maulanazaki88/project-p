import RoundButton from "../round-button/RoundButton";
import s from "./WorkspaceControl.module.css";
import React from "react";
import { useRenderDate } from "@/hook/useRenderDate";
import Image from "next/image";

interface Props {
  workspace_name: string;
  workspace_desc: string;
  search_value: string;
  searchInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  created_on: Date;
}

const WorkspaceControl: React.FC<Props> = (props) => {
  const calendar = useRenderDate();

  return (
    <div className={s.control}>
      <div className={s.left}>
        <div className={s.info}>
          <span className={[s.w_name, "md", "regular"].join(" ")}>
            {props.workspace_name.toLocaleUpperCase()}
          </span>
          <span className={[s.w_desc, "sm", "regular", "soft"].join(" ")}>
            {`${props.workspace_desc.slice(0, 40)}${
              props.workspace_desc.length > 40 ? "..." : ""
            }`}
          </span>
        </div>

        <div className={s.access}>
          <RoundButton
            color="transparent"
            icon="/icons/edit_access_black.svg"
            opacity={0.5}
            scale={0.8}
            style={{
              scale: 1,
            }}
          />
          <RoundButton
            color="transparent"
            icon="/icons/eye_black.svg"
            opacity={0.5}
            scale={0.8}
            style={{
              scale: 1,
            }}
          />
        </div>
      </div>
      <div className={s.right}>
        <span className={[s.created_date, "sm", "medium"].join(" ")}>
          Created on {calendar.calendar(props.created_on, ["d", "m", "y"])} {}
        </span>
        <div className={s.search_field}>
          <input
            name="search"
            className={[s.search_inp, "sm", "medium"].join(" ")}
            type="text"
            value={props.search_value}
            onChange={props.searchInputHandler}
            placeholder="Search task or member"
          />
          <Image
            src={"/icons/search.svg"}
            alt="search"
            width={18}
            height={18}
            className={s.search_icon}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceControl;