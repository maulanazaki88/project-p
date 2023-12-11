import s from "./MenuNavbar.module.css";
import React from "react";
import RoundButton from "../round-button/RoundButton";

interface MenuNavbarProps {
  title: string;
  closeHandler: () => void;
}

const MenuNavbar: React.FC<MenuNavbarProps> = (props) => {
  return (
    <div className={s.navbar}>
      <div className={s.left}>
        <RoundButton
          color="rgba(0, 0, 0, 0.08)"
          icon="/icons/next_dongker.svg"
          rotate={180}
          opacity={1}
          scale={0.9}
          onClick={props.closeHandler}
        />
      </div>
      <div className={s.mid}>
        <p className={[s.title, "md", "medium"].join(" ")}>{props.title}</p>
      </div>
    </div>
  );
};

export default MenuNavbar;
