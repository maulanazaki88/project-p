"use client";
import s from "./Workspace.module.css";
import React from "react";
import ProgressTitle from "@/components/progress-title/ProgressTitle";
import Navbar from "@/components/navbar/Navbar";
import OnlineBar from "@/components/online-bar/OnlineBar";
import Context, { ContextType } from "@/context/Store";
import TaskCard from "@/components/task-card/TaskCard";
import BasicMenu from "@/components/basic-menu/BasicMenu";
import { ButtonLargeProps } from "@/components/button-large/ButtonLarge";
import {
  ActivityLogType,
  ProgressStatusType,
  TaskType,
  UserType,
  WorkspaceType,
} from "@/type";
import { useRouter } from "next/navigation";
import { getWorkspace } from "@/server/actions";
import { useDateNow } from "@/hook/useDateNow";
import CardMenu from "../card-menu/CardMenu";
import { usePathname } from "next/navigation";
import FormMenu from "../from-menu/FormMenu";
import { WorkspaceInit_Act, TaskInit_Act } from "@/context/Store";
import { useIdGenerator } from "@/hook/useIdGenerator";
import WaitingList from "../waiting-list/WaitingList";
import MemberList from "../member-list/MemberList";
import InvitationMenu from "../invitation-menu/InvitationMenu";
import TaskStageSection from "../task-stage-section/TaskStageSection";

interface WorkspacePageProps {
  data: WorkspaceType;
}

const WorkspacePage: React.FC<WorkspacePageProps> = (props) => {
  const { task_create_ctx } = React.useContext(Context) as ContextType;

  const router = useRouter();
  const pathname = usePathname();
  const id_generator = useIdGenerator();
  const date_now = useDateNow();

  const u_id = pathname.split("/")[2];
  const w_id = pathname.split("/")[4];

  const {
    display_width_ctx,
    user_data_ctx,
    user_data_handler_ctx,
    initialize_workspaces_ctx,
    initialize_tasks_ctx,
    user_workspaces_ctx,
    workspace_create_announcement_ctx,
    user_task_ctx,
    workspace_create_ctx,
    workspace_delete_ctx,
    owner_acc_user_add_workspace_ctx,
    owner_reject_user_add_workspace_ctx,
    owner_kick_user_workspace,
    user_exit_workspace,
  } = React.useContext(Context) as ContextType;

  const screenRef = React.useRef<HTMLDivElement | null>(null);

  const pointerUpHandler = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const screen = screenRef.current;
      if (display_width_ctx && screen) {
        const mid_point = display_width_ctx / 2;
        const scrollLeft = screen.scrollLeft;
        if (scrollLeft < mid_point) {
          screen.scrollTo({ left: 0, behavior: "smooth" });
        } else if (scrollLeft > mid_point && scrollLeft < mid_point * 3) {
          screen.scrollTo({ left: display_width_ctx, behavior: "smooth" });
        } else if (scrollLeft > mid_point * 3 && scrollLeft < mid_point * 5) {
          screen.scrollTo({ left: display_width_ctx * 2, behavior: "smooth" });
        } else if (scrollLeft > mid_point * 5) {
          screen.scrollTo({ left: display_width_ctx * 3, behavior: "smooth" });
        }
      }
    },
    [display_width_ctx]
  );

  const [isMenuActive, setIsMenuActive] = React.useState<boolean>(false);
  const [isNotificationMenuActive, setIsNotificationMenuActive] =
    React.useState<boolean>(false);
  const [showNotificationForm, setShowNotificationForm] =
    React.useState<boolean>(false);
  const [verifyId, setVerifyId] = React.useState<string | null>(null);
  const [showOverlay, setShowOverlay] = React.useState<boolean>(false);
  const [deletePromptActive, setDeletePromptActive] =
    React.useState<boolean>(false);
  const [deletePromptWarning, setDeletePromptWarning] =
    React.useState<string>("-");

  const [showWaitingList, setShowWaitingList] = React.useState<boolean>(false);
  const [showMemberList, setShowMemberList] = React.useState<boolean>(false);
  const [showInvitationMenu, setShowInvitationMenu] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (deletePromptActive) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [deletePromptActive]);

  const exitWorkspaceHandler = async (u_id: string, w_id: string) => {
    const data = await user_exit_workspace(u_id, w_id);

    const updated_one = await data.updated_one;

    if (updated_one && updated_one > 0) {
      console.log("Yeyyyy");
      router.replace(`/home/${u_id}`);
    }
  };

  const kickHandler = async (u_id: string, w_id: string, kick_id: string) => {
    const data = await owner_kick_user_workspace(u_id, w_id, kick_id);

    const updated_count = await data.updated_count;

    if (updated_count && updated_count > 0) {
      console.log("Yeyyyy");
    }
  };

  // React.useEffect(() => {
  //   // user_data_handler_ctx(props.user_data);

  //   if (!user_data_ctx) {
  //     user_data_handler_ctx(props.user_data);
  //     initialize_workspaces_ctx({
  //       workspace_list: props.user_data.workspace_list,
  //     } as WorkspaceInit_Act);

  //     const tasks: TaskType[] = [];

  //     for (let workspace of props.user_data.workspace_list) {
  //       for (let task of workspace.task_list) {
  //         tasks.push({ ...task, workspace_name: workspace.name });
  //       }
  //     }

  //     initialize_tasks_ctx({ task_list: tasks } as TaskInit_Act);
  //   }

  //   // router.refresh();

  //   // update data user jika belum terdapat workspace baru yang ditambahkan
  // }, []);

  if (props.data !== undefined) {
    const t_id = id_generator.task();
    const date_time = date_now.withTime();
    const date_ = date_now.withoutTime();

    const newTaskHandler = async (t: ProgressStatusType) => {
      console.log("CLICKED")
      const new_task: TaskType = {
        activity_list: [],
        assigned_member: [],
        author: user_data_ctx ? user_data_ctx.username : "",
        comments: [],
        created_at: date_time,
        deadline: date_,
        description: "",
        priority: "MED",
        seen_by: [],
        status: t,
        t_id: t_id,
        title: "Tanpa Judul",
        updated_at: date_time,
        w_id: w_id,
        workspace_name: "",
      };

      const data = await task_create_ctx(t_id, {
        task: new_task,
        u_id: u_id,
        w_id: w_id,
      });

      if (data && data.updated_count === 1) {
        console.log("yeyyy");
        router.replace(`/home/${u_id}/workspace/${w_id}/task/${t_id}`);
      } else {
        console.log("Update failed huhu 😭");
      }
    };

    const next_up = user_task_ctx.filter(
      (task) => task.status === "NEXT-UP" && task.w_id === w_id
    );

    const in_progress = user_task_ctx?.filter(
      (task) => task.status === "IN-PROGRESS" && task.w_id === w_id
    );

    const revised = user_task_ctx?.filter(
      (task) => task.status === "REVISED" && task.w_id === w_id
    );

    const completed = user_task_ctx?.filter(
      (task) => task.status === "COMPLETED" && task.w_id === w_id
    );

    const NextUpViews = next_up ? (
      next_up.map((task, index) => {
        return (
          <li className={s.task} key={`next-up-${index}`}>
            <TaskCard
              assigned_member={task.assigned_member}
              comments_count={task.comments.length}
              deadline={task.deadline}
              description={task.description}
              name={task.title}
              priority={task.priority}
              w_id={task.w_id}
              id={task.t_id}
            />
          </li>
        );
      })
    ) : (
      <span className={[s.no_task, "sm", "reguler"].join(" ")}>
        Currently no task
      </span>
    );

    const InProgressViews = in_progress ? (
      in_progress.map((task, index) => {
        return (
          <li className={s.task} key={`in-progress-${index}`}>
            <TaskCard
              assigned_member={task.assigned_member}
              comments_count={task.comments.length}
              deadline={task.deadline}
              description={task.description}
              name={task.title}
              priority={task.priority}
              w_id={task.w_id}
              id={task.t_id}
            />
          </li>
        );
      })
    ) : (
      <span className={[s.no_task, "sm", "reguler"].join(" ")}>
        Currently no task
      </span>
    );

    const RevisedViews = revised ? (
      revised.map((task, index) => {
        return (
          <li className={s.task} key={`revised-${index}`}>
            <TaskCard
              assigned_member={task.assigned_member}
              comments_count={task.comments.length}
              deadline={task.deadline}
              description={task.description}
              name={task.title}
              priority={task.priority}
              w_id={task.w_id}
              id={task.t_id}
            />
          </li>
        );
      })
    ) : (
      <span className={[s.no_task, "sm", "reguler"].join(" ")}>
        Currently no task
      </span>
    );

    const CompletedViews = completed ? (
      completed.map((task, index) => {
        return (
          <li className={s.task} key={`completed-${index}`}>
            <TaskCard
              assigned_member={task.assigned_member}
              comments_count={task.comments.length}
              deadline={task.deadline}
              description={task.description}
              name={task.title}
              priority={task.priority}
              w_id={task.w_id}
              id={task.t_id}
            />
          </li>
        );
      })
    ) : (
      <span className={[s.no_task, "sm", "reguler"].join(" ")}>
        Currently no task
      </span>
    );

    const menu_list: ButtonLargeProps[] = [
      {
        bg_color: "",
        color: "",
        text: "Edit Workspace",
        icon: "/icons/edit_black.svg",
        onClick: () => {
          router.push(`/home/${u_id}/workspace-setup/${props.data?.w_id}`);
        },
      },
      {
        bg_color: "",
        color: "",
        text: "Daftar Anggota",
        icon: "/icons/team_black.svg",
        onClick: () => {
          setShowMemberList(true);
        },
        icon_scale: 1.5,
      },
      {
        bg_color: "",
        color: "",
        text: "Antrian Bergabung",
        icon: "/icons/queue_black.svg",
        notification: 2,
        onClick: () => {
          setShowWaitingList(true);
        },
      },
      // {
      //   bg_color: "",
      //   color: "",
      //   text: "Salin Link",
      //   icon: "/icons/copy_black.svg",
      //   onClick: () => {
      //     if (navigator.clipboard) {
      //       navigator.clipboard.writeText(pathname);
      //     }
      //   },
      // },
      {
        bg_color: "",
        color: "",
        text: "Pengumuman",
        icon: "/icons/announcement_black.svg",
        onClick: () => {
          setIsNotificationMenuActive(true);
          console.log("SUMMONED NOTIFICATION MENU");
        },
        icon_scale: 1.5,
      },
      {
        bg_color: "",
        color: "",
        text: "Keluar Workspace",
        icon: "/icons/exit_black.svg",

        onClick: () => {
          exitWorkspaceHandler(u_id, w_id);
        },
        icon_scale: 1,
      },
    ];

    const deleteHandler = async (value: string) => {
      if (value === props.data.name) {
        const response = await workspace_delete_ctx(props.data.w_id, {
          author_id: u_id,
        });

        const deleted_count = await response.deleted_count;

        if (deleted_count > 0) {
          router.back();
        }
      } else {
        setDeletePromptWarning("Nama yang dimasukan tidak sama!");
        setTimeout(() => {
          setDeletePromptWarning("-");
        }, 3000);
      }
    };

    const overlayAction = () => {
      setDeletePromptActive(false);
    };

    return (
      <>
        <div
          className={s.overlay}
          style={{
            position: "fixed",
            zIndex: 888,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000",
            opacity: 0.5,
            display: showOverlay ? "block" : "none",
          }}
          onClick={overlayAction}
        />
        <Navbar
          title={props.data.name}
          menuHandler={() => setIsMenuActive(true)}
        />
        <FormMenu
          closeHandler={() => setDeletePromptActive(false)}
          label={`Ketik: "${props.data.name}"`}
          name="name"
          show={deletePromptActive}
          submitHandler={({ key, value }) => {
            deleteHandler(value);
          }}
          title="Hapus Workspace"
          type="SMALL"
          hideInputInfo
          placeholder={`Ketik nama untuk menghapus`}
          key={"workspace-delete-prompt"}
          button_color="red"
          button_text="Hapus"
          warning={deletePromptWarning}
        />
        <FormMenu
          closeHandler={() => setShowNotificationForm(false)}
          label="Notification"
          name="notification"
          show={showNotificationForm}
          submitHandler={(d) => {
            workspace_create_announcement_ctx(w_id, {
              notification: {
                message: d.value,
                created_at: date_now.withTime(),
                username: user_data_ctx?.username
                  ? user_data_ctx?.username
                  : "",
                w_id: w_id,
              },
              u_id: user_data_ctx?.username ? user_data_ctx?.username : "",
            });
            setShowNotificationForm(false);
          }}
          title="New notification"
          type="LARGE"
          key={"workspace-notification-form"}
          button_color="#1c062d"
          button_text="Submit"
        />
        <CardMenu
          closeHandler={() => {
            setIsNotificationMenuActive(false);
          }}
          isActive={isNotificationMenuActive}
          title="Notification"
          notification_list={props.data.notification_list}
          newNotificationHandler={() => {
            setShowNotificationForm(true);
          }}
        />
        <MemberList
          closeHandler={() => {
            setShowMemberList(false);
          }}
          kickHandler={(data) => {
            kickHandler(u_id, w_id, data.u_id);
          }}
          list={props.data.member_list}
          show={showMemberList}
          w_id={w_id}
          workspace_name={props.data.name}
          showWaitingListHandler={() => {
            setShowWaitingList(true);
          }}
          showInvitationMenuHandler={() => {
            setShowInvitationMenu(true);
          }}
        />
        <WaitingList
          accHandler={(data) => {
            owner_acc_user_add_workspace_ctx(u_id, data.w_id, {
              u_id: u_id,
              candidate: { u_id: data.u_id, username: data.username },
            });
          }}
          closeHandler={() => {
            setShowWaitingList(false);
          }}
          list={props.data.waiting_list}
          rejHandler={(data) => {
            owner_reject_user_add_workspace_ctx(u_id, data.w_id, {
              u_id: u_id,
              candidate: { u_id: data.u_id, username: data.username },
            });
          }}
          show={showWaitingList}
          workspace_name={props.data.name}
          w_id={props.data.w_id}
        />
        <InvitationMenu
          closeHandler={() => {
            setShowInvitationMenu(false);
          }}
          show={showInvitationMenu}
          showHandler={() => {
            setShowInvitationMenu(true);
          }}
        />
        <BasicMenu
          button_list={menu_list}
          isActive={isMenuActive}
          title="Workspace Menu"
          delete_text="Delete Workspace"
          log_list={props.data.activity_list}
          closeHandler={() => {
            setIsMenuActive(false);
          }}
          deleteHandler={() => {
            setDeletePromptActive(true);
          }}
        />

        <main className={s.main}>
          <div className={s.task_board}>
            <OnlineBar users={props.data.member_list} />
            <div
              className={s.selection_screen}
              ref={screenRef}
              onTouchEnd={pointerUpHandler}
            >
              <div className={s.selection_display}>
                <TaskStageSection
                  newTask={newTaskHandler}
                  status="NEXT-UP"
                  task_list={next_up}
                  title="Next Up"
                  key={"next-up-stage-section"}
                  members={props.data.member_list}
                />
                <TaskStageSection
                  newTask={newTaskHandler}
                  status="IN-PROGRESS"
                  task_list={in_progress}
                  title="In Progress"
                  key={"in-progress-stage-section"}
                  members={props.data.member_list}
                />
                <TaskStageSection
                  newTask={newTaskHandler}
                  status="REVISED"
                  task_list={revised}
                  title="Revised"
                  key={"revised-stage-section"}
                  members={props.data.member_list}
                />
                <TaskStageSection
                  newTask={newTaskHandler}
                  status="COMPLETED"
                  task_list={completed}
                  title="Completed"
                  key={"completed-stage-section"}
                  members={props.data.member_list}
                />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    router.replace(`/home/${pathname.split("/")[2]}`);
  }
};

export default WorkspacePage;
