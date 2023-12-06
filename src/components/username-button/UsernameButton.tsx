import s from "./UsernameButton.module.css";
import React from "react";
import Avatar from "../avatar/Avatar";

interface UsernameButtonProps {
  username: string;
}

const UsernameButton: React.FC<UsernameButtonProps> = (props) => {
  return (
    <button type="button" className={s.btn}>
      <span className={[s.username, "medium","sm"].join(" ")}>{props.username}</span>
      <Avatar bg_color="#395B96" txt_color="#fff" username="maulana" />
    </button>
  );
};

export default UsernameButton;
