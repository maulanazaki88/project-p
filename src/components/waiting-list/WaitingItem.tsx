import RoundButton from "../round-button/RoundButton";
import s from "./WaitingItem.module.css";
import React from "react";

interface WaitingItemProps {
  username: string;
  u_id: string;
  accHandler: () => void;
  rejHandler: () => void;
  currentUserOwner: boolean;
}

const WaitingItem: React.FC<WaitingItemProps> = (props) => {
  return (
    <div className={s.item}>
      <div className={s.info}>
        <span className={[s.username, "md", "medium"].join(" ")}>
          {props.username}
        </span>
      </div>
      {props.currentUserOwner && (
        <div className={s.action}>
          <RoundButton
            color="#9BCF53"
            icon="/icons/check_white.svg"
            opacity={1}
            highlightOnActive
            onClick={props.accHandler}
            icon_scale={0.5}
            style={{scale: 0.8}}
          />
          <RoundButton
            color="#E72929"
            icon="/icons/close_white.svg"
            opacity={1}
            highlightOnActive
            onClick={props.rejHandler}
            icon_scale={1}
            style={{scale: 0.8}}
          />
        </div>
      )}
    </div>
  );
};

export default WaitingItem;
