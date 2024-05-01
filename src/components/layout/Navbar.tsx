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
import Image from "next/image";

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
      <Backdrop
        isActive={backdrop}
        onClick={backdropAction}
        opacity={0.000001}
      />
      <div className={s.left}>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/${u_id}`}>
          <Image
            src={"/icons/sewu.svg"}
            alt="sewu-logo"
            width={30}
            height={30}
            className={s.logo_icon}
          />
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
