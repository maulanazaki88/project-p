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
      // {
      //   bg_color: "",
      //   color: "",
      //   text: "Antrian Masuk",
      //   icon: "/icons/queue_black.svg",
      //   notification: 2,
      // },
      {
        bg_color: "",
        color: "",
        text: "Salin Link",
        icon: "/icons/copy_black.svg",
        onClick: () => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(pathname);
          }
        },
      },
      {
        bg_color: "",
        color: "",
        text: "Pengumuman",
        icon: "/icons/announcement_black.svg",
        onClick: () => {
          setIsNotificationMenuActive(true);
          console.log("SUMMONED NOTIFICATION MENU");
        },
        icon_scale: 1.5
        
      },
    ];

    return (
      <>
        <Navbar
          title={props.data.name}
          menuHandler={() => setIsMenuActive(true)}
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
          }}
          title="New notification"
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
        <BasicMenu
          button_list={menu_list}
          isActive={isMenuActive}
          title="Workspace Menu"
          delete_text="Delete Workspace"
          log_list={props.data.activity_list}
          closeHandler={() => {
            setIsMenuActive(false);
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
                <section className={s.stage}>
                  <ProgressTitle
                    bg_color="#080726"
                    bg_color_accent="#BBE0EF"
                    color="#fff"
                    count={next_up ? next_up.length : 0}
                    title="Next Up"
                    type="NEXT-UP"
                    newTaskHandler={newTaskHandler}
                  />
                  <div className={s.list_screen}>
                    <ul className={s.task_list}>{NextUpViews}</ul>
                  </div>
                </section>
                <section className={s.stage}>
                  <ProgressTitle
                    bg_color="#080726"
                    bg_color_accent="#BBE0EF"
                    color="#fff"
                    count={in_progress ? in_progress.length : 0}
                    title="In Progress"
                    type="IN-PROGRESS"
                    newTaskHandler={newTaskHandler}
                  />
                  <div className={s.list_screen}>
                    <ul className={s.task_list}>{InProgressViews}</ul>
                  </div>
                </section>
                <section className={s.stage}>
                  <ProgressTitle
                    bg_color="#080726"
                    bg_color_accent="#BBE0EF"
                    color="#fff"
                    count={revised ? revised.length : 0}
                    title="Revised"
                    type="REVISED"
                    newTaskHandler={newTaskHandler}
                  />
                  <div className={s.list_screen}>
                    <ul className={s.task_list}>{RevisedViews}</ul>
                  </div>
                </section>
                <section className={s.stage}>
                  <ProgressTitle
                    bg_color="#080726"
                    bg_color_accent="#BBE0EF"
                    color="#fff"
                    count={completed ? completed.length : 0}
                    title="Completed"
                    type="COMPLETED"
                    newTaskHandler={newTaskHandler}
                  />
                  <div className={s.list_screen}>
                    <ul className={s.task_list}>{CompletedViews}</ul>
                  </div>
                </section>
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
