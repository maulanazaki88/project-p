"use client";
import s from "./Workspace.module.css";
import React from "react";
import ProgressTitle from "@/components/progress-title/ProgressTitle";
import Navbar from "@/components/navbar/Navbar";
import OnlineBar from "@/components/online-bar/OnlineBar";
import Context from "@/context/Store";
import TaskCard from "@/components/task-card/TaskCard";
import BasicMenu from "@/components/basic-menu/BasicMenu";
import { ButtonLargeProps } from "@/components/button-large/ButtonLarge";
import { ActivityLogType } from "@/type";

const WorkspacePage: React.FC = () => {
  const ctx = React.useContext(Context);
  const display_width = ctx?.display_width_ctx;

  const workspace = ctx?.user_workspaces_ctx?.find(
    (workspace) => workspace.w_id === "workspace-1"
  );

  const user_task = ctx?.user_task_ctx;

  const next_up = user_task?.filter(
    (task) => task.status === "NEXT-UP" && task.w_id === "workspace-1"
  );
  const in_progress = user_task?.filter(
    (task) => task.status === "IN-PROGRESS" && task.w_id === "workspace-1"
  );
  const revised = user_task?.filter(
    (task) => task.status === "REVISED" && task.w_id === "workspace-1"
  );
  const completed = user_task?.filter(
    (task) => task.status === "COMPLETED" && task.w_id === "workspace-1"
  );

  const screenRef = React.useRef<HTMLDivElement | null>(null);

  const scrollLoger = () => {
    if (screenRef) {
      console.log(screenRef.current?.scrollLeft);
    }
  };

  const pointerUpHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    const screen = screenRef.current;
    if (display_width && screen) {
      const mid_point = display_width / 2;
      const scrollLeft = screen.scrollLeft;
      if (scrollLeft < mid_point) {
        screen.scrollTo({ left: 0, behavior: "smooth" });
      } else if (scrollLeft > mid_point && scrollLeft < mid_point * 3) {
        screen.scrollTo({ left: display_width, behavior: "smooth" });
      } else if (scrollLeft > mid_point * 3 && scrollLeft < mid_point * 5) {
        screen.scrollTo({ left: display_width * 2, behavior: "smooth" });
      } else if (scrollLeft > mid_point * 5) {
        screen.scrollTo({ left: display_width * 3, behavior: "smooth" });
      }
    }
  };

  const NextUpViews = next_up ? (
    next_up.map((task, index) => {
      return (
        <li className={s.task} key={`next-up-${index}`}>
          <TaskCard
            assigned_member={task.assigned_member}
            comments_count={task.comments_count}
            deadline={task.deadline}
            description={task.description}
            name={task.title}
            priority={task.priority}
            w_id={task.w_id}
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
            comments_count={task.comments_count}
            deadline={task.deadline}
            description={task.description}
            name={task.title}
            priority={task.priority}
            w_id={task.w_id}
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
            comments_count={task.comments_count}
            deadline={task.deadline}
            description={task.description}
            name={task.title}
            priority={task.priority}
            w_id={task.w_id}
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
            comments_count={task.comments_count}
            deadline={task.deadline}
            description={task.description}
            name={task.title}
            priority={task.priority}
            w_id={task.w_id}
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
    },
    {
      bg_color: "",
      color: "",
      text: "Antrian Masuk",
      icon: "/icons/queue_black.svg",
      notification: 2,
    },
    {
      bg_color: "",
      color: "",
      text: "Salin Link",
      icon: "/icons/copy_black.svg",
      
    },
  ];

  const log_list: ActivityLogType[] = [
    {
      a_id: "",
      activity_desc: "maulana open this task",
      created_at: "2023-2-2",
      t_id: "",
      u_id: "",
      w_id: "",
    },
    {
      a_id: "",
      activity_desc: "tuslam open this task",
      created_at: "2023-2-2",
      t_id: "",
      u_id: "",
      w_id: "",
    },
  ];

  const [isMenuActive, setIsMenuActive] = React.useState<boolean>(true);

  return (
    <>
      <Navbar title="Workspace 1" subtitle="Task list" />
      <BasicMenu
        button_list={menu_list}
        isActive={isMenuActive}
        title="Workspace Menu"
        delete_text="Delete Workspace"
        log_list={log_list}
      />
      <main className={s.main}>
        <div className={s.task_board}>
          <OnlineBar users={workspace ? workspace.member_list : []} />
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
};

export default WorkspacePage;
