"use client";
import CalendarMenu from "../calendar-menu/CalendarMenu";
import NotificationMenu from "../notification-menu/NotificationMenu";
import LayoutSidebar from "./LayoutSidebar";
import Navbar from "./Navbar";
import React from "react";
import { usePathname } from "next/navigation";

const Layout = (props: any) => {
  const pathname = usePathname();

  const u_id = pathname.split("/")[2];

  const [calendarMenuActive, setCalendarMenuActive] =
    React.useState<boolean>(false);

  const [notificationMenuActive, setNotificationMenuActive] =
    React.useState<boolean>(false);

  const [show_calendar_menu, setShowCalendarMenu] =
    React.useState<boolean>(false);

  const [show_notification_menu, setShowNotificationMenu] =
    React.useState<boolean>(false);

  const [show_logout, setShowLogout] = React.useState<boolean>(false);

  return (
    <>
      <Navbar
        calendarHandler={() => {
          setCalendarMenuActive(!calendarMenuActive);
        }}
        logoutHandler={() => {}}
        notificationHandler={() => {
          setNotificationMenuActive(!notificationMenuActive);
        }}
        showLogoutPopup={show_logout}
        showLogoutPopupHandler={() => {
          setShowLogout(!show_logout);
        }}
      />
      <LayoutSidebar clickHandler={() => {}} />
      <CalendarMenu
        closeHandler={() => {}}
        isActive={false}
        title="Calendar"
        u_id={u_id}
      />
      <NotificationMenu
        newNotificationHandler={() => {}}
        closeHandler={() => {}}
        isActive={false}
        title="Notification"
        u_id={u_id}
      />
      {props.children}
    </>
  );
};

export default Layout;
