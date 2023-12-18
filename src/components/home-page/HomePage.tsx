"use client";
import s from "./Home.module.css";
import React from "react";
import HomeNavbar from "@/components/home-navbar/HomeNavbar";
import InputSmall from "@/components/input-small/InputSmall";
import SquareButton from "@/components/square-button/SquareButton";
import WorkspaceCard from "@/components/workspace-card/WorkspaceCard";
import TaskCard from "@/components/task-card/TaskCard";
import CardMenu from "@/components/card-menu/CardMenu";
import { CalendarCardProps } from "@/components/calender-card/CalendarCard";
import { NotificationCardProps } from "@/components/notification-card/NotificationCard";
import { TaskType, UserType, WorkspaceType } from "@/type";
import Context, {
  ContextType,
  TaskInit_Act,
  WorkspaceInit_Act,
} from "@/context/Store";
import { useRouter } from "next/navigation";

interface HomePageProps {
  data: UserType;
}

const HomePage: React.FC<HomePageProps> = (props) => {
  const {
    user_data_ctx,
    user_data_handler_ctx,
    initialize_workspaces_ctx,
    initialize_tasks_ctx,
    user_workspaces_ctx,
    user_task_ctx,
  } = React.useContext(Context) as ContextType;

  const actual_user_data: UserType = user_data_ctx ? user_data_ctx : props.data;

  const router = useRouter();

  const [searchInput, setSearchInput] = React.useState<string>("");
  const [calendarMenuActive, setCalendarMenuActive] =
    React.useState<boolean>(false);
  const [notificationMenuActive, setNotificationMenuActive] =
    React.useState<boolean>(false);

  const workspace_list = props.data.workspace_list as WorkspaceType[];

  let task_list: TaskType[] = [];
  let notification_list: NotificationCardProps[] = [];

  for (let item of workspace_list) {
    let tasks: TaskType[] = [];
    for (let task of item.task_list) {
      tasks.push({ ...task, workspace_name: item.name });
    }
    task_list.push(...tasks);
    notification_list.push(...item.notification_list);
  }

  const color_list = ["#BAE0EE", "#E2D3FE", "rgba(28, 6, 45, 0.2)"];

  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const deadlines = task_list.map((task, index) => {
    return task.deadline;
  });

  const deadlines_set = new Set(deadlines);

  const deadlines_set_arr = Array.from(deadlines_set);

  const calendar_list =
    deadlines_set_arr &&
    deadlines_set_arr.map((d, index) => {
      return {
        date: d,
        task_list: task_list.filter((task) => task.deadline === d),
      } as CalendarCardProps;
    });

  React.useEffect(() => {
    user_data_handler_ctx(props.data);
    initialize_workspaces_ctx({
      workspace_list: props.data.workspace_list,
    } as WorkspaceInit_Act);

    const tasks: TaskType[] = [];

    for (let workspace of props.data.workspace_list) {
      for (let task of workspace.task_list) {
        tasks.push({ ...task, workspace_name: workspace.name });
      }
    }

    initialize_tasks_ctx({ task_list: tasks } as TaskInit_Act);
    // router.refresh();
  }, []);

  return (
    <>
      <HomeNavbar
        username={props.data.username}
        calendarHandler={() => {
          setCalendarMenuActive(true);
        }}
        notificationHandler={() => {
          setNotificationMenuActive(true);
        }}
      />
      <CardMenu
        isActive={calendarMenuActive && !notificationMenuActive}
        calendar_list={calendar_list}
        title={"Kalender"}
        closeHandler={() => {
          setCalendarMenuActive(false);
        }}
      />
      <CardMenu
        isActive={notificationMenuActive && !calendarMenuActive}
        notification_list={notification_list}
        title={"Notifikasi"}
        closeHandler={() => {
          setNotificationMenuActive(false);
        }}
      />
      <main className={s.main}>
        <h2 className={[s.header, "big", "medium"].join(" ")}>
          Selamat datang, {props.data.username}!
        </h2>
        <div className={s.dashboard}>
          <InputSmall
            icon="/icons/search.svg"
            label=""
            name="search"
            onChange={searchInputChange}
            placeholder="Cari workspace, tugas"
            type="text"
            value={searchInput}
            warning=""
          />
          <div className={s.workspace}>
            <div className={s.heading}>
              <div className={s.header}>
                <h3 className={[s.title, "md", "medium"].join(" ")}>
                  Workspace
                </h3>
                <p className={[s.subtitle, "sm", "medium", "soft"].join(" ")}>
                  You have {workspace_list.length} workspace
                </p>
              </div>
              <div className={s.action}>
                <SquareButton
                  bg_color="#1C062D"
                  color="#fff"
                  opacity={1}
                  text="Add +"
                  onClick={() => {
                    router.push("/workspace-setup");
                  }}
                />
              </div>
            </div>
            {workspace_list.length > 0 && (
              <div className={s.list_screen}>
                <ul className={s.list}>
                  {workspace_list.map((workspace, index) => {
                    return (
                      <li
                        className={s.item}
                        key={`workspace-item-${index}`}
                        style={{ marginLeft: index > 0 ? "16px" : "0px" }}
                      >
                        <WorkspaceCard
                          description={workspace.description}
                          img={"/ilust/team_1.svg"}
                          members={workspace.member_list}
                          name={workspace.name}
                          key={`workspace-${index}`}
                          bg_color={
                            color_list[
                              (index + color_list.length) % color_list.length
                            ]
                          }
                          id={workspace.w_id}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className={s.todo}>
            <div className={s.heading}>
              <div className={s.header}>
                <h3 className={[s.title, "md", "medium"].join(" ")}>
                  Task To Do
                </h3>
                <p className={[s.subtitle, "sm", "medium", "soft"].join(" ")}>
                  List task to do today {":)"}
                </p>
              </div>
            </div>
            <ul className={s.task_list}>
              {task_list?.map((task, index) => {
                return (
                  <li className={s.item} key={`user-task-${index}`}>
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
              })}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

HomePage.displayName = "HomePage";
export default HomePage;
