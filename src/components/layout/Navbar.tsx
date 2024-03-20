"use client";
import s from "./Navbar.module.css";
import React from "react";
import Image from "next/image";
import RoundButton from "../round-button/RoundButton";
import UsernameButton from "../username-button/UsernameButton";
import Context, { ContextType } from "@/context/Store";
import { usePathname } from "next/navigation";

interface NavbarProps {
  // notificationHandler: () => void;
  calendarHandler: () => void;
  logoutHandler: () => void;
  showLogoutPopup: boolean;
  showLogoutPopupHandler: () => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const pathname = usePathname();
  const w_id = pathname.split("/")[4];
  const { user_data_ctx } = React.useContext(Context) as ContextType;

  const username = React.useMemo(() => {
    return user_data_ctx && user_data_ctx.username
      ? user_data_ctx.username
      : "~";
  }, [user_data_ctx]);

  return (
    <header className={[s.navbar, !w_id && s.home].join(" ")}>
      <div className={s.left}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 48 48"
          viewBox="0 0 48 48"
          width="30"
          height="30"
          className={s.logo_icon}
        >
          <path
            fill="#2d4356"
            d="M36.4,12.9c-1.7,0-3,1.3-3,3s1.3,3,3,3c2.8,0,5.1,2.3,5.1,5.1s-2.3,5.1-5.1,5.1c-1.9,0-6.8-3.7-10.2-7.2l0,0
	c-2.1-2.1-9.2-9.1-14.5-9.1c-6.1,0-11.1,5-11.1,11.1s5,11.1,11.1,11.1c2.6,0,5.8-1.5,9.7-4.7c1-0.8,1.9-1.6,2.6-2.2
	c3.1,2.9,8.2,7,12.4,7c6.1,0,11.1-5,11.1-11.1S42.5,12.9,36.4,12.9z M17.6,25.7c-4.1,3.3-5.8,3.4-6,3.4c-2.8,0-5.1-2.3-5.1-5.1
	s2.3-5.1,5.1-5.1c1.5,0,5,2.4,8,5.1C19.1,24.5,18.4,25.1,17.6,25.7z"
          ></path>
          <path
            fill="#0098ff"
            d="M29.8,21.9c-0.8,0-1.6-0.3-2.1-0.9c-0.1-0.1-0.3-0.3-0.4-0.5c-0.1-0.2-0.2-0.3-0.3-0.5
		c-0.1-0.2-0.1-0.4-0.2-0.6c0-0.2-0.1-0.4-0.1-0.6c0-0.2,0-0.4,0.1-0.6s0.1-0.4,0.2-0.6c0.1-0.2,0.2-0.4,0.3-0.5
		c0.1-0.2,0.2-0.3,0.4-0.5c0.1-0.1,0.3-0.3,0.5-0.4c0.2-0.1,0.3-0.2,0.5-0.3c0.2-0.1,0.4-0.1,0.6-0.2c1-0.2,2,0.1,2.7,0.8
		c0.6,0.6,0.9,1.3,0.9,2.1c0,0.2,0,0.4-0.1,0.6c0,0.2-0.1,0.4-0.2,0.6c-0.1,0.2-0.2,0.4-0.3,0.5c-0.1,0.2-0.2,0.3-0.4,0.5
		C31.3,21.6,30.5,21.9,29.8,21.9z"
          ></path>
        </svg>
      </div>
      <div className={s.right}>
        {/* <RoundButton
          color="rgba(0, 0, 0, 0.08)"
          icon="/icons/notification.svg"
          opacity={1}
          onClick={props.notificationHandler}
        /> */}
        <RoundButton
          color="rgba(0, 0, 0, 0.08)"
          icon="/icons/calendar.svg"
          opacity={1}
          onClick={props.calendarHandler}
        />
        <UsernameButton
          username={username}
          logoutHandler={props.logoutHandler}
          showPopup={props.showLogoutPopup}
          onClick={props.showLogoutPopupHandler}
        />
      </div>
    </header>
  );
};

export default Navbar;
