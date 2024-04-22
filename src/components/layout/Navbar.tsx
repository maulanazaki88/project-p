"use client";
import s from "./Navbar.module.css";
import React from "react";
import RoundButton from "../round-button/RoundButton";
import UsernameButton from "../username-button/UsernameButton";
import Context, { ContextType } from "@/context/Store";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeSelector from "./ThemeSelector";
import Backdrop from "./Backdrop";

interface NavbarProps {
  // notificationHandler: () => void;
  calendarHandler: () => void;
  toggleSidebar: () => void;
  search_value: string;
  searchInputHandler: React.Dispatch<string>;
  showSearchModalHandler: React.Dispatch<boolean>;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const pathname = usePathname();
  const u_id = pathname.split("/")[2];
  const isWorkspace = pathname.includes("/workspace/");
  const { user_data_ctx, theme_ctx, theme_handler_ctx } = React.useContext(
    Context
  ) as ContextType;

  const is_dark = theme_ctx === "dark";

  const username = React.useMemo(() => {
    return user_data_ctx && user_data_ctx.username
      ? user_data_ctx.username
      : "~";
  }, [user_data_ctx]);

  const [display_width, setDisplayWidth] = React.useState<number | null>(null);
  const [show_theme_selector, setShowSelectorHandler] =
    React.useState<boolean>(false);

  const [show_logout, setShowLogout] = React.useState<boolean>(false);

  const [backdrop, setBackdrop] = React.useState<boolean>(false);

  React.useEffect(() => {
    function getNavbarWidth() {
      const width = window.innerWidth;
      setDisplayWidth(width);
    }

    window.addEventListener("resize", getNavbarWidth);
    getNavbarWidth();
    return function cleanUp() {
      window.removeEventListener("resize", getNavbarWidth);
    };
  }, []);

  const backdropAction = () => {
    setBackdrop(false);
    setShowSelectorHandler(false);
    setShowLogout(false);
  };

  const logoutHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/logout`
      );
      if (response.ok) {
        location.reload();
      } else {
        alert("Logout error");
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    if (show_logout || show_theme_selector) {
      setBackdrop(true);
    }
  }, [show_logout, show_theme_selector]);

  return (
    <header
      className={[s.navbar, !isWorkspace && s.home, is_dark && s.dark].join(
        " "
      )}
    >
      <Backdrop isActive={backdrop} onClick={backdropAction} opacity={0.000001} />
      <div className={s.left}>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/${u_id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 48 48"
            viewBox="0 0 48 48"
            width="30"
            height="30"
            className={s.logo_icon}
          >
            <path
              fill="#4793AF"
              d="M36.4,12.9c-1.7,0-3,1.3-3,3s1.3,3,3,3c2.8,0,5.1,2.3,5.1,5.1s-2.3,5.1-5.1,5.1c-1.9,0-6.8-3.7-10.2-7.2l0,0
	c-2.1-2.1-9.2-9.1-14.5-9.1c-6.1,0-11.1,5-11.1,11.1s5,11.1,11.1,11.1c2.6,0,5.8-1.5,9.7-4.7c1-0.8,1.9-1.6,2.6-2.2
	c3.1,2.9,8.2,7,12.4,7c6.1,0,11.1-5,11.1-11.1S42.5,12.9,36.4,12.9z M17.6,25.7c-4.1,3.3-5.8,3.4-6,3.4c-2.8,0-5.1-2.3-5.1-5.1
	s2.3-5.1,5.1-5.1c1.5,0,5,2.4,8,5.1C19.1,24.5,18.4,25.1,17.6,25.7z"
            ></path>
            <path
              fill="#DD5746"
              d="M29.8,21.9c-0.8,0-1.6-0.3-2.1-0.9c-0.1-0.1-0.3-0.3-0.4-0.5c-0.1-0.2-0.2-0.3-0.3-0.5
		c-0.1-0.2-0.1-0.4-0.2-0.6c0-0.2-0.1-0.4-0.1-0.6c0-0.2,0-0.4,0.1-0.6s0.1-0.4,0.2-0.6c0.1-0.2,0.2-0.4,0.3-0.5
		c0.1-0.2,0.2-0.3,0.4-0.5c0.1-0.1,0.3-0.3,0.5-0.4c0.2-0.1,0.3-0.2,0.5-0.3c0.2-0.1,0.4-0.1,0.6-0.2c1-0.2,2,0.1,2.7,0.8
		c0.6,0.6,0.9,1.3,0.9,2.1c0,0.2,0,0.4-0.1,0.6c0,0.2-0.1,0.4-0.2,0.6c-0.1,0.2-0.2,0.4-0.3,0.5c-0.1,0.2-0.2,0.3-0.4,0.5
		C31.3,21.6,30.5,21.9,29.8,21.9z"
            ></path>
          </svg>
        </Link>
      </div>
      <div className={s.mid}></div>
      <div className={s.right}>
        {display_width && display_width > 640 ? (
          <button
            className={[s.search_btn, "sm", "medium", "blend"].join(" ")}
            type="button"
            onClick={() => props.showSearchModalHandler(true)}
          >
            Search workspace or task
          </button>
        ) : (
          <>
            {pathname.includes("/workspace/") && (
              <RoundButton
                color="transparent"
                icon="/icons/dot_menu_white.svg"
                rotate={90}
                opacity={0.5}
                icon_scale={1}
                onClick={() => {
                  props.toggleSidebar();
                }}
                highlightOnActive
              />
            )}
            <RoundButton
              color="rgba(255, 255, 255, 0.2)"
              icon="/icons/search_white.svg"
              opacity={0.5}
              icon_scale={1}
              onClick={() => {
                props.showSearchModalHandler(true);
              }}
              highlightOnActive
            />
          </>
        )}

        <RoundButton
          color="rgba(255, 255, 255, 0.2)"
          icon="/icons/calendar_white.svg"
          opacity={0.5}
          onClick={props.calendarHandler}
        />
        <RoundButton
          color="rgba(255, 255, 255, 0.2)"
          icon={is_dark ? "/icons/moon_white.svg" : "/icons/sun_white.svg"}
          opacity={0.5}
          onClick={() => {
            setShowSelectorHandler(!show_theme_selector);
          }}
        />
        <UsernameButton
          username={username}
          logoutHandler={logoutHandler}
          showPopup={show_logout}
          onClick={() => {
            setShowLogout(!show_logout);
          }}
        />
      </div>
      {show_theme_selector && (
        <ThemeSelector
          is_dark={is_dark}
          show={show_theme_selector}
          closeHandler={() => {
            setShowSelectorHandler(false);
          }}
        />
      )}
    </header>
  );
};

export default Navbar;
