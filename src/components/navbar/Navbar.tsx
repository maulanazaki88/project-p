import s from "./Navbar.module.css";
import React from "react";
import RoundButton from "../round-button/RoundButton";

interface NavbarProps {
  title: string;
  subtitle?: string;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <header className={s.navbar}>
      <div className={s.left}>
        <RoundButton
          color="rgba(0, 0, 0, 0.08)"
          icon="/icons/next_dongker.svg"
          rotate={180}
          opacity={1}
          scale={0.9}
        />
      </div>
      <div className={s.heading}>
        <h2 className={[s.title, "medium", "big"].join(" ")}>{props.title}</h2>
        {props.subtitle && (
          <h3 className={[s.subtitle, "reguler", "sm"].join(" ")}>
            {props.subtitle}
          </h3>
        )}
      </div>
      <div className={s.right}>
        <RoundButton
          color="rgba(0, 0, 0, 0.08)"
          icon="/icons/dot-menu.svg"
          opacity={1}
        />
      </div>
    </header>
  );
};

export default Navbar;
