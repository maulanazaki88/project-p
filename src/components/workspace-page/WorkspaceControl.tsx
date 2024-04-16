import RoundButton from "../round-button/RoundButton";
import s from "./WorkspaceControl.module.css";
import React from "react";
import { useRenderDate } from "@/hook/useRenderDate";
import Image from "next/image";
import Context, { ContextType } from "@/context/Store";

interface Props {
  workspace_name: string;
  workspace_desc: string;
  search_value: string;
  searchInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  created_on: Date;
  showWorkspaceInfoHandler: React.Dispatch<boolean>;
}

const WorkspaceControl: React.FC<Props> = (props) => {
  const calendar = useRenderDate();

  const { theme_ctx } = React.useContext(Context) as ContextType;

  return (
    <div className={[s.control, theme_ctx === "dark" && s.dark].join(" ")}>
      <div className={s.left}>
        <div className={s.info}>
          <span className={[s.w_name].join(" ")}>
            {props.workspace_name.toLocaleUpperCase()}
          </span>
          <span
            className={[
              s.w_desc,
              "sm",
              "regular",
              "soft",
              theme_ctx === "dark" && s.dark,
            ].join(" ")}
          >
            {`${props.workspace_desc}`}
          </span>
          <RoundButton
            color="transparent"
            icon={
              theme_ctx === "light"
                ? "/icons/info_black.svg"
                : "/icons/info_white.svg"
            }
            opacity={0.8}
            highlightOnActive
            onClick={() => {
              props.showWorkspaceInfoHandler(true);
            }}
            icon_scale={0.9}
          />
        </div>

        {/* <div className={s.access}>
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
        </div> */}
      </div>
      <div className={s.right}>
        <div
          className={[s.search_field, theme_ctx === "dark" && s.dark].join(" ")}
        >
          <input
            name="search"
            className={[
              s.search_inp,
              "sm",
              "medium",
              "blend",
              theme_ctx === "dark" && s.dark,
            ].join(" ")}
            type="text"
            value={props.search_value}
            onChange={props.searchInputHandler}
            placeholder="Search task or member"
          />
          <Image
            src={ theme_ctx === 'light' ? "/icons/search.svg" : "/icons/search_white.svg"}
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
