import s from "./MemberListMenu.module.css";
import React from "react";
import Image from "next/image";
import UsernameItem from "../username-button/UsernameItem";
import Context, { ContextType } from "@/context/Store";
import { usePathname } from "next/navigation";
import RoundButton from "../round-button/RoundButton";

interface MemberListMenuProps {
  member_list: { username: string; u_id: string }[];
  t_id: string;
  show: boolean;
  assigned_member: { username: string; u_id: string }[];
  closeHandler: () => void;
  memberClickHandler: (
    payload: { u_id: string; username: string },
    set: boolean
  ) => void;
}

const MemberListMenu: React.FC<MemberListMenuProps> = (props) => {
  const { theme_ctx, user_workspaces_ctx } = React.useContext(
    Context
  ) as ContextType;

  const pathname = usePathname();

  const w_id = pathname.split("/")[4];

  const workspace = user_workspaces_ctx.find((w) => w.w_id === w_id);

  const admin_list = workspace ? workspace.admin_list : [];

  const is_dark = theme_ctx === "dark";

  return (
    <div
      className={[s.menu, is_dark && s.dark].join(" ")}
      style={{ top: props.show ? "50vh" : "150vh" }}
    >
      <RoundButton
        color="transparent"
        icon={is_dark ? "/icons/close_white.svg" : "/icons/close_black.svg"}
        opacity={1}
        onClick={() => {
          props.closeHandler();
        }}
        icon_scale={1.2}
        style={{
          position: "absolute",
          top: "2%",
          right: "2%",
          zIndex: 99,
        }}
      />
      <p className={[s.title, "medium", "md"].join(" ")}>Workspace Member</p>
      <ul className={s.list}>
        {props.member_list.map((member, index) => {
          const is_assigned = props.assigned_member.some(
            (m) => m.username === member.username
          );
          return (
            <li
              className={s.item}
              key={`member-item-${index}`}
              onClick={() => {
                props.memberClickHandler(
                  { username: member.username, u_id: member.u_id },
                  !is_assigned
                );
              }}
            >
              <UsernameItem
                isOwner={admin_list.some((m) => m.u_id === member.u_id)}
                kickHandler={() => {}}
                u_id={member.u_id}
                username={member.username}
                is_dark={is_dark}
              />
              <div className={s.circle}>
                <div
                  className={s.fill}
                  style={{
                    backgroundColor: is_assigned ? "green" : "transparent",
                  }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MemberListMenu;

export const MemberListMenuMemo = React.memo(MemberListMenu);
