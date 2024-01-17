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
import { useRenderDate } from "@/hook/useRenderDate";
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
import InputSmall from "../input-small/InputSmall";
import FormMenu from "../from-menu/FormMenu";

interface TaskPageProps {
  task_data: TaskType;
}

const TaskPage: React.FC<TaskPageProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();

  const u_id = pathname.split("/")[2];
  const t_id = pathname.split("/")[6];

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
    title: props.task_data.title,
    description: props.task_data.description,
  });

  React.useEffect(() => {
    setTaskForm({
      description: props.task_data.description,
      title: props.task_data.title,
    });
  }, [props]);

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

  const [deletePromptActive, setDeletePromptActive] =
    React.useState<boolean>(false);

  const [deletePromptWarning, setDeletePromptWarning] =
    React.useState<string>("-");

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

  // React.useEffect(() => {
  //   console.log(isCalendarActive);
  // }, [isCalendarActive]);

  // React.useEffect(() => {
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
  // }, []);

  const deleteHandler = async (value: string) => {
    if (value === props.task_data.title) {
      const response = await task_delete_ctx(props.task_data.t_id, {
        delete_id: props.task_data.t_id,
        task: props.task_data,
        u_id: u_id,
        w_id: props.task_data.w_id,
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

  const [showOverlay, setShowOverlay] = React.useState<boolean>(false);

  const overlayAction = () => {
    setDeletePromptActive(false);
    setIsMemberListMenuActive(false);
  };

  React.useEffect(() => {
    if (deletePromptActive || isMemberListMenuActive) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [deletePromptActive, isMemberListMenuActive]);

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
          opacity: 0.7,
          display: showOverlay ? "block" : "none",
        }}
        onClick={overlayAction}
      />
      <FormMenu
        closeHandler={() => {
          setDeletePromptActive(false);
        }}
        label={`Ketik : "${props.task_data.title}"`}
        name="title"
        show={deletePromptActive}
        submitHandler={({ key, value }) => {
          deleteHandler(value);
        }}
        title="Hapus Tugas"
        type="SMALL"
        hideInputInfo
        placeholder={`"${props.task_data.title}"`}
        warning={deletePromptWarning}
        button_color="red"
        button_text="Hapus"
        key={"task-delete-prompt"}
      />
      <Navbar
        title={"Detail Tugas"}
        subtitle={getWorkspaceName(props.task_data.w_id)}
        menuHandler={() => setIsMenuActive(true)}
        backSave={backSave}
      />
      <BasicMenu
        button_list={menu_list}
        log_list={props.task_data.activity_list}
        isActive={isMenuActive && !isCommentsActive}
        title="Task Menu"
        delete_text="Delete Task"
        closeHandler={() => {
          setIsMenuActive(false);
        }}
        deleteHandler={() => {
          setDeletePromptActive(true);
        }}
      />
      <Comments
        chat_list={props.task_data.comments}
        closeHandler={() => {
          setIsCommentsActive(false);
        }}
        task_name={props.task_data.title}
        workspace_name={props.task_data.title}
        isActive={isCommentsActive && !isMenuActive}
        sendComment={(data) => {
          task_add_comment_ctx(props.task_data.t_id, {
            chat: {
              message: data.message,
              time: data.time,
              username: data.username,
            },
            u_id: u_id,
            w_id: props.task_data.w_id,
          });
        }}
      />
      <MemberListMenuMemo
        member_list={getWorkspaceMember(props.task_data.w_id)}
        assigned_member={props.task_data.assigned_member}
        show={isMemberListMenuActive}
        t_id={props.task_data.t_id}
        closeHandler={() => {
          setIsMemberListMenuActive(false);
        }}
        memberClickHandler={(payload, set) => {
          task_change_participants_ctx(props.task_data.t_id, {
            action: set ? "ADD" : "DEL",
            member: { u_id: payload.u_id, username: payload.username },
            u_id: u_id,
            w_id: props.task_data.w_id,
          });
        }}
      />
      <main
        className={s.main}
        style={{
          overflowY:
            isMemberListMenuActive || isCalendarActive || isCommentsActive
              ? "hidden"
              : "scroll",
        }}
      >
        <section className={s.task}>
          <div className={s.form}>
            <div className={[s.name, "medium", "big"].join(" ")}>
              {/* <p className={[s.label, "medium", "md"].join(" ")}>Nama Task</p> */}
              {/* <input
              className={[s.name_inp, "medium", "big"].join(" ")}
              value={taskForm.title}
              id="title"
              type="text"
              name="title"
              onChange={changeHandler}
              onBlur={() => {
                task_change_title_ctx(props.task_data.t_id, {
                  title: taskForm.title,
                  u_id: u_id,
                  w_id: props.task_data.w_id,
                });
              }}
            /> */}
              <InputSmall
                icon="/icons/clipboard.svg"
                label="Nama Task"
                name="title"
                onChange={changeHandler}
                placeholder="Nama task"
                type="text"
                value={taskForm.title}
                warning={""}
                key={"Nama task input"}
                maxChar={25}
                onBlur={() => {
                  task_change_title_ctx(props.task_data.t_id, {
                    title: taskForm.title,
                    u_id: u_id,
                    w_id: props.task_data.w_id,
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
                  task_change_description_ctx(props.task_data.t_id, {
                    description: taskForm.description,
                    u_id: u_id,
                    w_id: props.task_data.w_id,
                  });
                }}
                maxChar={200}
              />
            </div>
          </div>
          <div className={s.radio}>
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
                  value={`${props.task_data.deadline.split("-")[0]}-${
                    props.task_data.deadline.split("-")[1]
                  }-${props.task_data.deadline.split("-")[2]}`}
                  name={"deadline"}
                  onChange={(e) => {
                    task_change_deadline_ctx(props.task_data.t_id, {
                      deadline: e.target.value,
                      u_id: u_id,
                      w_id: props.task_data.w_id,
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
                        props.task_data.priority === "LOW"
                          ? "#1C062D"
                          : "rgba(0, 0, 0, 0.08)"
                      }
                      color={
                        props.task_data.priority === "LOW" ? "#fff" : "#1C062D"
                      }
                      opacity={1}
                      text="Low"
                      onClick={() => {
                        task_change_priority_ctx(props.task_data.t_id, {
                          priority: "LOW",
                          u_id: u_id,
                          w_id: props.task_data.w_id,
                        });
                      }}
                      key={"low-priority-btn"}
                    />
                  </li>
                  <li className={s.item}>
                    <SquareButton
                      bg_color={
                        props.task_data.priority === "MED"
                          ? "#1C062D"
                          : "rgba(0, 0, 0, 0.08)"
                      }
                      color={
                        props.task_data.priority === "MED" ? "#fff" : "#1C062D"
                      }
                      opacity={1}
                      text="Med"
                      key={"med-priority-btn"}
                      onClick={() => {
                        task_change_priority_ctx(props.task_data.t_id, {
                          priority: "MED",
                          u_id: u_id,
                          w_id: props.task_data.w_id,
                        });
                      }}
                    />
                  </li>
                  <li className={s.item}>
                    <SquareButton
                      bg_color={
                        props.task_data.priority === "HIGH"
                          ? "#1C062D"
                          : "rgba(0, 0, 0, 0.08)"
                      }
                      color={
                        props.task_data.priority === "HIGH" ? "#fff" : "#1C062D"
                      }
                      opacity={1}
                      text="High"
                      onClick={() => {
                        task_change_priority_ctx(props.task_data.t_id, {
                          priority: "HIGH",
                          u_id: u_id,
                          w_id: props.task_data.w_id,
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
                  {props.task_data.assigned_member.map((member, index) => {
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
                            task_change_participants_ctx(props.task_data.t_id, {
                              action: "DEL",
                              member: member,
                              u_id: u_id,
                              w_id: props.task_data.w_id,
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
                        props.task_data.status === "NEXT-UP"
                          ? "#1C062D"
                          : "rgba(0, 0, 0, 0.08)"
                      }
                      color={
                        props.task_data.status === "NEXT-UP"
                          ? "#fff"
                          : "#1C062D"
                      }
                      opacity={1}
                      text="Next up"
                      onClick={() => {
                        task_change_status_ctx(props.task_data.t_id, {
                          status: "NEXT-UP",
                          u_id: u_id,
                          w_id: props.task_data.w_id,
                        });
                      }}
                      key={"next-up-status-btn"}
                    />
                  </li>
                  <li className={s.item}>
                    <SquareButton
                      bg_color={
                        props.task_data.status === "IN-PROGRESS"
                          ? "#1C062D"
                          : "rgba(0, 0, 0, 0.08)"
                      }
                      color={
                        props.task_data.status === "IN-PROGRESS"
                          ? "#fff"
                          : "#1C062D"
                      }
                      opacity={1}
                      text="In progress"
                      onClick={() => {
                        task_change_status_ctx(props.task_data.t_id, {
                          status: "IN-PROGRESS",
                          u_id: u_id,
                          w_id: props.task_data.w_id,
                        });
                      }}
                      key={"in-progress-status-btn"}
                    />
                  </li>
                  <li className={s.item}>
                    <SquareButton
                      bg_color={
                        props.task_data.status === "REVISED"
                          ? "#1C062D"
                          : "rgba(0, 0, 0, 0.08)"
                      }
                      color={
                        props.task_data.status === "REVISED"
                          ? "#fff"
                          : "#1C062D"
                      }
                      opacity={1}
                      text="Revised"
                      onClick={() => {
                        task_change_status_ctx(props.task_data.t_id, {
                          status: "REVISED",
                          u_id: u_id,
                          w_id: props.task_data.w_id,
                        });
                      }}
                      key={"revised-status-btn"}
                    />
                  </li>
                  <li className={s.item}>
                    <SquareButton
                      bg_color={
                        props.task_data.status === "COMPLETED"
                          ? "#1C062D"
                          : "rgba(0, 0, 0, 0.08)"
                      }
                      color={
                        props.task_data.status === "COMPLETED"
                          ? "#fff"
                          : "#1C062D"
                      }
                      opacity={1}
                      text="Completed"
                      onClick={() => {
                        task_change_status_ctx(props.task_data.t_id, {
                          status: "COMPLETED",
                          u_id: u_id,
                          w_id: props.task_data.w_id,
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
          </div>
        </section>
      </main>
    </>
  );
};

export default TaskPage;
