"use client";
import React from "react";
import { UserType, WorkspaceType, TaskType, CommentType } from "@/type";

export interface ContextType {
  user_data_ctx: UserType | null;
  user_data_handler_ctx: React.Dispatch<UserType>;
  user_workspaces_ctx: WorkspaceType[] | null;
  user_workspaces_handler_ctx: React.Dispatch< WorkspaceType[] | null>;
  user_task_ctx: TaskType[] | null;
  user_task_handler_ctx: React.Dispatch<TaskType[]>;
  display_width_ctx: number;
  task_comments_ctx: CommentType[] | null;
  task_comments_handler_ctx: React.Dispatch<CommentType[]>
}

export enum UserActionKind {

}

const Context = React.createContext<ContextType | null>(null);

export function ContextProvider(props: any) {
  const [user_data, set_user_data] = React.useState<UserType | null>(null);

  const [user_workspaces, set_user_workspaces] = React.useState<WorkspaceType[] | null>(null);

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

  const context: ContextType = {
    user_data_ctx: user_data,
    user_data_handler_ctx: set_user_data,
    user_workspaces_ctx: user_workspaces,
    user_workspaces_handler_ctx: set_user_workspaces,
    user_task_ctx: user_task,
    user_task_handler_ctx: set_user_task,
    display_width_ctx: display_width,
    task_comments_ctx: task_comments,
    task_comments_handler_ctx: set_task_comments
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export default Context;
