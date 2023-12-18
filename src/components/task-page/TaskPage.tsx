"use client";
import s from "./TaskPage.module.css";
import React from "react";
import InputLarge from "@/components/input-large/InputLarge";
import Navbar from "@/components/navbar/Navbar";
import { TaskType, UserType, WorkspaceType } from "@/type";
import RoundButton from "@/components/round-button/RoundButton";
import SquareButton from "@/components/square-button/SquareButton";
import UsernameButton from "@/components/username-button/UsernameButton";
import ButtonLarge, {
  ButtonLargeProps,
} from "@/components/button-large/ButtonLarge";
import BasicMenu from "@/components/basic-menu/BasicMenu";
import { ActivityLogType } from "@/type";
import Context, { ContextType } from "@/context/Store";
import { useRouter } from "next/navigation";
import { useCalendar } from "@/hook/useCalendar";
import Comments from "@/components/comments/Comments";
import { ChatBubbleProps } from "@/components/chat-bubble/ChatBubble";
import { getTask } from "@/server/actions";
import CalendarInput from "../calender-input/CalendarInput";
import { useDateNow } from "@/hook/useDateNow";
import MemberListMenu, {
  MemberListMenuMemo,
} from "../member-list-menu/MemberListMenu";
import { usePathname } from "next/navigation";
import { WorkspaceInit_Act, TaskInit_Act } from "@/context/Store";

interface TaskPageProps {
  task_data: TaskType;
  user_data: UserType;
}

const TaskPage: React.FC<TaskPageProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();

  const u_id = pathname.split("/")[2];

  const {
    user_data_handler_ctx,
    initialize_tasks_ctx,
    initialize_workspaces_ctx,
    user_workspaces_ctx,
    task_add_comment_ctx,
    task_change_title_ctx,
    task_change_participants_ctx,
    task_change_status_ctx,
    task_change_deadline_ctx,
    task_change_priority_ctx,
    task_delete_ctx,
    user_task_ctx,
    user_data_ctx,
    task_change_description_ctx,
  } = React.useContext(Context) as ContextType;

  const actual_task: TaskType = React.useMemo(() => {
    const task = user_task_ctx?.find((task) => {
      task.t_id === props.task_data.t_id;
    });
    return task ? task : props.task_data;
  }, [user_task_ctx]);

  React.useEffect(() => {
    if (user_task_ctx) {
      const task = user_task_ctx.find((t) => t.t_id === props.task_data.t_id);
      console.log(task);
    }
  }, [user_task_ctx]);

  const getWorkspaceName = (id: string) => {
    if (user_workspaces_ctx) {
      const workspace = user_workspaces_ctx.find((w) => w.w_id === id);
      if (workspace) {
        const name = workspace.name;
        return name;
      } else {
        return "No Workspace";
      }
    } else {
      return "No Workspace";
    }
  };

  const getWorkspaceMember = (id: string) => {
    if (user_workspaces_ctx) {
      const workspace = user_workspaces_ctx.find((w) => w.w_id === id);
      if (workspace) {
        const member = workspace.member_list;
        return member;
      } else {
        return [];
      }
    } else {
      return [];
    }
  };

  const [taskForm, setTaskForm] = React.useState<{
    title: string;
    description: string;
  }>({
    title: actual_task.title,
    description: actual_task.description,
  });

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTaskForm((prev) => {
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

  const [isCalendarActive, setIsCalendarActive] =
    React.useState<boolean>(false);

  const [isMenuActive, setIsMenuActive] = React.useState<boolean>(false);
  const [isCommentsActive, setIsCommentsActive] =
    React.useState<boolean>(false);
  const [isMemberListMenuActive, setIsMemberListMenuActive] =
    React.useState<boolean>(false);

  const [startDate, setStartDate] = React.useState<string>(useDateNow);

  //   React.useEffect(() => {
  //     const data: TaskType = {
  //       ...task,
  //       priority:
  //         prioritySelect === 0 ? "LOW" : prioritySelect === 1 ? "MED" : "HIGH",
  //       status:
  //         statusSelect === 0
  //           ? "NEXT-UP"
  //           : statusSelect === 1
  //           ? "IN-PROGRESS"
  //           : statusSelect === 2
  //           ? "REVISED"
  //           : "COMPLETED",
  //     };
  //     fetch(`/api/update-task/${props.data.t_id}`, {
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       method: "PUT",
  //       body: JSON.stringify(data),
  //     })
  //       .then((res) => res.json())
  //       .then((data: any) => {
  //         console.log(data);
  //       });
  //   }, [prioritySelect, statusSelect, task]);

  const backSave = () => {
    router.back();
  };

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    console.log(isCalendarActive);
  }, [isCalendarActive]);

  React.useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  React.useEffect(() => {
    user_data_handler_ctx(props.user_data);
    initialize_workspaces_ctx({
      workspace_list: props.user_data.workspace_list,
    } as WorkspaceInit_Act);

    const tasks: TaskType[] = [];

    for (let workspace of props.user_data.workspace_list) {
      for (let task of workspace.task_list) {
        tasks.push({ ...task, workspace_name: workspace.name });
      }
    }

    initialize_tasks_ctx({ task_list: tasks } as TaskInit_Act);
    // router.refresh();
  }, []);

  if (user_task_ctx) {
    const actual_task = user_task_ctx.find(
      (t) => t.t_id === props.task_data.t_id
    );
    if (actual_task) {
      return (
        <>
          <Navbar
            title={"Detail Tugas"}
            subtitle={getWorkspaceName(props.task_data.w_id)}
            menuHandler={() => setIsMenuActive(true)}
            backSave={backSave}
          />
          <BasicMenu
            button_list={menu_list}
            log_list={actual_task.activity_list}
            isActive={isMenuActive && !isCommentsActive}
            title="Task Menu"
            delete_text="Delete Task"
            closeHandler={() => {
              setIsMenuActive(false);
            }}
            deleteHandler={() => {
              task_delete_ctx(actual_task.t_id, {
                delete_id: actual_task.t_id,
                task: actual_task,
                u_id: u_id,
                w_id: actual_task.w_id,
              });
            }}
          />
          +
          <Comments
            chat_list={actual_task.comments}
            closeHandler={() => {
              setIsCommentsActive(false);
            }}
            task_name={actual_task.title}
            workspace_name={actual_task.title}
            isActive={isCommentsActive && !isMenuActive}
            sendComment={(data) => {
              task_add_comment_ctx(actual_task.t_id, {
                chat: {
                  message: data.message,
                  time: data.time,
                  username: data.username,
                },
                u_id: u_id,
              });
            }}
          />
          <MemberListMenuMemo
            member_list={getWorkspaceMember(actual_task.w_id)}
            assigned_member={actual_task.assigned_member}
            show={isMemberListMenuActive}
            t_id={actual_task.t_id}
            closeHandler={() => {
              setIsMemberListMenuActive(false);
            }}
            memberClickHandler={(payload, set) => {
              task_change_participants_ctx(actual_task.t_id, {
                action: set ? "ADD" : "DEL",
                member: { u_id: payload.u_id, username: payload.username },
                u_id: u_id,
              });
            }}
          />
          <main className={s.main}>
            <section
              className={s.task}
              style={{
                overflowY:
                  isMemberListMenuActive || isCalendarActive || isCommentsActive
                    ? "hidden"
                    : "scroll",
              }}
            >
              <div className={[s.name, "medium", "big"].join(" ")}>
                <p className={[s.label, "medium", "md"].join(" ")}>Nama Task</p>
                <input
                  className={[s.name_inp, "medium", "big"].join(" ")}
                  value={taskForm.title}
                  id="title"
                  type="text"
                  name="title"
                  onChange={changeHandler}
                  onBlur={() => {
                    task_change_title_ctx(actual_task.t_id, {
                      title: taskForm.title,
                      u_id: u_id,
                    });
                  }}
                />
              </div>
              <div className={s.desc}>
                <InputLarge
                  onChange={changeHandler}
                  label="Deskripsi Task"
                  name="description"
                  placeholder="📋 Deskripsi"
                  value={taskForm.description}
                  onBlur={() => {
                    task_change_description_ctx(actual_task.t_id, {
                      description: taskForm.description,
                      u_id: u_id,
                    });
                  }}
                />
              </div>
              <div className={s.deadline}>
                <p className={[s.label, "medium", "md"].join(" ")}>Deadline</p>
                <div className={s.content}>
                  <RoundButton
                    color="rgba(0, 0, 0, 0.08)"
                    icon="/icons/calendar.svg"
                    opacity={1}
                    onClick={() => {
                      setIsCalendarActive(!isCalendarActive);
                    }}
                  />
                  <CalendarInput
                    show={true}
                    value={`${actual_task.deadline.split("-")[0]}-${
                      actual_task.deadline.split("-")[1]
                    }-${actual_task.deadline.split("-")[2]}`}
                    name={"deadline"}
                    onChange={(e) => {
                      task_change_deadline_ctx(actual_task.t_id, {
                        deadline: e.target.value,
                        u_id: u_id,
                      });
                    }}
                  />
                </div>
              </div>
              <div className={s.priority}>
                <p className={[s.label, "medium", "md"].join(" ")}>Priority</p>
                <div className={s.content}>
                  <ul className={s.list}>
                    <li className={s.item}>
                      <SquareButton
                        bg_color={
                          actual_task.priority === "LOW"
                            ? "#1C062D"
                            : "rgba(0, 0, 0, 0.08)"
                        }
                        color={
                          actual_task.priority === "LOW" ? "#fff" : "#1C062D"
                        }
                        opacity={1}
                        text="Low"
                        onClick={() => {
                          task_change_priority_ctx(actual_task.t_id, {
                            priority: "LOW",
                            u_id: u_id,
                          });
                        }}
                        key={"low-priority-btn"}
                      />
                    </li>
                    <li className={s.item}>
                      <SquareButton
                        bg_color={
                          actual_task.priority === "MED"
                            ? "#1C062D"
                            : "rgba(0, 0, 0, 0.08)"
                        }
                        color={
                          actual_task.priority === "MED" ? "#fff" : "#1C062D"
                        }
                        opacity={1}
                        text="Med"
                        key={"med-priority-btn"}
                        onClick={() => {
                          task_change_priority_ctx(actual_task.t_id, {
                            priority: "MED",
                            u_id: u_id,
                          });
                        }}
                      />
                    </li>
                    <li className={s.item}>
                      <SquareButton
                        bg_color={
                          actual_task.priority === "HIGH"
                            ? "#1C062D"
                            : "rgba(0, 0, 0, 0.08)"
                        }
                        color={
                          actual_task.priority === "HIGH" ? "#fff" : "#1C062D"
                        }
                        opacity={1}
                        text="High"
                        onClick={() => {
                          task_change_priority_ctx(actual_task.t_id, {
                            priority: "HIGH",
                            u_id: u_id,
                          });
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
                    onClick={() => {
                      setIsMemberListMenuActive(true);
                    }}
                  />
                  <ul className={s.list}>
                    {actual_task.assigned_member.map((member, index) => {
                      return (
                        <li
                          className={s.item}
                          key={`assigned-member-${index}`}
                          style={{ marginLeft: index > 0 ? "12px" : "0px" }}
                        >
                          <UsernameButton
                            username={member.username}
                            withDelete
                            deleteHandler={(username) => {
                              task_change_participants_ctx(actual_task.t_id, {
                                action: "DEL",
                                member: member,
                                u_id: u_id,
                              });
                            }}
                          />
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
                          actual_task.status === "NEXT-UP"
                            ? "#1C062D"
                            : "rgba(0, 0, 0, 0.08)"
                        }
                        color={
                          actual_task.status === "NEXT-UP" ? "#fff" : "#1C062D"
                        }
                        opacity={1}
                        text="Next up"
                        onClick={() => {
                          task_change_status_ctx(actual_task.t_id, {
                            status: "NEXT-UP",
                            u_id: u_id,
                          });
                        }}
                        key={"next-up-status-btn"}
                      />
                    </li>
                    <li className={s.item}>
                      <SquareButton
                        bg_color={
                          actual_task.status === "IN-PROGRESS"
                            ? "#1C062D"
                            : "rgba(0, 0, 0, 0.08)"
                        }
                        color={
                          actual_task.status === "IN-PROGRESS"
                            ? "#fff"
                            : "#1C062D"
                        }
                        opacity={1}
                        text="In progress"
                        onClick={() => {
                          task_change_status_ctx(actual_task.t_id, {
                            status: "IN-PROGRESS",
                            u_id: u_id,
                          });
                        }}
                        key={"in-progress-status-btn"}
                      />
                    </li>
                    <li className={s.item}>
                      <SquareButton
                        bg_color={
                          actual_task.status === "REVISED"
                            ? "#1C062D"
                            : "rgba(0, 0, 0, 0.08)"
                        }
                        color={
                          actual_task.status === "REVISED" ? "#fff" : "#1C062D"
                        }
                        opacity={1}
                        text="Revised"
                        onClick={() => {
                          task_change_status_ctx(actual_task.t_id, {
                            status: "REVISED",
                            u_id: u_id,
                          });
                        }}
                        key={"revised-status-btn"}
                      />
                    </li>
                    <li className={s.item}>
                      <SquareButton
                        bg_color={
                          actual_task.status === "COMPLETED"
                            ? "#1C062D"
                            : "rgba(0, 0, 0, 0.08)"
                        }
                        color={
                          actual_task.status === "COMPLETED"
                            ? "#fff"
                            : "#1C062D"
                        }
                        opacity={1}
                        text="Completed"
                        onClick={() => {
                          task_change_status_ctx(actual_task.t_id, {
                            status: "COMPLETED",
                            u_id: u_id,
                          });
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
    } else {
      // router.replace(`/home/${pathname.split("/")[2]}`);
    }
  }
};

export default TaskPage;
