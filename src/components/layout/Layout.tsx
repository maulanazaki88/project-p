"use client";
import CalendarMenu from "../calendar-menu/CalendarMenu";
import NotificationMenu from "../notification-menu/NotificationMenu";
import LayoutSidebar, { MenuType } from "./LayoutSidebar";
import Navbar from "./Navbar";
import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Backdrop from "./Backdrop";
import MemberList from "../member-list/MemberList";
import Context, {ContextType} from "@/context/Store";

const Layout = (props: any) => {
  const pathname = usePathname();
  const router = useRouter();

  const u_id = pathname.split("/")[2];
  const w_id = pathname.split("/")[4];

  const [show_calendar_menu, setShowCalendarMenu] =
    React.useState<boolean>(false);

  // const [show_notification_menu, setShowNotificationMenu] =
  //   React.useState<boolean>(false);

  const [show_logout, setShowLogout] = React.useState<boolean>(false);
  const [show_member_list, setShowMemberList] = React.useState<boolean>(false)

  const [active_backdrop, setActiveBackdrop] = React.useState<boolean>(false);

  const backdropAction = () => {
    setShowCalendarMenu(false);
    setShowLogout(false);
    setActiveBackdrop(false);
  };

  const sidebarClickHandler = (e: MenuType) => {
    switch (e) {
      case "Edit Space":
        const target = `${process.env.NEXT_PUBLIC_BASE_URL}/home/${u_id}/workspace-setup/${w_id}`;
        console.log("target", target);
        router.push(target);

        break;
      case "Members":
        setShowMemberList(true)
        break;

      case "Join Queue":
        break;
      case "Exit Space":
        break;
      case "Delete Space":
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Backdrop
        isActive={active_backdrop}
        onClick={() => {
          backdropAction();
        }}
      />
      <Navbar
        calendarHandler={() => {
          setShowCalendarMenu(true);
          setActiveBackdrop(true);
        }}
        logoutHandler={() => {}}
        // notificationHandler={() => {
        //   setNotificationMenuActive(!notificationMenuActive);
        // }}
        showLogoutPopup={show_logout}
        showLogoutPopupHandler={() => {
          setShowLogout(!show_logout);
        }}
      />
      <LayoutSidebar clickHandler={sidebarClickHandler} />
      <CalendarMenu
        closeHandler={() => {
          setShowCalendarMenu(false);
        }}
        isActive={show_calendar_menu}
        title="Calendar"
        u_id={u_id}
      />
      {/* <MemberList
        closeHandler={() => {setShowMemberList(false)}}
        kickHandler={(data)}
      /> */}
      {/* <NotificationMenu
        newNotificationHandler={() => {}}
        closeHandler={() => {}}
        isActive={show_notification_menu}
        title="Notification"
        u_id={u_id}
      /> */}
      {props.children}
    </>
  );
};

export default Layout;
