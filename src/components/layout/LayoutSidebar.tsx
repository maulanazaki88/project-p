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
  const { user_workspaces_ctx, theme_ctx } = React.useContext(
    Context
  ) as ContextType;

  // console.log('alwaysShow', props.alwaysShow)

  // console.log('show', props.show)

  const pathname = usePathname();

  const w_id = React.useMemo(() => {
    return pathname.split("/")[4];
  }, [pathname]);
  const u_id = pathname.split("/")[2];
  // console.log("sidebar w_id:", w_id);

  // console.log("user workspace context: ", user_workspaces_ctx);

  const workspace = React.useMemo(() => {
    const workspace = user_workspaces_ctx.find((w) => w.w_id === w_id);
    return workspace;
  }, [user_workspaces_ctx]);

  const isOwner =
    workspace && workspace.admin_list.some((a) => a.u_id === u_id);

  const workspace_name = React.useMemo(() => {
    const workspace = user_workspaces_ctx.find((w) => w.w_id === w_id);
    return workspace ? workspace.name : "~";
  }, [user_workspaces_ctx, pathname]);

  if (pathname.includes("/workspace/")) {
    return (
      <div
        className={[s.sidebar, theme_ctx === "dark" && s.dark].join(" ")}
        style={{
          bottom: props.show ? "60px" : "-100%",
        }}
      >
        <div className={[s.segment, theme_ctx === "dark" && s.dark].join(" ")}>
          <ul className={s.list}>
            <li className={s.item}>
              <LayoutButton
                name={workspace_name}
                onClick={() => {}}
                bg_color="blue"
                is_dark={theme_ctx === "dark"}
              />
            </li>
          </ul>
        </div>
        <div className={[s.segment, theme_ctx === "dark" && s.dark].join(" ")}>
          <ul className={s.list}>
            <li className={s.item}>
              <LayoutButton
                name={"Home"}
                onClick={props.clickHandler}
                icon={
                  theme_ctx === "light"
                    ? "/icons/home_black.svg"
                    : "/icons/home_white.svg"
                }
                is_dark={theme_ctx === "dark"}
              />
            </li>
            <li className={s.item}>
              <LayoutButton
                name={"Edit Space"}
                onClick={props.clickHandler}
                icon={
                  theme_ctx === "light"
                    ? "/icons/edit_black.svg"
                    : "/icons/edit_white.svg"
                }
                is_dark={theme_ctx === "dark"}
              />
            </li>
            <li className={s.item}>
              <LayoutButton
                name={"Members"}
                onClick={props.clickHandler}
                icon={
                  theme_ctx === "light"
                    ? "/icons/members_black.svg"
                    : "/icons/members_white.svg"
                }
                is_dark={theme_ctx === "dark"}
              />
            </li>
            <li className={s.item}>
              <LayoutButton
                name={"Join Queue"}
                onClick={props.clickHandler}
                icon={
                  theme_ctx === "light"
                    ? "/icons/queue_black.svg"
                    : "/icons/queue_white.svg"
                }
                is_dark={theme_ctx === "dark"}
              />
            </li>
            {/* <li className={s.item}>
              <LayoutButton name={"Announcement"} onClick={props.clickHandler} icon="/icons/announcement_black.svg" />
            </li> */}
            <li className={s.item}>
              <LayoutButton
                name={"Share"}
                onClick={props.clickHandler}
                icon={
                  theme_ctx === "light"
                    ? "/icons/plane_black.svg"
                    : "/icons/plane_white.svg"
                }
                is_dark={theme_ctx === "dark"}
              />
            </li>
          </ul>
        </div>
        <div className={[s.segment, theme_ctx === "dark" && s.dark].join(" ")}>
          <ul className={s.list}>
            {workspace && !isOwner && (
              <li className={s.item}>
                <LayoutButton
                  name={"Exit Space"}
                  onClick={props.clickHandler}
                  icon={
                    theme_ctx === "light"
                      ? "/icons/exit_black.svg"
                      : "/icons/exit_white.svg"
                  }
                  is_dark={theme_ctx === "dark"}
                />
              </li>
            )}
            {workspace && isOwner && (
              <li className={s.item}>
                <LayoutButton
                  name={"Delete Space"}
                  onClick={props.clickHandler}
                  icon={
                    theme_ctx === "light"
                      ? "/icons/delete_black.svg"
                      : "/icons/delete_white.svg"
                  }
                  is_dark={theme_ctx === "dark"}
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default LayoutSidebar;
