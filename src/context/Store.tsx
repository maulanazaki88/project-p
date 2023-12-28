"use client";
import React from "react";
import {
  UserType,
  WorkspaceType,
  TaskType,
  CommentType,
  TaskPriorityType,
  ProgressStatusType,
} from "@/type";
import { NotificationCardProps } from "@/components/notification-card/NotificationCard";
import { ChatBubbleProps } from "@/components/chat-bubble/ChatBubble";

export interface ContextType {
  user_data_ctx: UserType | null;
  user_data_handler_ctx: React.Dispatch<UserType>;
  user_workspaces_ctx: WorkspaceType[];
  user_verify_add_worskpace_ctx: (
    u_id: string,
    username: string,
    w_id: string
  ) => Promise<any>;
  owner_acc_user_add_workspace_ctx: (
    u_id: string,
    w_id: string,
    payload: WorkspaceAccWaitingList_Act
  ) => Promise<any>;
  owner_reject_user_add_workspace_ctx: (
    u_id: string,
    w_id: string,
    payload: WorkspaceAccWaitingList_Act
  ) => Promise<any>;
  user_exit_workspace: (u_id: string, w_id: string) => Promise<any>;
  owner_kick_user_workspace: (
    u_id: string,
    w_id: string,
    kick_id: string
  ) => Promise<any>;
  initialize_workspaces_ctx: (payload: WorkspaceInit_Act) => void;
  workspace_replace_ctx: (
    w_id: string,
    payload: WorkspaceReplace_Act
  ) => Promise<any>;
  workspace_change_name_ctx: (
    w_id: string,
    payload: WorkspaceChangeName_Act
  ) => void;
  workspace_change_member_ctx: (
    w_id: string,
    payload: WorkspaceChangeMember_Act
  ) => void;
  workspace_create_announcement_ctx: (
    w_id: string,
    payload: WorkspaceCreateAnnouncement_Act
  ) => void;

  workspace_delete_ctx: (
    w_id: string,
    payload: WorkspaceDelete_Act
  ) => Promise<any>;
  workspace_create_ctx: (
    w_id: string,
    payload: WorkspaceCreate_Act
  ) => Promise<any>;
  user_task_ctx: TaskType[];
  initialize_tasks_ctx: (payload: TaskInit_Act) => void;
  task_change_title_ctx: (t_id: string, payload: TaskChangeTitle_Act) => void;
  task_change_description_ctx: (
    t_id: string,
    payload: TaskChangeDescription_Act
  ) => void;
  task_change_deadline_ctx: (
    t_id: string,
    payload: TaskChangeDeadline_Act
  ) => void;
  task_change_priority_ctx: (
    t_id: string,
    payload: TaskChangePriority_Act
  ) => void;
  task_change_participants_ctx: (
    t_id: string,
    payload: TaskChangeParticipants_Act
  ) => void;
  task_change_status_ctx: (t_id: string, payload: TaskChangeStatus_Act) => void;
  task_add_comment_ctx: (t_id: string, payload: TaskAddComment_Act) => void;
  task_create_ctx: (t_id: string, payload: TaskCreate_Act) => Promise<any>;
  task_delete_ctx: (t_id: string, payload: TaskDelete_Act) => Promise<any>;
  display_width_ctx: number;
  task_comments_ctx: CommentType[] | null;
  task_comments_handler_ctx: React.Dispatch<CommentType[]>;
  logout_ctx: () => void;
}

// Workspace Interface ===========================================================
export type WorkspaceInit_Act = {
  workspace_list: WorkspaceType[];
};
export type WorkspaceChangeName_Act = { name: string; u_id: string };
export type WorkspaceChangeMember_Act = {
  u_id: string;
  username: string;
  action: "ADD" | "DEL";
};
export type WorkspaceCreateAnnouncement_Act = {
  u_id: string;
  notification: NotificationCardProps;
};
export type WorkspaceDelete_Act = { author_id: string };
export type WorkspaceCreate_Act = { u_id: string; workspace: WorkspaceType };
export type WorkspaceChangeTasks_Act = {
  u_id: string;
  t_id: string;
  task: TaskType;
  action: "ADD" | "DEL" | "MOD";
};
export type WorkspaceReplace_Act = {
  u_id: string;
  workspace: WorkspaceType;
};

export type WorkspaceAddWaitingList_Act = {
  u_id: string;
  candidate: { u_id: string; username: string };
};

export type WorkspaceAccWaitingList_Act = {
  u_id: string;
  candidate: { u_id: string; username: string };
};

export type WorkspaceRejWaitingList_Act = {
  u_id: string;
  candidate: { u_id: string; username: string };
};

export type WorkspaceRemoveMember_Act = {
  u_id: string;
  removed_member: { u_id: string; username: string };
};

export function isWorkspaceInit(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceReplace_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act
): payload is WorkspaceInit_Act {
  return (payload as WorkspaceInit_Act).workspace_list !== undefined;
}

export function isWorkspaceChangeName(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceReplace_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act
): payload is WorkspaceChangeName_Act {
  return (payload as WorkspaceChangeName_Act).name !== undefined;
}

export function isWorkspaceChangeMember(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceReplace_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act
): payload is WorkspaceChangeMember_Act {
  return (payload as WorkspaceChangeMember_Act).action !== undefined;
}

export function isWorkspaceCreateAnnouncement(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceReplace_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act
): payload is WorkspaceCreateAnnouncement_Act {
  return (
    (payload as WorkspaceCreateAnnouncement_Act).notification !== undefined
  );
}

export function isWorkspaceDelete(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceReplace_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act
): payload is WorkspaceDelete_Act {
  return (payload as WorkspaceDelete_Act).author_id !== undefined;
}

export function isWorkspaceCreate(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceReplace_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act
): payload is WorkspaceCreate_Act {
  return (payload as WorkspaceCreate_Act).workspace !== undefined;
}

export function isWorkspaceChangeTasks(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceReplace_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act
): payload is WorkspaceChangeTasks_Act {
  return (payload as WorkspaceChangeTasks_Act).t_id !== undefined;
}

export function isWorkspaceReplace(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceReplace_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act
): payload is WorkspaceReplace_Act {
  return (payload as WorkspaceReplace_Act).workspace !== undefined;
}

export function isWorkspaceAddWaitingList(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceReplace_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act
): payload is WorkspaceAddWaitingList_Act {
  return (payload as WorkspaceAddWaitingList_Act).candidate !== undefined;
}

export function isWorkspaceAccWaitingList(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceReplace_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act
): payload is WorkspaceAccWaitingList_Act {
  return (payload as WorkspaceAccWaitingList_Act).candidate !== undefined;
}

export function isWorkspaceRejWaitingList(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceReplace_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act
): payload is WorkspaceRejWaitingList_Act {
  return (payload as WorkspaceRejWaitingList_Act).candidate !== undefined;
}

export function isWorkspaceRemoveMember(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceReplace_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act
): payload is WorkspaceRemoveMember_Act {
  return (payload as WorkspaceRemoveMember_Act).removed_member !== undefined;
}

export interface WorkspaceActions {
  w_id: string;
  type:
    | "INIT"
    | "CHANGE_NAME"
    | "CHANGE_MEMBER"
    | "CREATE_ANNOUNCEMENT"
    | "DELETE"
    | "CREATE"
    | "CHANGE_TASKS"
    | "REPLACE"
    | "REPLACE_LOCAL"
    | "ADD_WAITING_LIST"
    | "ACC_WAITING_LIST"
    | "REJ_WAITING_LIST"
    | "REMOVE_MEMBER";
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
    | WorkspaceChangeTasks_Act
    | WorkspaceAddWaitingList_Act
    | WorkspaceAccWaitingList_Act
    | WorkspaceRejWaitingList_Act
    | WorkspaceRemoveMember_Act;
}

// Workspace Interface ===========================================================

// Task Interface ================================================================

export type TaskInit_Act = {
  task_list: TaskType[];
};
export type TaskCreate_Act = {
  u_id: string;
  w_id: string;
  task: TaskType;
};

export type TaskReplace_Act = {
  u_id: string;
  w_id: string;
  task: TaskType;
};

export type TaskDelete_Act = {
  u_id: string;
  task: TaskType;
  w_id: string;
  delete_id: string;
};

export type TaskChangeTitle_Act = {
  u_id: string;
  w_id: string;
  title: string;
};

export type TaskChangeDescription_Act = {
  u_id: string;
  w_id: string;
  description: string;
};

export type TaskChangeDeadline_Act = {
  u_id: string;
  w_id: string;
  deadline: string;
};

export type TaskChangePriority_Act = {
  u_id: string;
  w_id: string;
  priority: TaskPriorityType;
};

export type TaskChangeParticipants_Act = {
  u_id: string;
  w_id: string;
  member: { u_id: string; username: string };
  action: "ADD" | "DEL";
};

export type TaskChangeStatus_Act = {
  u_id: string;
  w_id: string;
  status: ProgressStatusType;
};

export type TaskAddComment_Act = {
  u_id: string;
  w_id: string;
  chat: ChatBubbleProps;
};

export interface TaskActions {
  t_id: string;
  type:
    | "INIT"
    | "CHANGE_TITLE"
    | "CHANGE_DESCRIPTION"
    | "CHANGE_DEADLINE"
    | "CHANGE_PRIORITY"
    | "CHANGE_PARTICIPANTS"
    | "CHANGE_STATUS"
    | "ADD_COMMENT"
    | "CREATE"
    | "DELETE"
    | "REPLACE"
    | "REPLACE_LOCAL";
  payload:
    | TaskInit_Act
    | TaskChangeTitle_Act
    | TaskChangeDescription_Act
    | TaskChangeDeadline_Act
    | TaskChangePriority_Act
    | TaskChangeParticipants_Act
    | TaskChangeStatus_Act
    | TaskAddComment_Act
    | TaskCreate_Act
    | TaskDelete_Act
    | TaskReplace_Act;
}

export function isTaskInit(
  payload:
    | TaskChangeTitle_Act
    | TaskChangeDescription_Act
    | TaskChangeDeadline_Act
    | TaskChangePriority_Act
    | TaskChangeParticipants_Act
    | TaskChangeStatus_Act
    | TaskAddComment_Act
    | TaskCreate_Act
    | TaskDelete_Act
    | TaskInit_Act
    | TaskReplace_Act
): payload is TaskInit_Act {
  return (payload as TaskInit_Act).task_list !== undefined;
}

export function isTaskChangeTitle(
  payload:
    | TaskChangeTitle_Act
    | TaskChangeDescription_Act
    | TaskChangeDeadline_Act
    | TaskChangePriority_Act
    | TaskChangeParticipants_Act
    | TaskChangeStatus_Act
    | TaskAddComment_Act
    | TaskCreate_Act
    | TaskDelete_Act
    | TaskInit_Act
    | TaskReplace_Act
): payload is TaskChangeTitle_Act {
  return (payload as TaskChangeTitle_Act).title !== undefined;
}

export function isTaskChangeDescription(
  payload:
    | TaskChangeTitle_Act
    | TaskChangeDescription_Act
    | TaskChangeDeadline_Act
    | TaskChangePriority_Act
    | TaskChangeParticipants_Act
    | TaskChangeStatus_Act
    | TaskAddComment_Act
    | TaskCreate_Act
    | TaskDelete_Act
    | TaskInit_Act
    | TaskReplace_Act
): payload is TaskChangeDescription_Act {
  return (payload as TaskChangeDescription_Act).description !== undefined;
}

export function isTaskChangeDeadline(
  payload:
    | TaskChangeTitle_Act
    | TaskChangeDescription_Act
    | TaskChangeDeadline_Act
    | TaskChangePriority_Act
    | TaskChangeParticipants_Act
    | TaskChangeStatus_Act
    | TaskAddComment_Act
    | TaskCreate_Act
    | TaskDelete_Act
    | TaskInit_Act
    | TaskReplace_Act
): payload is TaskChangeDeadline_Act {
  return (payload as TaskChangeDeadline_Act).deadline !== undefined;
}

export function isTaskChangePriority(
  payload:
    | TaskChangeTitle_Act
    | TaskChangeDescription_Act
    | TaskChangeDeadline_Act
    | TaskChangePriority_Act
    | TaskChangeParticipants_Act
    | TaskChangeStatus_Act
    | TaskAddComment_Act
    | TaskCreate_Act
    | TaskDelete_Act
    | TaskInit_Act
    | TaskReplace_Act
): payload is TaskChangePriority_Act {
  return (payload as TaskChangePriority_Act).priority !== undefined;
}

export function isTaskChangeParticipants(
  payload:
    | TaskChangeTitle_Act
    | TaskChangeDescription_Act
    | TaskChangeDeadline_Act
    | TaskChangePriority_Act
    | TaskChangeParticipants_Act
    | TaskChangeStatus_Act
    | TaskAddComment_Act
    | TaskCreate_Act
    | TaskDelete_Act
    | TaskInit_Act
    | TaskReplace_Act
): payload is TaskChangeParticipants_Act {
  return (payload as TaskChangeParticipants_Act).member !== undefined;
}

export function isTaskChangeStatus(
  payload:
    | TaskChangeTitle_Act
    | TaskChangeDescription_Act
    | TaskChangeDeadline_Act
    | TaskChangePriority_Act
    | TaskChangeParticipants_Act
    | TaskChangeStatus_Act
    | TaskAddComment_Act
    | TaskCreate_Act
    | TaskDelete_Act
    | TaskInit_Act
    | TaskReplace_Act
): payload is TaskChangeStatus_Act {
  return (payload as TaskChangeStatus_Act).status !== undefined;
}

export function isTaskAddComment(
  payload:
    | TaskChangeTitle_Act
    | TaskChangeDescription_Act
    | TaskChangeDeadline_Act
    | TaskChangePriority_Act
    | TaskChangeParticipants_Act
    | TaskChangeStatus_Act
    | TaskAddComment_Act
    | TaskCreate_Act
    | TaskDelete_Act
    | TaskInit_Act
    | TaskReplace_Act
): payload is TaskAddComment_Act {
  return (payload as TaskAddComment_Act).chat !== undefined;
}

export function isTaskCreate(
  payload:
    | TaskChangeTitle_Act
    | TaskChangeDescription_Act
    | TaskChangeDeadline_Act
    | TaskChangePriority_Act
    | TaskChangeParticipants_Act
    | TaskChangeStatus_Act
    | TaskAddComment_Act
    | TaskCreate_Act
    | TaskDelete_Act
    | TaskInit_Act
    | TaskReplace_Act
): payload is TaskCreate_Act {
  return (payload as TaskCreate_Act).task !== undefined;
}

export function isTaskReplace(
  payload:
    | TaskChangeTitle_Act
    | TaskChangeDescription_Act
    | TaskChangeDeadline_Act
    | TaskChangePriority_Act
    | TaskChangeParticipants_Act
    | TaskChangeStatus_Act
    | TaskAddComment_Act
    | TaskCreate_Act
    | TaskDelete_Act
    | TaskInit_Act
    | TaskReplace_Act
): payload is TaskCreate_Act {
  return (payload as TaskCreate_Act).task !== undefined;
}

export function isTaskDelete(
  payload:
    | TaskChangeTitle_Act
    | TaskChangeDescription_Act
    | TaskChangeDeadline_Act
    | TaskChangePriority_Act
    | TaskChangeParticipants_Act
    | TaskChangeStatus_Act
    | TaskAddComment_Act
    | TaskCreate_Act
    | TaskDelete_Act
    | TaskInit_Act
    | TaskReplace_Act
): payload is TaskDelete_Act {
  return (payload as TaskDelete_Act).delete_id !== undefined;
}

// Task Interface ================================================================

export enum UserActionKind {}

const Context = React.createContext<ContextType | null>(null);

export function ContextProvider(props: any) {
  const [user_data, set_user_data] = React.useState<UserType | null>(null);

  // WORKSPACE ============================================================

  const workspacesReducer = (
    init: WorkspaceType[],
    action: WorkspaceActions
  ) => {
    let updatedState: WorkspaceType[] = init;
    switch (action.type) {
      case "INIT":
        if (isWorkspaceInit(action.payload)) {
          updatedState = action.payload.workspace_list;
        }
        break;
      case "CHANGE_NAME":
        updatedState = init.map((workspace, index) => {
          if (
            workspace.w_id === action.w_id &&
            isWorkspaceChangeName(action.payload)
          ) {
            return {
              ...workspace,
              name: action.payload.name,
            } as WorkspaceType;
          } else {
            return workspace;
          }
        });

        break;
      case "CHANGE_MEMBER":
        if (isWorkspaceChangeMember(action.payload)) {
          if (action.payload.action === "ADD") {
            updatedState = init.map((workspace, index) => {
              if (
                isWorkspaceChangeMember(action.payload) &&
                action.w_id === workspace.w_id
              ) {
                const new_member = {
                  username: action.payload.username,
                  u_id: action.payload.u_id,
                };

                return {
                  ...workspace,
                  member_list: workspace.member_list.concat(new_member),
                };
              } else {
                return workspace;
              }
            });
          } else {
            updatedState = init.map((workspace, index) => {
              if (
                isWorkspaceChangeMember(action.payload) &&
                action.w_id === workspace.w_id
              ) {
                const delete_id = action.payload.u_id;
                return {
                  ...workspace,
                  member_list: workspace.member_list.filter(
                    (m) => m.u_id !== delete_id
                  ),
                };
              } else {
                return workspace;
              }
            });
          }
        }
        break;
      case "CREATE_ANNOUNCEMENT":
        updatedState = init.map((workspace, index) => {
          if (
            workspace.w_id === action.w_id &&
            isWorkspaceCreateAnnouncement(action.payload)
          ) {
            const new_notification: NotificationCardProps =
              action.payload.notification;

            return {
              ...workspace,
              notification_list:
                workspace.notification_list.concat(new_notification),
            };
          } else {
            return workspace;
          }
        });
        break;
      case "CREATE":
        if (isWorkspaceCreate(action.payload)) {
          const new_workspace = action.payload.workspace;

          updatedState = init.concat(new_workspace);

          set_user_data((prev): UserType | null => {
            if (prev && isWorkspaceCreate(action.payload)) {
              return {
                ...prev,
                workspace_ids: prev.workspace_ids.concat(action.w_id),
                workspace_list: prev.workspace_list.concat(
                  action.payload.workspace
                ),
              };
            } else {
              return null;
            }
          });
        } else {
        }

        break;
      case "DELETE":
        if (isWorkspaceDelete(action.payload)) {
          const delete_id = action.w_id;

          updatedState = init.filter((w) => w.w_id !== delete_id);

          set_user_data((prev): UserType | null => {
            if (prev && isWorkspaceDelete(action.payload)) {
              return {
                ...prev,
                workspace_ids: prev.workspace_ids.filter(
                  (w_id) => w_id !== action.w_id
                ),
                workspace_list: prev.workspace_list.filter(
                  (w) => w.w_id !== action.w_id
                ),
              };
            } else {
              return null;
            }
          });
        }
        break;
      case "CHANGE_TASKS":
        if (isWorkspaceChangeTasks(action.payload)) {
          if (action.payload.action === "ADD") {
            updatedState = init.map((workspace) => {
              if (
                isWorkspaceChangeTasks(action.payload) &&
                workspace.w_id === action.w_id
              ) {
                return {
                  ...workspace,
                  task_ids: workspace.task_ids.concat(action.payload.t_id),
                  task_list: workspace.task_list.concat(action.payload.task),
                };
              } else {
                return workspace;
              }
            });
          } else if (action.payload.action === "DEL") {
            updatedState = init.map((workspace) => {
              if (
                isWorkspaceChangeTasks(action.payload) &&
                workspace.w_id === action.w_id
              ) {
                return {
                  ...workspace,
                  task_ids: workspace.task_ids.filter(
                    (t) =>
                      isWorkspaceChangeTasks(action.payload) &&
                      t !== action.payload.t_id
                  ),
                  task_list: workspace.task_list.filter(
                    (task) =>
                      isWorkspaceChangeTasks(action.payload) &&
                      task.t_id !== action.payload.t_id
                  ),
                };
              } else {
                return workspace;
              }
            });
          } else if (action.payload.action === "MOD") {
            updatedState = init.map((workspace) => {
              if (isWorkspaceChangeTasks(action.payload)) {
                const updated_tasks = workspace.task_list.filter(
                  (t) =>
                    isWorkspaceChangeTasks(action.payload) &&
                    t.t_id !== action.payload.t_id
                );
                return {
                  ...workspace,
                  task_list: updated_tasks.concat(action.payload.task),
                };
              } else {
                return workspace;
              }
            });
          }
        }
        break;
      case "REPLACE":
        if (isWorkspaceReplace(action.payload)) {
          updatedState = init.map((workspace) => {
            if (
              workspace.w_id === action.w_id &&
              isWorkspaceReplace(action.payload)
            ) {
              return {
                ...action.payload.workspace,
              };
            } else {
              return workspace;
            }
          });
        }
      case "ACC_WAITING_LIST":
        if (isWorkspaceAccWaitingList(action.payload)) {
          updatedState = init.map((workspace) => {
            console.log(action.payload);
            if (
              workspace.w_id === action.w_id &&
              isWorkspaceAccWaitingList(action.payload)
            ) {
              console.log(action.payload);
              return {
                ...workspace,
                waiting_list: workspace.waiting_list.filter(
                  (i) =>
                    isWorkspaceAccWaitingList(action.payload) &&
                    i.u_id !== action.payload.candidate.u_id
                ),
                member_list: workspace.member_list.concat(
                  action.payload.candidate
                ),
              };
            } else {
              return workspace;
            }
          });
        }
        break;
      case "REJ_WAITING_LIST":
        if (isWorkspaceRejWaitingList(action.payload)) {
          updatedState = init.map((workspace) => {
            if (
              workspace.w_id === action.w_id &&
              isWorkspaceRejWaitingList(action.payload)
            ) {
              console.log(action.payload);
              return {
                ...workspace,
                waiting_list: workspace.waiting_list.filter(
                  (i) =>
                    isWorkspaceRejWaitingList(action.payload) &&
                    i.u_id !== action.payload.candidate.u_id
                ),
              };
            } else {
              return workspace;
            }
          });
        }
        break;
      case "ADD_WAITING_LIST":
        if (isWorkspaceAddWaitingList(action.payload)) {
          updatedState = init.map((workspace) => {
            if (
              workspace.w_id === action.w_id &&
              isWorkspaceAddWaitingList(action.payload)
            ) {
              return {
                ...workspace,
                waiting_list: workspace.waiting_list.concat(
                  action.payload.candidate
                ),
              };
            } else {
              return workspace;
            }
          });
        }
        break;
      case "REMOVE_MEMBER":
        if (isWorkspaceRemoveMember(action.payload)) {
          updatedState = init.map((workspace) => {
            if (
              workspace.w_id === action.w_id &&
              isWorkspaceRemoveMember(action.payload)
            ) {
              return {
                ...workspace,
                member_list: workspace.member_list.filter(
                  (member) =>
                    isWorkspaceRemoveMember(action.payload) &&
                    member.u_id !== action.payload.removed_member.u_id
                ),
              };
            } else {
              return workspace;
            }
          });
        }
        break;
      default:
        break;
    }
    return updatedState;
  };

  // ================================ USER =======================================

  const userVerifyAddWorkspace = async (
    u_id: string,
    username: string,
    w_id: string
  ) => {
    const data = {
      username: username,
      u_id: u_id,
    };

    const response = await fetch(
      `/api/workspace-add-member-waiting-list/${w_id}`,
      {
        body: JSON.stringify(data),
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (json && json.updated_count > 0) {
      console.log("Success adding user to workspace waiting list");
      return {
        updated_count: json.updated_count,
      };
    } else {
      console.log("Failed adding user to workspace waiting list");
      return {
        updated_count: 0,
      };
    }
  };

  const userExitWorkspace = async (u_id: string, w_id: string) => {
    if (!workspaces_verify_access(u_id, w_id)) {
      set_user_data((prev) => {
        if (prev) {
          return {
            ...prev,
            workspace_ids: prev.workspace_ids.filter((w) => w !== w_id),
            workspace_list: prev.workspace_list.filter(
              (workspace) => workspace.w_id !== w_id
            ),
          };
        } else {
          return prev;
        }
      });

      const workspace_data = { w_id: w_id };

      const user_response = await fetch(
        `/api/update-user-delete-workspace/${u_id}`,
        {
          body: JSON.stringify(workspace_data),
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const user_json = await user_response.json();

      if (user_json && user_json.updated > 0) {
        console.log("UPDATE --workspace_ids-- SUCCESS");

        const user_data = { u_id: u_id };

        const workspace_response = await fetch(
          `/api/workspace-remove-member/${w_id}`,
          {
            body: JSON.stringify(user_data),
            headers: {
              "content-type": "application/json",
            },
            method: "PUT",
          }
        );

        const workspace_json = await workspace_response.json();

        if (workspace_json && workspace_json.updated_count) {
          console.log("UPDATE --member_list-- SUCCESS", "color: green");
          return {
            updated_count: workspace_json.updated_count,
          };
        } else {
          console.log("UPDATE --member_list-- FAILED", "color: red");
          return {
            updated_count: 0,
          };
        }
      } else {
        console.log("UPDATE --workspace_ids-- FAILED");
        return {
          updated_count: 0,
        };
      }
    } else {
      console.log("ADMIN CAN'T LEAVE!");
    }
  };

  //========================= USER ================================

  //======================== WORKSPACE ============================

  const workspaces_init: WorkspaceType[] = [];

  const [workspaces, dispatchWorkspace] = React.useReducer(
    workspacesReducer,
    workspaces_init
  );

  const workspaces_verify_access = (u_id: string, w_id: string) => {
    const workspace = workspaces.find((w) => w.w_id === w_id);

    if (workspace) {
      return workspace.admin_list.some((user) => user.u_id === u_id);
    } else {
      console.log(w_id);
      return false;
    }
  };

  const ownerKickMember = async (
    u_id: string,
    w_id: string,
    kick_id: string
  ) => {
    if (workspaces_verify_access(u_id, w_id)) {
      dispatchWorkspace({
        payload: {
          removed_member: { u_id: kick_id, username: "member" },
        } as WorkspaceRemoveMember_Act,
        type: "REMOVE_MEMBER",
        w_id: w_id,
      });

      const user_data = { u_id: kick_id };

      const workspace_response = await fetch(
        `/api/workspace-remove-member/${w_id}`,
        {
          body: JSON.stringify(user_data),
          headers: {
            "content-type": "application/json",
          },
          method: "PUT",
        }
      );

      const workspace_json = await workspace_response.json();

      if (workspace_json && workspace_json.updated_count > 0) {
        console.log("UPDATED --member_list-- SUCCESS", "color: green");

        const workspace_data = { w_id: w_id };

        const user_response = await fetch(
          `/api/update-user-delete-workspace/${kick_id}`,
          {
            body: JSON.stringify(workspace_data),
            headers: {
              "content-type": "application/json",
            },
            method: "PUT",
          }
        );

        const user_json = await user_response.json();

        if (user_json && user_json.updated_count > 0) {
          console.log("UPDATED --workspace_ids-- SUCCESS");

          return {
            updated_count: user_json.updated_count,
          };
        } else {
          console.log("UPDATED --workspace_ids-- FAILED");
          return {
            updated_count: 0,
          };
        }
      } else {
        console.log("UPDATED --member_list-- FAILED");
        return {
          updated_count: 0,
        };
      }
    }
  };

  const ownerAccUserAddWorkspace = async (
    u_id: string,
    w_id: string,
    payload: WorkspaceAccWaitingList_Act
  ) => {
    if (workspaces_verify_access(u_id, w_id)) {
      dispatchWorkspace({
        payload: payload,
        type: "ACC_WAITING_LIST",
        w_id: w_id,
      });

      const workspace_data = { w_id: w_id };

      const user_response = await fetch(
        `/api/update-user-add-workspace/${payload.candidate.u_id}`,
        {
          body: JSON.stringify(workspace_data),
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const user_json = await user_response.json();
      if (user_json && user_json.updated_count > 0) {
        console.log("UPDATE --workspace_ids-- SUCCESS");

        const user_data = payload.candidate;

        const workspace_response = await fetch(
          `/api/workspace-acc-waiting-list/${w_id}`,
          {
            body: JSON.stringify(user_data),
            headers: {
              "content-type": "application/json",
            },
            method: "PUT",
          }
        );

        const workspace_json = await workspace_response.json();

        if (workspace_json && workspace_json.updated_count > 0) {
          console.log("UPDATE --waiting_list-- SUCCESS", "color: green");
          return {
            updated_count: workspace_json.updated_count,
          };
        } else {
          console.log("UPDATE --waiting_list-- FAILED", "color: red");
          return {
            updated_count: 0,
          };
        }
      } else {
        console.log("UPDATE --workspace_ids-- FAILED", "color: red");
        return {
          updated_count: 0,
        };
      }
    } else {
      console.log("LIMITED ACCESS");
    }
  };

  const ownerRejUserAddWorkspace = async (
    u_id: string,
    w_id: string,
    payload: WorkspaceAccWaitingList_Act
  ) => {
    if (workspaces_verify_access(u_id, w_id)) {
      dispatchWorkspace({
        payload: payload,
        type: "REJ_WAITING_LIST",
        w_id: w_id,
      });

      const user_data = payload.candidate;

      const workspace_response = await fetch(
        `/api/workspace-rej-waiting-list/${w_id}`,
        {
          body: JSON.stringify(user_data),
          headers: {
            "content-type": "application/json",
          },
          method: "PUT",
        }
      );

      const workspace_json = await workspace_response.json();

      if (workspace_json && workspace_json.updated_count > 0) {
        console.log("UPDATE --waiting_list-- SUCCESS", "color: green");
        return {
          updated_count: workspace_json.updated_count,
        };
      } else {
        console.log("UPDATE --waiting_list-- FAILED", "color: red");
      }
    }
  };

  const workspaceInit = (payload: WorkspaceInit_Act) => {
    dispatchWorkspace({
      payload: payload,
      w_id: "",
      type: "INIT",
    });
  };

  const workspaceReplaceHandler = async (
    w_id: string,
    payload: WorkspaceReplace_Act
  ) => {
    if (user_data && workspaces_verify_access(user_data.u_id, w_id)) {
      dispatchWorkspace({
        payload: payload,
        type: "REPLACE",
        w_id: w_id,
      });
    }

    const response = await fetch(`/api/replace-workspace/${w_id}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(payload.workspace),
    });

    const json = await response.json();

    if (json && response.status === 200) {
      console.log(json);
      return {
        ...json,
      };
    } else {
      console.log("Update failed 😭");
      return {
        message: "error",
      };
    }
  };

  const workspaceChangeNameHandler = async (
    w_id: string,
    payload: WorkspaceChangeName_Act
  ) => {
    if (user_data && workspaces_verify_access(user_data?.u_id, w_id)) {
      dispatchWorkspace({
        payload: payload,
        type: "CHANGE_NAME",
        w_id: w_id,
      });
      const response = await fetch(`/api/update-workspace/${w_id}`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "PUT",
        cache: "no-store",
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (json && response.status == 200) {
        console.log(json);
      } else {
        console.log("Update failed 😭");
      }
    }
  };

  const workspaceChangeMember = async (
    w_id: string,
    payload: WorkspaceChangeMember_Act
  ) => {
    if (workspaces_verify_access(payload.u_id, w_id)) {
      dispatchWorkspace({
        payload: payload,
        type: "CHANGE_MEMBER",
        w_id: w_id,
      });
      const data = { u_id: payload.u_id, username: payload.username };

      if (payload.action === "ADD") {
        const response = await fetch(`/api/workspace-add-member/${w_id}`, {
          headers: {
            "Content-type": "application/json",
          },
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify(data),
        });

        const json = await response.json();

        if (json && response.status == 200) {
          console.log(json);
        } else {
          console.log("Update failed 😭");
        }
      } else if (payload.action === "DEL") {
        dispatchWorkspace({
          payload: payload,
          type: "CHANGE_MEMBER",
          w_id: w_id,
        });
        const response = await fetch(`/api/workspace-delete-member/${w_id}`, {
          headers: {
            "Content-type": "application/json",
          },
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify(data),
        });

        const json = await response.json();

        if (json && response.status == 200) {
          console.log(json);
        } else {
          console.log("Update failed 😭");
        }
      }
    }
  };

  const workspaceCreateAnnouncement = async (
    w_id: string,
    payload: WorkspaceCreateAnnouncement_Act
  ) => {
    console.log("NO ANNOUNCE");
    dispatchWorkspace({
      payload: payload,
      w_id: w_id,
      type: "CREATE_ANNOUNCEMENT",
    });
    const new_notification: NotificationCardProps = payload.notification;

    const response = await fetch(
      `/api/update-workspace-create-announcement/${w_id}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "PUT",
        cache: "no-store",
        body: JSON.stringify(new_notification),
      }
    );

    const json = await response.json();

    if (json && response.status == 200) {
      console.log(json);
    } else {
      console.log("Update failed 😭");
    }
  };

  const deleteWorkspace = async (
    w_id: string,
    payload: WorkspaceDelete_Act
  ) => {
    if (workspaces_verify_access(payload.author_id, w_id)) {
      dispatchWorkspace({
        payload: payload,
        type: "DELETE",
        w_id: w_id,
      });
      if (user_data) {
        set_user_data((prev) => {
          if (prev) {
            return {
              ...prev,
              workspace_ids: prev.workspace_ids.filter((w) => w !== w_id),
              workspace_list: prev.workspace_list.filter(
                (w) => w.w_id !== w_id
              ),
            };
          } else {
            return null;
          }
        });
      }
      const response = await fetch(`/api/delete-workspace/${w_id}`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "DELETE",
        cache: "no-store",
      });

      const json = await response.json();

      if (json && response.status === 200) {
        console.log(json);
        const user_response = await fetch(
          `/api/update-user-add-workspace/${payload.author_id}`,
          {
            headers: {
              "Content-type": "application/json",
            },
            method: "PUT",
            cache: "no-store",
            body: JSON.stringify({ w_id: w_id }),
          }
        );

        const user_json = await user_response.json();

        if (user_json && user_response.status === 200) {
          console.log(user_json);
          return {
            ...json,
            user_json,
          };
        } else {
          console.log("user update gagal huhu 😭");
        }
      }
    }
  };

  const createWorkspace = async (
    w_id: string,
    payload: WorkspaceCreate_Act
  ) => {
    console.log("CREATE WORKSPACE CTX INITIATED");
    dispatchWorkspace({
      payload: payload,
      type: "CREATE",
      w_id: w_id,
    });
    set_user_data((prev) => {
      if (prev) {
        return {
          ...prev,
          workspace_ids: prev.workspace_ids.concat(w_id),
          workspace_list: prev.workspace_list.concat(payload.workspace),
        };
      } else {
        return null;
      }
    });
    const data: WorkspaceType = payload.workspace;
    const response = await fetch(`/api/create-workspace/`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(data),
    });
    const json = await response.json();
    // console.log(json);
    if (json && response.status === 200) {
      const user_response = await fetch(
        `/api/update-user-add-workspace/${payload.u_id}`,
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify({ w_id: w_id }),
        }
      );

      const user_json = await user_response.json();
      // console.log(user_json);
      if (user_json && user_response.status === 200) {
        return {
          ...json,
          ...user_json,
        };
      } else {
        console.log("user update gagal huhu 😭");
      }
    } else {
      console.log("workspace update gagal huhu 😭");
    }
  };

  // WORKSPACE ============================================================

  // TASK =================================================================

  const taskReducer = (init: TaskType[], action: TaskActions) => {
    let updatedState: TaskType[] = init;
    switch (action.type) {
      case "INIT":
        if (isTaskInit(action.payload)) {
          updatedState = action.payload.task_list;
        }
        break;
      case "CREATE":
        if (isTaskCreate(action.payload)) {
          updatedState = init.concat(action.payload.task);
        }
        break;
      case "DELETE":
        if (isTaskDelete(action.payload)) {
          updatedState = init.filter((t) => t.t_id !== action.t_id);
        }
      case "CHANGE_TITLE":
        if (isTaskChangeTitle(action.payload)) {
          updatedState = init.map((t, index) => {
            if (t.t_id === action.t_id && isTaskChangeTitle(action.payload)) {
              return {
                ...t,
                title: action.payload.title,
              };
            } else {
              return t;
            }
          });
        }
        break;
      case "CHANGE_DESCRIPTION":
        if (isTaskChangeDescription(action.payload)) {
          updatedState = init.map((t, index) => {
            if (
              t.t_id === action.t_id &&
              isTaskChangeDescription(action.payload)
            ) {
              return {
                ...t,
                description: action.payload.description,
              };
            } else {
              return t;
            }
          });
        }
        break;
      case "CHANGE_DEADLINE":
        if (isTaskChangeDeadline(action.payload)) {
          updatedState = init.map((t, index) => {
            if (
              t.t_id === action.t_id &&
              isTaskChangeDeadline(action.payload)
            ) {
              return {
                ...t,
                deadline: action.payload.deadline,
              };
            } else {
              return t;
            }
          });
        }
        break;
      case "CHANGE_PRIORITY":
        if (isTaskChangePriority(action.payload)) {
          updatedState = init.map((t, index) => {
            if (
              t.t_id === action.t_id &&
              isTaskChangePriority(action.payload)
            ) {
              return {
                ...t,
                priority: action.payload.priority,
              };
            } else {
              return t;
            }
          });
        }
        break;
      case "CHANGE_PARTICIPANTS":
        if (
          isTaskChangeParticipants(action.payload) &&
          action.payload.action === "ADD"
        ) {
          updatedState = init.map((t, index) => {
            if (
              t.t_id === action.t_id &&
              isTaskChangeParticipants(action.payload)
            ) {
              return {
                ...t,
                assigned_member: t.assigned_member.concat(
                  action.payload.member
                ),
              };
            } else {
              return t;
            }
          });
        } else if (
          isTaskChangeParticipants(action.payload) &&
          action.payload.action === "DEL"
        ) {
          updatedState = init.map((t, index) => {
            if (
              t.t_id === action.t_id &&
              isTaskChangeParticipants(action.payload)
            ) {
              return {
                ...t,
                assigned_member: t.assigned_member.filter(
                  (m) =>
                    isTaskChangeParticipants(action.payload) &&
                    m.u_id !== action.payload.member.u_id
                ),
              };
            } else {
              return t;
            }
          });
        }
        break;
      case "CHANGE_STATUS":
        if (isTaskChangeStatus(action.payload)) {
          updatedState = init.map((t, index) => {
            if (t.t_id === action.t_id && isTaskChangeStatus(action.payload)) {
              return {
                ...t,
                status: action.payload.status,
              };
            } else {
              return t;
            }
          });
        }
        break;
      case "ADD_COMMENT":
        if (isTaskAddComment(action.payload)) {
          updatedState = init.map((t, index) => {
            if (t.t_id === action.t_id && isTaskAddComment(action.payload)) {
              return {
                ...t,
                comments: t.comments.concat(action.payload.chat),
              };
            } else {
              return t;
            }
          });
        }
        break;
      default:
        break;
    }
    return updatedState;
  };

  const tasks_init: TaskType[] = [];
  const [tasks, dispatchTask] = React.useReducer(taskReducer, tasks_init);

  const task_verify_access = (u_id: string, t_id: string, w_id: string) => {
    const task = tasks.find((t) => t.t_id === t_id);
    const workspace = workspaces.find((w) => w.w_id === w_id);
    if (task && task.assigned_member.some((m) => m.u_id === u_id)) {
      return true;
    } else if (workspace && workspace.admin_list.some((m) => m.u_id === u_id)) {
      return true;
    } else {
      return false;
    }
  };

  const taskInit = (payload: TaskInit_Act) => {
    dispatchTask({
      payload: payload,
      t_id: "",
      type: "INIT",
    });
  };

  const taskReplace = async (t_id: string, payload: TaskReplace_Act) => {
    if (task_verify_access(payload.u_id, t_id, payload.w_id)) {
      dispatchTask({
        payload: payload,
        t_id: t_id,
        type: "REPLACE",
      });
    }

    const new_data = payload.task;
  };

  const taskCreate = async (t_id: string, payload: TaskCreate_Act) => {
    if (task_verify_access(payload.u_id, t_id, payload.w_id)) {
      dispatchTask({
        payload: payload,
        t_id: t_id,
        type: "CREATE",
      });

      dispatchWorkspace({
        payload: {
          action: "ADD",
          t_id: t_id,
          task: payload.task,
          u_id: payload.u_id,
        } as WorkspaceChangeTasks_Act,
        type: "CHANGE_TASKS",
        w_id: payload.w_id,
      });

      const data = payload.task;

      const response = await fetch(`/api/create-task/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (json && response.status === 200) {
        console.log(json);

        const workspace_response = await fetch(
          `/api/update-workspace-add-task/${payload.w_id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ t_id: t_id }),
          }
        );

        const workspace_json = await workspace_response.json();

        if (workspace_json && workspace_response.status == 200) {
          console.log(workspace_json);
          return {
            ...json,
            ...workspace_json,
          };
        } else {
          console.log("Task Update failed 😭");
        }
      } else {
        console.log("Workspace Update failed 😭");
      }
    }

    console.log("Akses dibatasi");
  };

  const taskDelete = async (t_id: string, payload: TaskDelete_Act) => {
    if (task_verify_access(payload.u_id, t_id, payload.w_id)) {
      dispatchTask({
        payload: payload,
        t_id: t_id,
        type: "DELETE",
      });

      dispatchWorkspace({
        payload: {
          action: "DEL",
          t_id: t_id,
          task: payload.task,
        } as WorkspaceChangeTasks_Act,
        type: "CHANGE_TASKS",
        w_id: payload.w_id,
      });
      const response = await fetch(`/api/delete-task/${t_id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      const json = await response.json();

      if (json && response.status == 200) {
        console.log(json);
        const workspace_response = await fetch(
          `/api/update-workspace-add-task/${payload.w_id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ t_id: t_id }),
          }
        );

        const workspace_json = await workspace_response.json();

        if (workspace_json && workspace_response.status == 200) {
          console.log(workspace_json);
          return {
            ...json,
            ...workspace_json,
          };
        } else {
          console.log("Task Update failed 😭");
        }
      } else {
        console.log("Workspace Update failed 😭");
      }
    }
  };

  const taskChangeTitle = async (
    t_id: string,
    payload: TaskChangeTitle_Act
  ) => {
    dispatchTask({ payload: payload, t_id: t_id, type: "CHANGE_TITLE" });
    if (task_verify_access(payload.u_id, t_id, payload.w_id)) {
      const data = { title: payload.title };
      const response = await fetch(`/api/update-task-title/${t_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (json && response.status === 200) {
        console.log(json);
      }
    }
  };

  const taskChangeDescription = async (
    t_id: string,
    payload: TaskChangeDescription_Act
  ) => {
    dispatchTask({
      payload: payload,
      t_id: t_id,
      type: "CHANGE_DESCRIPTION",
    });
    if (task_verify_access(payload.u_id, t_id, payload.w_id)) {
      const data = { description: payload.description };
      const response = await fetch(`/api/update-task-description/${t_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (json && response.status === 200) {
        console.log(json);
      }
    }
  };

  const taskChangeDeadline = async (
    t_id: string,
    payload: TaskChangeDeadline_Act
  ) => {
    if (task_verify_access(payload.u_id, t_id, payload.w_id)) {
      dispatchTask({
        payload: payload,
        t_id: t_id,
        type: "CHANGE_DEADLINE",
      });
      const data = { deadline: payload.deadline };
      const response = await fetch(`/api/update-task-deadline/${t_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (json && response.status === 200) {
        console.log(json);
      }
    }
  };

  const taskChangePriority = async (
    t_id: string,
    payload: TaskChangePriority_Act
  ) => {
    if (task_verify_access(payload.u_id, t_id, payload.w_id)) {
      dispatchTask({
        payload: payload,
        t_id: t_id,
        type: "CHANGE_PRIORITY",
      });
      const data = { priority: payload.priority };

      const response = await fetch(`/api/update-task-priority/${t_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (json && response.status === 200) {
      }
    }
  };

  const taskChangeParticipants = async (
    t_id: string,
    payload: TaskChangeParticipants_Act
  ) => {
    if (task_verify_access(payload.u_id, t_id, payload.w_id)) {
      if (payload.action === "ADD") {
        dispatchTask({
          payload: payload,
          t_id: t_id,
          type: "CHANGE_PARTICIPANTS",
        });
        const data = payload.member;

        const response = await fetch(
          `/api/update-task-add-participant/${t_id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const json = await response.json();

        if (json && response.status === 200) {
          console.log(json);
        }
      } else if (payload.action === "DEL") {
        dispatchTask({
          payload: payload,
          t_id: t_id,
          type: "CHANGE_PARTICIPANTS",
        });
        const data = {
          u_id: payload.member.u_id,
          username: payload.member.username,
        };

        const response = await fetch(
          `/api/update-task-delete-participant/${t_id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const json = await response.json();

        if (json && response.status === 200) {
          console.log(json);
        }
      } else {
      }
    }
  };

  const taskChangeStatus = async (
    t_id: string,
    payload: TaskChangeStatus_Act
  ) => {
    if (task_verify_access(payload.u_id, t_id, payload.w_id)) {
      dispatchTask({
        payload: payload,
        t_id: t_id,
        type: "CHANGE_STATUS",
      });
      const data = { status: payload.status };
      const response = await fetch(`/api/update-task-status/${t_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (json && response.status === 200) {
        console.log(json);
      }
    }
  };

  const taskAddComment = async (t_id: string, payload: TaskAddComment_Act) => {
    if (task_verify_access(payload.u_id, t_id, payload.w_id)) {
      dispatchTask({
        payload: payload,
        t_id: t_id,
        type: "ADD_COMMENT",
      });
      const data = payload.chat;

      const response = await fetch(`/api/update-task-add-comment/${t_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (json && response.status == 200) {
        console.log(json);
      }
    }
  };

  // Task ==============================================================================

  const [task_comments, set_task_comments] = React.useState<
    CommentType[] | null
  >(null);

  const [display_width, set_display_width] = React.useState<number>(0);

  React.useEffect(() => {
    const getWidth = () => {
      const width = window.innerWidth;
      if (width) {
        set_display_width(width);
        console.log("display width: " + width);
      }
    };

    getWidth();

    window.addEventListener("resize", getWidth);
  }, []);

  React.useEffect(() => {
    if (user_data) {
      workspaceInit({ workspace_list: user_data.workspace_list });
      const tasks: TaskType[] = [];

      for (let workspace of user_data.workspace_list) {
        for (let task of workspace.task_list) {
          tasks.push({ ...task, workspace_name: workspace.name });
        }
      }

      taskInit({ task_list: tasks });
    } else {
    }
  }, [user_data]);

  const logout = () => {
    set_user_data(null);
    workspaceInit({ workspace_list: [] });
    taskInit({ task_list: [] });
  };

  const context: ContextType = {
    user_data_ctx: user_data,
    user_data_handler_ctx: set_user_data,
    user_workspaces_ctx: workspaces,
    initialize_workspaces_ctx: workspaceInit,
    workspace_replace_ctx: workspaceReplaceHandler,
    user_task_ctx: tasks,
    initialize_tasks_ctx: taskInit,
    task_add_comment_ctx: taskAddComment,
    display_width_ctx: display_width,
    task_comments_ctx: task_comments,
    task_comments_handler_ctx: set_task_comments,
    task_change_deadline_ctx: taskChangeDeadline,
    task_change_description_ctx: taskChangeDescription,
    task_change_participants_ctx: taskChangeParticipants,
    task_change_priority_ctx: taskChangePriority,
    task_change_status_ctx: taskChangeStatus,
    task_change_title_ctx: taskChangeTitle,
    task_create_ctx: taskCreate,
    task_delete_ctx: taskDelete,
    workspace_change_member_ctx: workspaceChangeMember,
    workspace_change_name_ctx: workspaceChangeNameHandler,
    workspace_create_announcement_ctx: workspaceCreateAnnouncement,
    workspace_create_ctx: createWorkspace,
    workspace_delete_ctx: deleteWorkspace,
    owner_acc_user_add_workspace_ctx: ownerAccUserAddWorkspace,
    owner_reject_user_add_workspace_ctx: ownerRejUserAddWorkspace,
    user_exit_workspace: userExitWorkspace,
    owner_kick_user_workspace: ownerKickMember,
    user_verify_add_worskpace_ctx: userVerifyAddWorkspace,
    logout_ctx: logout,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export default Context;
