import s from "./UsernameButton.module.css";
import React from "react";
import Avatar from "../avatar/Avatar";
import RoundButton from "../round-button/RoundButton";
import ButtonMedium from "../button-medium/ButtonMedium";
import UsernameButtonSkeleton from "./UsernameButtonSkeleton";

interface UsernameButtonProps {
  username: string;
  withDelete?: boolean;
  deleteHandler?: (username: string) => void;
  logoutHandler?: () => void;
  showPopup?: boolean;
  onClick?: () => void;
}

const UsernameButton: React.FC<UsernameButtonProps> = (props) => {
  if (props.username === "~") {
    return <UsernameButtonSkeleton />;
  }
  return (
    <div className={s.btn} onClick={props.onClick}>
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
      <div
        className={s.pop_up}
        style={{ display: props.showPopup ? "flex" : "none" }}
      >
        <p className={[s.pop_up_text, "medium", "sm"].join(" ")}>Akun</p>
        <ButtonMedium
          color="red"
          text="Logout"
          accent_color="rgba(255, 0, 0, 0.3)"
          icon="/icons/logout_white.svg"
          onClick={props.logoutHandler}
        />
      </div>
    </div>
  );
};

export default UsernameButton;
