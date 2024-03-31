import RoundButton from "../round-button/RoundButton";
import s from "./UsernameItem.module.css";
import React from "react";

interface UsernameItemProps {
  username: string;
  u_id: string;
  kickHandler: (kick_id: string) => void;
  isOwner: boolean;
  isSelf?: boolean;
}

const UsernameItem: React.FC<UsernameItemProps> = (props) => {
  return (
    <div className={s.item}>
      <div className={s.info}>
        <span className={[s.username, "md", "medium"].join(" ")}>
          {props.username}
        </span>
        <span className={[s.status, "sm", "light", 'soft'].join(" ")} >{props.isOwner ? "Admin" : "Member"}</span>
      </div>

      <div className={s.action}>
        {(!props.isOwner && props.isSelf) && (
          <RoundButton
            color="#c9c9c9"
            icon="/icons/close_white.svg"
            opacity={1}
            highlightOnActive
            onClick={props.kickHandler}
          />
        )}
      </div>
    </div>
  );
};

export default UsernameItem;
