import s from "./MemberListMenu.module.css";
import React from "react";
import UsernameButton from "../username-button/UsernameButton";
import Image from "next/image";

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
  return (
    <div className={s.menu} style={{ top: props.show ? "50vh" : "150vh" }}>
      <button type="button" className={s.closeBtn} onClick={props.closeHandler}>
        <Image
          src={"/icons/plus.svg"}
          alt="close button"
          width={18}
          height={18}
          className={s.close_svg}
        />
      </button>
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
              <UsernameButton username={member.username} />
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

export const MemberListMenuMemo = React.memo(MemberListMenu)
