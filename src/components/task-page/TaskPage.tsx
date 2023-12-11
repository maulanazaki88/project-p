"use client";
import s from "./TaskPage.module.css";
import React from "react";
import InputLarge from "@/components/input-large/InputLarge";
import Navbar from "@/components/navbar/Navbar";
import { TaskType, WorkspaceType } from "@/type";
import RoundButton from "@/components/round-button/RoundButton";
import SquareButton from "@/components/square-button/SquareButton";
import UsernameButton from "@/components/username-button/UsernameButton";
import ButtonLarge, {
  ButtonLargeProps,
} from "@/components/button-large/ButtonLarge";
import BasicMenu from "@/components/basic-menu/BasicMenu";
import { ActivityLogType } from "@/type";
import Context from "@/context/Store";
import { useRouter } from "next/navigation";
import { useCalendar } from "@/hook/useCalendar";
import Comments from "@/components/comments/Comments";
import { ChatBubbleProps } from "@/components/chat-bubble/ChatBubble";
import { getTask } from "@/server/actions";

interface TaskPageProps {
  data: TaskType;
}

const TaskPage: React.FC<TaskPageProps> = (props) => {
  const router = useRouter();

  const ctx = React.useContext(Context);

  const workspace_list = ctx?.user_workspaces_ctx;
  const workspace_list_handler = ctx?.user_workspaces_handler_ctx;

  const [task, setTask] = React.useState<TaskType>({
    activity_list: props.data.activity_list,
    assigned_member: props.data.assigned_member,
    author: props.data.author,
    comments: props.data.comments,
    created_at: props.data.created_at,
    deadline: props.data.deadline,
    description: props.data.description,
    priority: props.data.priority,
    seen_by: props.data.seen_by,
    status: props.data.status,
    t_id: props.data.t_id,
    title: props.data.title,
    updated_at: props.data.updated_at,
    w_id: props.data.w_id,
    workspace_name: props.data.workspace_name,
  });

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const menu_list: ButtonLargeProps[] = [
    {
      bg_color: "",
      color: "",
      text: "Show in Calendar",
      icon: "/icons/calendar.svg",
    },
  ];

  const [prioritySelect, setPrioritySelect] = React.useState<number>(
    task?.priority === "HIGH" ? 2 : task?.priority === "MED" ? 1 : 0
  );
  const [statusSelect, setStatusSelect] = React.useState<number>(
    task?.status === "NEXT-UP"
      ? 0
      : task?.status === "IN-PROGRESS"
      ? 1
      : task?.status === "REVISED"
      ? 2
      : 3
  );

  const [isMenuActive, setIsMenuActive] = React.useState<boolean>(false);
  const [isCommentsActive, setIsCommentsActive] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    return function cleanUp() {
      if (workspace_list && workspace_list_handler) {
        const workspace = workspace_list.find(
          (workspace) => workspace.w_id === props.data.w_id
        );

        if (workspace) {
          const task_ids = workspace.task_ids;
          if (task_ids.some((id) => id === props.data.t_id)) {
          } else {
            const updated_workspace = {
              ...workspace,
              task_ids: task_ids.concat(props.data.t_id),
            };

            const workspace_list_popped = workspace_list.filter(
              (w) => w.w_id !== props.data.w_id
            );

            workspace_list_handler(
              workspace_list_popped.concat(updated_workspace)
            );
          }
        }
      }
    };
  }, []);
  

  if (task) {
    return (
      <>
        <Navbar
          title={"Detail Tugas"}
          subtitle={task.workspace_name}
          menuHandler={() => setIsMenuActive(true)}
        />
        <BasicMenu
          button_list={menu_list}
          log_list={task.activity_list}
          isActive={isMenuActive && !isCommentsActive}
          title="Task Menu"
          delete_text="Delete Task"
          closeHandler={() => {
            setIsMenuActive(false);
          }}
        />
        <Comments
          chat_list={task.comments}
          closeHandler={() => {
            setIsCommentsActive(false);
          }}
          task_name={task.title}
          workspace_name={task.workspace_name}
          isActive={isCommentsActive && !isMenuActive}
        />
        <main className={s.main}>
          <section className={s.task}>
            <div className={[s.name, "medium", "big"].join(" ")}>
              <p className={[s.label, "medium", "md"].join(" ")}>Nama Task</p>
              <input
                className={[s.name_inp, "medium", "big"].join(" ")}
                value={task.title}
                id="title"
                type="text"
                name="title"
                onChange={changeHandler}
              />
            </div>
            <div className={s.desc}>
              <InputLarge
                onChange={changeHandler}
                label="Deskripsi Task"
                name="description"
                placeholder="📋 Deskripsi"
                value={task.description}
              />
            </div>
            <div className={s.deadline}>
              <p className={[s.label, "medium", "md"].join(" ")}>Deadline</p>
              <div className={s.content}>
                <RoundButton
                  color="rgba(0, 0, 0, 0.08)"
                  icon="/icons/calendar.svg"
                  opacity={1}
                />
                <span className={[s.date, "sm", "medium"].join(" ")}>
                  {useCalendar(task.deadline, ["d", "m"])}
                </span>
              </div>
            </div>
            <div className={s.priority}>
              <p className={[s.label, "medium", "md"].join(" ")}>Priority</p>
              <div className={s.content}>
                <ul className={s.list}>
                  <li className={s.item}>
                    <SquareButton
                      bg_color={
                        prioritySelect == 0 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                      }
                      color={prioritySelect == 0 ? "#fff" : "#1C062D"}
                      opacity={1}
                      text="Low"
                      onClick={() => {
                        setPrioritySelect(0);
                      }}
                      key={"low-priority-btn"}
                    />
                  </li>
                  <li className={s.item}>
                    <SquareButton
                      bg_color={
                        prioritySelect == 1 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                      }
                      color={prioritySelect == 1 ? "#fff" : "#1C062D"}
                      opacity={1}
                      text="Med"
                      key={"med-priority-btn"}
                      onClick={() => {
                        setPrioritySelect(1);
                      }}
                    />
                  </li>
                  <li className={s.item}>
                    <SquareButton
                      bg_color={
                        prioritySelect == 2 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                      }
                      color={prioritySelect == 2 ? "#fff" : "#1C062D"}
                      opacity={1}
                      text="High"
                      onClick={() => {
                        setPrioritySelect(2);
                      }}
                      key={"high-priority-btn"}
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className={s.participants}>
              <p className={[s.label, "medium", "md"].join(" ")}>
                Participants
              </p>
              <div className={s.content}>
                <SquareButton
                  bg_color="rgba(0, 0, 0, 0.08)"
                  color="#1C062D"
                  opacity={0.5}
                  text=""
                  icon="/icons/plus.svg"
                  key={"plus-btn"}
                />
                <ul className={s.list}>
                  {task.assigned_member.map((member, index) => {
                    return (
                      <li
                        className={s.item}
                        key={`assigned-member-${index}`}
                        style={{ marginLeft: index > 0 ? "12px" : "0px" }}
                      >
                        <UsernameButton username={member.username} withDelete />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={s.status}>
              <p className={[s.label, "medium", "md"].join(" ")}>Status</p>
              <div className={s.content}>
                <ul className={s.list}>
                  <li className={s.item}>
                    <SquareButton
                      bg_color={
                        statusSelect == 0 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                      }
                      color={statusSelect == 0 ? "#fff" : "#1C062D"}
                      opacity={1}
                      text="Next up"
                      onClick={() => {
                        setStatusSelect(0);
                      }}
                      key={"next-up-status-btn"}
                    />
                  </li>
                  <li className={s.item}>
                    <SquareButton
                      bg_color={
                        statusSelect == 1 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                      }
                      color={statusSelect == 1 ? "#fff" : "#1C062D"}
                      opacity={1}
                      text="In progress"
                      onClick={() => {
                        setStatusSelect(1);
                      }}
                      key={"in-progress-status-btn"}
                    />
                  </li>
                  <li className={s.item}>
                    <SquareButton
                      bg_color={
                        statusSelect == 2 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                      }
                      color={statusSelect == 2 ? "#fff" : "#1C062D"}
                      opacity={1}
                      text="Revised"
                      onClick={() => {
                        setStatusSelect(2);
                      }}
                      key={"revised-status-btn"}
                    />
                  </li>
                  <li className={s.item}>
                    <SquareButton
                      bg_color={
                        statusSelect == 3 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                      }
                      color={statusSelect == 3 ? "#fff" : "#1C062D"}
                      opacity={1}
                      text="Completed"
                      onClick={() => {
                        setStatusSelect(3);
                      }}
                      key={"completed-status-btn"}
                    />
                  </li>
                </ul>
              </div>
            </div>
            <ButtonLarge
              bg_color="#080726"
              color="#fff"
              text="Comments"
              icon="/icons/comment_white.svg"
              key={"comment-btn"}
              onClick={() => {
                setIsCommentsActive(true);
              }}
            />
          </section>
        </main>
      </>
    );
  }
};

export default TaskPage;
