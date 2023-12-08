import s from "./HomeNavbar.module.css";
import React from "react";
import RoundButton from "../round-button/RoundButton";
import UsernameButton from "../username-button/UsernameButton";

interface HomeNavbarProps {
  username: string;
}

const HomeNavbar: React.FC<HomeNavbarProps> = (props) => {
  return (
    <header className={s.navbar}>
      {/* <div className={s.left}>
        <RoundButton color="rgba(0, 0, 0, 0.08)" icon="/icons/dot-menu.svg" opacity={1} />
      </div> */}
      <div className={s.right}>
      <RoundButton color="rgba(0, 0, 0, 0.08)" icon="/icons/notification.svg" opacity={1} />
        <RoundButton color="rgba(0, 0, 0, 0.08)" icon="/icons/calendar.svg" opacity={1} />
        <UsernameButton username="maulana"/>
      </div>
    </header>
  );
};

export default HomeNavbar;
