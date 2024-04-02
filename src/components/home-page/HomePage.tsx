"use client";
import s from "./Home.module.css";
import React from "react";
import SquareButton from "@/components/square-button/SquareButton";
import CardMenu from "@/components/card-menu/CardMenu";
import { CalendarCardProps } from "@/components/calender-card/CalendarCard";
import { NotificationCardProps } from "@/components/notification-card/NotificationCard";
import { TaskType, UserType, WorkspaceType } from "@/type";
import Context, { ContextType } from "@/context/Store";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import { DateFormater } from "@/utils/DateFormater";
import WorkspaceList from "./WorkspaceList";
import TaskList from "./TaskList";

interface HomePageProps {
  data: UserType;
}

const poppins = Poppins({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
});

const HomePage: React.FC<HomePageProps> = (props) => {
  const {
    user_data_ctx,
    user_data_handler_ctx,
    initialize_workspaces_ctx,
    initialize_tasks_ctx,
    user_workspaces_ctx,
    user_task_ctx,
    logout_ctx,
  } = React.useContext(Context) as ContextType;

  const actual_user_data: UserType = user_data_ctx ? user_data_ctx : props.data;

  const router = useRouter();
  const pathname = usePathname();

  const u_id = pathname.split("/")[2];

  const [searchInput, setSearchInput] = React.useState<string>("");
  const [calendarMenuActive, setCalendarMenuActive] =
    React.useState<boolean>(false);
  const [notificationMenuActive, setNotificationMenuActive] =
    React.useState<boolean>(false);

  const [showLogoutPopup, setShowLogoutPopup] = React.useState<boolean>(false);
  const [hide_task_list_scroll, setHideTaskListScroll] =
    React.useState<boolean>(true);

  const [hide_workspace_list_scroll, setHideWorkspaceListScroll] =
    React.useState<boolean>(true);

  const workspace_list = props.data.workspace_list as WorkspaceType[];

  const task_list = workspace_list
    .map((w, index) => {
      // console.log(index);
      // console.log("task list inside map: ", w.task_list);
      return w.task_list.map((task) => {
        return {
          ...task,
          workspace_name: w.name,
        } as TaskType;
      });
    })
    .flat(1);
  // let m = 0;
  // let n = 0;
  // for (let workspace of workspace_list) {
  //   let tasks: TaskType[] = [];
  //   m++;
  //   for (let task of workspace.task_list) {
  //     n++;
  //     tasks.push({ ...task, workspace_name: workspace.name });
  //   }
  //   console.log("tasks in loop: ", tasks);
  //   task_list.push(...tasks);
  // }

  // console.log("count", { m: m, n: n });
  console.log("task_list", task_list);

  const calendar_list = React.useMemo(() => {
    const deadlines = task_list.slice(0).map((task, index) => {
      return task.deadline;
    });

    const deadlines_set = new Set(deadlines);

    const deadlines_set_arr = Array.from(deadlines_set);

    const calendar_list =
      deadlines_set_arr &&
      deadlines_set_arr.map((d, index) => {
        return {
          date: DateFormater(new Date(d)),
          task_list: task_list.filter((task) => task.deadline === d),
        } as CalendarCardProps;
      });

    return calendar_list.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);

      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return 0;
      }
    });
  }, [props]);

  console.log("calendar list: ", calendar_list);

  const notification_list: NotificationCardProps[] = workspace_list
    .map((w, index) => {
      return w.notification_list.map((n) => {
        return {
          ...n,
          w_id: w.w_id,
        } as NotificationCardProps;
      });
    })
    .flat(1);

  const color_list = ["#BAE0EE", "#E2D3FE", "rgba(28, 6, 45, 0.2)"];

  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const logoutHandler = () => {
    logout_ctx();
    router.replace("/");
  };

  return (
    <>
      {/* <HomeNavbar
        username={props.data.username}
        calendarHandler={() => {
          setCalendarMenuActive(true);
        }}
        notificationHandler={() => {
          setNotificationMenuActive(true);
        }}
        showLogoutPopup={showLogoutPopup}
        logoutHandler={logoutHandler}
        showLogoutPopupHandler={() => {
          setShowLogoutPopup(!showLogoutPopup);
        }}
      /> */}
      <CardMenu
        isActive={calendarMenuActive && !notificationMenuActive}
        calendar_list={calendar_list}
        title={"Calendar"}
        closeHandler={() => {
          setCalendarMenuActive(false);
        }}
      />
      <CardMenu
        isActive={notificationMenuActive && !calendarMenuActive}
        notification_list={notification_list}
        title={"Notification"}
        closeHandler={() => {
          setNotificationMenuActive(false);
        }}
      />
      <main className={s.main}>
        <h2
          className={[s.main_title, "big", "medium", poppins.className].join(
            " "
          )}
        >
          Welcome, {props.data.username}!
        </h2>
        <div className={s.dashboard}>
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
                  text="Add"
                  onClick={() => {
                    router.push(`${pathname}/workspace-setup`);
                  }}
                />
              </div>
            </div>
            <WorkspaceList
              searchInput={searchInput}
              workspace_list={workspace_list}
            />
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
            <TaskList searchInput={searchInput} task_list={task_list} />
          </div>
        </div>
      </main>
    </>
  );
};

HomePage.displayName = "HomePage";
export default HomePage;
