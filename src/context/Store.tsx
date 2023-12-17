"use client";
import React from "react";
import { UserType, WorkspaceType, TaskType, CommentType } from "@/type";
import { NotificationCardProps } from "@/components/notification-card/NotificationCard";

export interface ContextType {
  user_data_ctx: UserType | null;
  user_data_handler_ctx: React.Dispatch<UserType>;
  user_workspaces_ctx: WorkspaceType[] | null;
  user_workspaces_handler_ctx: React.Dispatch<WorkspaceType[] | null>;
  user_task_ctx: TaskType[] | null;
  user_task_handler_ctx: React.Dispatch<TaskType[]>;
  display_width_ctx: number;
  task_comments_ctx: CommentType[] | null;
  task_comments_handler_ctx: React.Dispatch<CommentType[]>;
}

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

export function isWorkspaceInit(
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act
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
): payload is WorkspaceCreate_Act {
  return (payload as WorkspaceCreate_Act).workspace !== undefined;
}

export interface WorkspaceActions {
  w_id: string;
  type:
    | "INIT"
    | "CHANGE_NAME"
    | "CHANGE_MEMBER"
    | "CREATE_ANNOUNCEMENT"
    | "DELETE"
    | "CREATE";
  payload:
    | WorkspaceChangeName_Act
    | WorkspaceChangeMember_Act
    | WorkspaceCreateAnnouncement_Act
    | WorkspaceDelete_Act
    | WorkspaceCreate_Act
    | WorkspaceInit_Act;
}

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
        } else {
        }

        break;
      case "DELETE":
        if (isWorkspaceDelete(action.payload)) {
          const delete_id = action.w_id;

          updatedState = init.filter((w) => w.w_id !== delete_id);
        }
        break;
      default:
        break;
    }
    return updatedState;
  };

  const workspaces: WorkspaceType[] = [];

  const [workspaces_init, dispatchWorkspace] = React.useReducer(
    workspacesReducer,
    workspaces
  );

  const verify_access = (u_id: string, w_id: string) => {
    const workspace = user_workspaces?.find((w) => w.w_id === w_id);

    if (workspace) {
      return workspace.admin_list.some((user) => user.u_id === u_id);
    } else {
      return false;
    }
  };

  const workspaceChangeNameHandler = async (
    w_id: string,
    payload: WorkspaceChangeName_Act
  ) => {
    if (user_data && verify_access(user_data?.u_id, w_id)) {
      const response = await fetch(`/api/update-workspace/${w_id}`, {
        headers: {
          "Content-type": "json/application",
        },
        method: "PUT",
        cache: "no-store",
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (json && response.status == 200) {
        console.log(json);
        dispatchWorkspace({
          payload: payload,
          type: "CHANGE_NAME",
          w_id: w_id,
        });
      } else {
        console.log("Update failed 😭");
      }
    }
  };

  const workspaceChangeMember = async (
    w_id: string,
    payload: WorkspaceChangeMember_Act
  ) => {
    if (
      user_data &&
      user_workspaces &&
      verify_access(user_data?.u_id, w_id) &&
      isWorkspaceChangeMember(payload)
    ) {
      const workspace = user_workspaces.find((w) => w.w_id === w_id);

      const member_list = workspace ? workspace.member_list : [];

      const member = { u_id: payload.u_id, username: payload.username };

      const data =
        payload.action === "ADD"
          ? member_list.concat(member)
          : member_list.filter((m) => m.u_id !== member.u_id);

      const response = await fetch(`/api/update-workspace/${w_id}`, {
        headers: {
          "Content-type": "json/application",
        },
        method: "PUT",
        cache: "no-store",
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (json && response.status == 200) {
        console.log(json);
        dispatchWorkspace({
          payload: payload,
          type: "CHANGE_MEMBER",
          w_id: w_id,
        });
      } else {
        console.log("Update failed 😭");
      }
    }
  };

  const workspaceCreateNotification = async (
    w_id: string,
    payload: WorkspaceCreateAnnouncement_Act
  ) => {
    if (isWorkspaceCreateAnnouncement(payload)) {
      const new_notification: NotificationCardProps = payload.notification;
    }
  };

  // WORKSPACE ============================================================

  const [user_workspaces, set_user_workspaces] = React.useState<
    WorkspaceType[] | null
  >(null);

  const [user_task, set_user_task] = React.useState<TaskType[] | null>([]);

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

  // React.useEffect(() => {
  //   if (user_workspaces) {
  //     const workspace = user_workspaces[user_workspaces?.length - 1];

  //     if (workspace?.w_id) {
  //       fetch(`/api/update-workspace/${workspace.w_id}`, {
  //         method: "PUT",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify(workspace)
  //       })
  //         .then((res) => res.json())
  //         .then((data) => console.log(data));
  //     } else {
  //     }
  //   } else {
  //   }
  // }, [user_workspaces]);

  const context: ContextType = {
    user_data_ctx: user_data,
    user_data_handler_ctx: set_user_data,
    user_workspaces_ctx: user_workspaces,
    user_workspaces_handler_ctx: set_user_workspaces,
    user_task_ctx: user_task,
    user_task_handler_ctx: set_user_task,
    display_width_ctx: display_width,
    task_comments_ctx: task_comments,
    task_comments_handler_ctx: set_task_comments,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export default Context;
