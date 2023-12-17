import s from "./UsernameButton.module.css";
import React from "react";
import Avatar from "../avatar/Avatar";
import RoundButton from "../round-button/RoundButton";

interface UsernameButtonProps {
  username: string;
  withDelete?: boolean;
  deleteHandler?: (username: string) => void;
}

const UsernameButton: React.FC<UsernameButtonProps> = (props) => {
  return (
    <div className={s.btn}>
      <span className={[s.username, "medium", "sm"].join(" ")}>
        {props.username}
      </span>
      <Avatar bg_color="#395B96" txt_color="#fff" username={props.username} />
      {props.withDelete && (
        <div className={s.deleteBtn}>
          <RoundButton
            color="#FF0000"
            icon="/icons/plus_white.svg"
            opacity={0.7}
            rotate={45}
            scale={1}
            onClick={() => {
              if (props.deleteHandler) props.deleteHandler(props.username);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UsernameButton;
