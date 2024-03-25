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
import FormModal, { FormModalProps } from "../modal-form/FormModal";
import InvitationMenu from "../invitation-menu/InvitationMenu";
import PromptModal, { PromptModalProps } from "../modal-prompt/PromptModal";

const Layout = (props: any) => {
  const { user_exit_workspace, workspace_delete_ctx } = React.useContext(
    Context
  ) as ContextType;
  const [display_width, setDisplayWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    const getWidth = () => {
      const width = window.innerWidth;
      if (width) {
        setDisplayWidth(width);
        // console.log("display width: " + width);
      }
    };

    getWidth();

    window.addEventListener("resize", getWidth);
  }, []);

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

  const [show_sidebar, setShowSidebar] = React.useState<boolean>(false);

  const [prompt_modal, setPromptModal] =
    React.useState<PromptModalProps | null>(null);
  const [form_modal, setFormModal] = React.useState<FormModalProps | null>(
    null
  );

  const backdropAction = () => {
    setShowCalendarMenu(false);
    setShowMemberList(false);
    setShowLogout(false);
    setActiveBackdrop(false);
    setShowWaitingList(false);
    setShowInvitationMenu(false);
    setPromptModal(null);
    setFormModal(null);
  };

  React.useEffect(() => {
    if (
      show_calendar_menu ||
      show_member_list ||
      show_waiting_list ||
      show_invitation_menu ||
      prompt_modal ||
      form_modal
    ) {
      setActiveBackdrop(true);
    }
  }, [
    show_calendar_menu,
    show_member_list,
    show_waiting_list,
    show_invitation_menu,
    prompt_modal,
    form_modal,
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
        setPromptModal({
          confirm_act: () => {
            user_exit_workspace(u_id, w_id);
          },
          confirm_text: "Yes",
          decline_act: () => {
            backdropAction();
          },
          decline_text: "No",
          text_prompt: "Are you sure you want to exit workspace?",
          title: "Exit Workspace",
        });
        break;
      case "Delete Space":
        setPromptModal({
          confirm_act: () => {
            workspace_delete_ctx(w_id, { author_id: u_id });
          },
          confirm_text: "Yes",
          decline_act: () => {
            backdropAction();
          },
          decline_text: "No",
          text_prompt: "Are you sure you want to delete workspace?",
          title: "Delete Workspace",
        });
        break;
      case "Share":
        setShowInvitationMenu(true);
        break;
      default:
        break;
    }
  };

  // console.log("RENDER LAYOUT");

  return (
    <>
      <Backdrop
        isActive={active_backdrop}
        onClick={() => {
          backdropAction();
        }}
      />
      <Navbar
        toggleSidebar={() => setShowSidebar(!show_sidebar)}
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
      <LayoutSidebar
        clickHandler={sidebarClickHandler}
        alwaysShow={display_width && display_width > 500 ? true : false}
        show={show_sidebar}
      />
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
      {prompt_modal && <PromptModal {...prompt_modal} />}
      {form_modal && <FormModal {...form_modal} />}
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
