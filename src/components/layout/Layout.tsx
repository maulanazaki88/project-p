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
import Context, { ContextType } from "@/context/Store";
import WaitingList from "../waiting-list/WaitingList";
import FormModal from "../modal-form/FormModal";
import InvitationMenu from "../invitation-menu/InvitationMenu";

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
  const [show_member_list, setShowMemberList] = React.useState<boolean>(false);
  const [show_waiting_list, setShowWaitingList] =
    React.useState<boolean>(false);

  const [active_backdrop, setActiveBackdrop] = React.useState<boolean>(false);
  const [show_invitation_menu, setShowInvitationMenu] =
    React.useState<boolean>(false);

  const backdropAction = () => {
    setShowCalendarMenu(false);
    setShowMemberList(false);
    setShowLogout(false);
    setActiveBackdrop(false);
    setShowWaitingList(false);
    setShowInvitationMenu(false)
  };

  React.useEffect(() => {
    if (
      show_calendar_menu ||
      show_member_list ||
      show_waiting_list ||
      show_invitation_menu
    ) {
      setActiveBackdrop(true);
    }
  }, [
    show_calendar_menu,
    show_member_list,
    show_waiting_list,
    show_invitation_menu,
  ]);

  const sidebarClickHandler = (e: MenuType) => {
    switch (e) {
      case "Edit Space":
        const target = `${process.env.NEXT_PUBLIC_BASE_URL}/home/${u_id}/workspace-setup/${w_id}`;
        console.log("target", target);
        router.push(target);

        break;
      case "Members":
        setShowMemberList(true);
        break;

      case "Join Queue":
        setShowWaitingList(true);
        break;
      case "Exit Space":
        break;
      case "Delete Space":
        break;
      case "Share":
        setShowInvitationMenu(true)
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
          backdropAction();
        }}
        isActive={show_calendar_menu}
        title="Calendar"
        u_id={u_id}
      />
      <MemberList
        closeHandler={() => {
          backdropAction();
        }}
        show={show_member_list}
        showWaitingListHandler={() => {
          setShowWaitingList(true);
        }}
        showInvitationMenuHandler={() => {}}
      />
      <WaitingList
        closeHandler={() => {
          backdropAction();
        }}
        show={show_waiting_list}
      />
      <InvitationMenu
        closeHandler={() => backdropAction()}
        show={show_invitation_menu}
        showHandler={() => {
          setShowInvitationMenu(true);
        }}
      />
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
