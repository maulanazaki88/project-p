"use client";
import CalendarMenu from "../calendar-menu/CalendarMenu";
import LayoutSidebar, { MenuType } from "./LayoutSidebar";
import Navbar from "./Navbar";
import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Backdrop from "./Backdrop";
import { MemoizedMemberList } from "../member-list/MemberList";
import Context, { ContextType } from "@/context/Store";
import { MemoizedWaitingList } from "../waiting-list/WaitingList";
import FormModal, { FormModalProps } from "../modal-form/FormModal";
import InvitationMenu from "../invitation-menu/InvitationMenu";
import PromptModal, { PromptModalProps } from "../modal-prompt/PromptModal";
import SearchModal from "../modal-search/SearchModal";

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

  React.useEffect(() => {
    if (display_width && display_width > 640) {
      setShowSidebar(false);
    }
  }, [display_width]);

  const [prompt_modal, setPromptModal] =
    React.useState<PromptModalProps | null>(null);
  const [form_modal, setFormModal] = React.useState<FormModalProps | null>(
    null
  );
  const [search_value, setSearchValue] = React.useState<string>("");
  const [show_search_modal, setShowSearchModal] =
    React.useState<boolean>(false);

  const backdropAction = React.useCallback(() => {
    setShowCalendarMenu(false);
    setShowMemberList(false);
    setShowLogout(false);
    setActiveBackdrop(false);
    setShowWaitingList(false);
    setShowInvitationMenu(false);
    setPromptModal(null);
    setFormModal(null);
    setShowSearchModal(false);
    setShowSidebar(false);
  }, []);

  React.useEffect(() => {
    if (
      show_calendar_menu ||
      show_member_list ||
      show_waiting_list ||
      show_invitation_menu ||
      prompt_modal ||
      form_modal ||
      show_search_modal ||
      show_sidebar
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
    show_search_modal,
    show_sidebar,
  ]);

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

  const sidebarClickHandler = (e: MenuType) => {
    switch (e) {
      case "Home":
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/home/${u_id}`);
        break;
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
          confirm_act: async () => {
            const res = await user_exit_workspace(u_id, w_id);
            if (res) {
              backdropAction();
              router.replace(
                `${process.env.NEXT_PUBLIC_BASE_URL}/home/${u_id}`
              );
            }
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
          confirm_act: async () => {
            const res = await workspace_delete_ctx(w_id, { author_id: u_id });
            if (res) {
              backdropAction();
              router.replace(
                `${process.env.NEXT_PUBLIC_BASE_URL}/home/${u_id}`
              );
            }
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
      {show_search_modal && (
        <SearchModal
          closeHandler={() => {
            backdropAction();
          }}
          show={show_search_modal}
          value={search_value}
          u_id={u_id}
          searchChangeHandler={setSearchValue}
        />
      )}
      <Navbar
        toggleSidebar={() => setShowSidebar(!show_sidebar)}
        calendarHandler={() => {
          setShowCalendarMenu(true);
          setActiveBackdrop(true);
        }}
        search_value={search_value}
        searchInputHandler={setSearchValue}
        showSearchModalHandler={setShowSearchModal}
      />
      <LayoutSidebar
        clickHandler={sidebarClickHandler}
        alwaysShow={display_width && display_width > 640 ? true : false}
        show={show_sidebar}
      />
      {show_calendar_menu && (
        <CalendarMenu
          closeHandler={() => {
            backdropAction();
          }}
          isActive={show_calendar_menu}
          title="Calendar"
          u_id={u_id}
        />
      )}

      {show_member_list && (
        <MemoizedMemberList
          closeHandler={backdropAction}
          show={show_member_list}
          showWaitingListHandler={() => {
            setShowWaitingList(true);
          }}
          showInvitationMenuHandler={() => {
            setShowInvitationMenu(true);
          }}
        />
      )}
      {show_waiting_list && (
        <MemoizedWaitingList
          closeHandler={backdropAction}
          show={show_waiting_list}
        />
      )}
      {show_invitation_menu && (
        <InvitationMenu
          closeHandler={backdropAction}
          show={show_invitation_menu}
          showHandler={() => {
            setShowInvitationMenu(true);
          }}
        />
      )}
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
