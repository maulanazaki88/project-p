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
import {
  ActivityLogType,
  ProgressStatusType,
  TaskType,
  WorkspaceType,
} from "@/type";
import { useRouter } from "next/navigation";
import { getWorkspace } from "@/server/actions";
import { useDateNow } from "@/hook/useDateNow";

interface WorkspacePageProps {
  data: WorkspaceType;
}

const WorkspacePage: React.FC<WorkspacePageProps> = (props) => {
  const ctx = React.useContext(Context);
  const display_width = ctx?.display_width_ctx;

  const user_data = ctx?.user_data_ctx;

  const router = useRouter();

  const task_list = props.data.task_list as TaskType[];

  const next_up = task_list.filter(
    (task) =>
      task.status === "NEXT-UP" &&
      task.w_id === encodeURIComponent(props.data.w_id)
  );
  const in_progress = task_list?.filter(
    (task) =>
      task.status === "IN-PROGRESS" &&
      task.w_id === encodeURIComponent(props.data.w_id)
  );
  const revised = task_list?.filter(
    (task) =>
      task.status === "REVISED" &&
      task.w_id === encodeURIComponent(props.data.w_id)
  );
  const completed = task_list?.filter(
    (task) =>
      task.status === "COMPLETED" &&
      task.w_id === encodeURIComponent(props.data.w_id)
  );

  const screenRef = React.useRef<HTMLDivElement | null>(null);

  const scrollLoger = () => {
    if (screenRef) {
      console.log(screenRef.current?.scrollLeft);
    }
  };

  const pointerUpHandler = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
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
    },
    [display_width]
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

  const [isMenuActive, setIsMenuActive] = React.useState<boolean>(false);
  const [verifyId, setVerifyId] = React.useState<string | null>(null);

  const newTaskHandler = async (t: ProgressStatusType) => {
    const data: TaskType = {
      activity_list: [],
      assigned_member: [],
      author: user_data ? user_data.username : "",
      comments: [],
      created_at: useDateNow(),
      deadline: useDateNow(),
      description: "",
      priority: "MED",
      seen_by: [],
      status: t,
      t_id: "",
      title: "Tanpa Judul",
      updated_at: useDateNow(),
      w_id: props.data.w_id,
      workspace_name: props.data.name,
    };

    const response = await fetch("/api/create-task", {
      body: JSON.stringify(data),
      headers: { "content-type": "json/application" },
      method: "POST",
    });

    const res = await response.json();

    const message = await res.message;

    if ((await message) === "success" && response.status == 200) {
      console.log("yeyyy");
      setVerifyId(await res.t_id);
    } else {
      router.refresh();
    }
  };

  React.useEffect(() => {
    if (verifyId) {
      router.push(`/task/${verifyId}`);
    }
  }, [verifyId]);

  return (
    <>
      <Navbar
        title={props.data.name}
        subtitle="Task list"
        menuHandler={() => setIsMenuActive(true)}
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
};

export default WorkspacePage;
