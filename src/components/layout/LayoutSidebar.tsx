"use client";
import s from "./LayoutSidebar.module.css";
import React from "react";
import LayoutButton from "./LayoutButton";
import Context, { ContextType } from "@/context/Store";
import { usePathname } from "next/navigation";

export type MenuType =
  | "Edit Space"
  | "Members"
  | "Join Queue"
  | "Exit Space"
  | "Delete Space"
  | string;

interface LayoutSidebarProps {
  clickHandler: (type: MenuType) => void;
  alwaysShow?: boolean;
  show: boolean;
}

const LayoutSidebar: React.FC<LayoutSidebarProps> = (props) => {
  const { user_workspaces_ctx } = React.useContext(Context) as ContextType;

  console.log('alwaysShow', props.alwaysShow)

  console.log('show', props.show)

  const pathname = usePathname();

  const w_id = pathname.split("/")[4];
  console.log("sidebar w_id:", w_id);

  console.log("user workspace context: ", user_workspaces_ctx);

  const workspace_name = React.useMemo(() => {
    const workspace = user_workspaces_ctx.find((w) => w.w_id === w_id);
    return workspace ? workspace.name : "~";
  }, [user_workspaces_ctx]);
  if (pathname.includes("/workspace/")) {
    return (
      <div
        className={s.sidebar}
        style={{
          left: props.alwaysShow || props.show ? "0" : "-100%",
        }}
      >
        <div className={s.segment}>
          <ul className={s.list}>
            <li className={s.item}>
              <LayoutButton
                name={workspace_name}
                onClick={() => {}}
                bg_color="blue"
              />
            </li>
          </ul>
        </div>
        <div className={s.segment}>
          <ul className={s.list}>
            <li className={s.item}>
              <LayoutButton
                name={"Edit Space"}
                onClick={props.clickHandler}
                icon="/icons/edit_black.svg"
              />
            </li>
            <li className={s.item}>
              <LayoutButton
                name={"Members"}
                onClick={props.clickHandler}
                icon="/icons/team_black.svg"
              />
            </li>
            <li className={s.item}>
              <LayoutButton
                name={"Join Queue"}
                onClick={props.clickHandler}
                icon="/icons/queue_black.svg"
              />
            </li>
            {/* <li className={s.item}>
              <LayoutButton name={"Announcement"} onClick={props.clickHandler} icon="/icons/announcement_black.svg" />
            </li> */}
            <li className={s.item}>
              <LayoutButton
                name={"Share"}
                onClick={props.clickHandler}
                icon="/icons/plane_black.svg"
              />
            </li>
          </ul>
        </div>
        <div className={s.segment}>
          <ul className={s.list}>
            <li className={s.item}>
              <LayoutButton
                name={"Exit Space"}
                onClick={props.clickHandler}
                icon="/icons/exit_black.svg"
              />
            </li>
            <li className={s.item}>
              <LayoutButton
                name={"Delete Space"}
                onClick={props.clickHandler}
                icon="/icons/delete.svg"
              />
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default LayoutSidebar;
