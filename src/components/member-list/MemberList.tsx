import s from "./MemberList.module.css";
import React from "react";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import UsernameButton from "../username-button/UsernameButton";
import RoundButton from "../round-button/RoundButton";
import { usePathname } from "next/navigation";

interface MemberListProps {
  list: { username: string; u_id: string }[];
  kickHandler: (data: { u_id: string; w_id: string; username: string }) => void;
  workspace_name: string;
  closeHandler: () => void;
  show: boolean;
  w_id: string;
}

const MemberList: React.FC<MemberListProps> = (props) => {
  const pathname = usePathname();

  const u_id = pathname.split("/")[2];

  return (
    <div
      className={s.menu}
      style={{ translate: props.show ? "0 0" : "100vw 0" }}
    >
      <MenuNavbar
        title={props.workspace_name}
        closeHandler={props.closeHandler}
      />
      <div className={s.ctn_screen}>
        <ul className={s.list}>
          {props.list.map((member, index) => {
            if (member.u_id === u_id) {
              return (
                <li
                  className={s.item}
                  key={`candidate-${index}`}
                  style={{ justifyContent: "flex-start" }}
                >
                  <UsernameButton username={member.username} />
                </li>
              );
            }
            return (
              <li className={s.item} key={`candidate-${index}`}>
                <UsernameButton username={member.username} />
                <div className={s.btn_group}>
                  <RoundButton
                    color="red"
                    icon="/icons/plus_white.svg"
                    opacity={1}
                    onClick={() => {
                      props.kickHandler({
                        u_id: member.u_id,
                        username: member.username,
                        w_id: props.w_id,
                      });
                    }}
                    rotate={45}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MemberList;
