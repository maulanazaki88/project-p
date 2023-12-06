"use client";
import React from "react";
import { UserType, WorkspaceType, TaskType, CommentType } from "@/type";

export interface ContextType {
  user_data_ctx: UserType | null;
  user_data_handler_ctx: React.Dispatch<UserType>;
  user_workspaces_ctx: WorkspaceType[] | null;
  user_workspaces_handler_ctx: React.Dispatch<WorkspaceType[]>;
  user_task_ctx: TaskType[] | null;
  user_task_handler_ctx: React.Dispatch<TaskType[]>;
  task_comments_ctx: CommentType | null;
  task_comment_handler: React.Dispatch<CommentType>;
}

const Context = React.createContext<ContextType | null>(null);

export function ContextProvider(props: any) {
  const [user_data, set_user_data] = React.useState<UserType | null>({
    created_at: "",
    email: "maulanazaki88@gmail.com",
    is_online: 1,
    password: "123",
    u_id: "user123",
    username: "maulana",
    workspace_list: [],
  });

  const [user_workspaces, set_user_workspaces] = React.useState<
    WorkspaceType[] | null
  >([
    {
      activity_list: [],
      admin_list: ["maulana"],
      member_list: ["mamet", "jodi", "tuslam", "maulana"],
      name: "Project P",
      notification_list: [],
      status: "ON-GOING",
      task_list: [],
      w_id: "workspace-1",
      description: "Python class project",
    },
    {
      activity_list: [],
      admin_list: ["maulana"],
      member_list: ["yanto", "sarmini", "kasdi", "maulana"],
      name: "Paper Kalkulus",
      notification_list: [],
      status: "ON-GOING",
      task_list: [],
      w_id: "workspace-2",
      description: "Membuat paper tentang kalkulus",
    },
  ]);

  const [user_task, set_user_task] = React.useState<TaskType[] | null>([
    {
      activity_list: [],
      assigned_member: ["maulana", "tuslam"],
      category: "Riset",
      comments_id: "comments-2",
      comments_count: 0,
      created_at: "",
      deadline: "2024-01-02",
      description: "Mencari referensi untuk paper kalkulus",
      priority: "HIGH",
      seen_by: [],
      status: "ON-PROGRESS",
      t_id: "task-2",
      title: "Mencari Referensi",
      w_id: "workspace-2",
    },
    {
      activity_list: [],
      assigned_member: ["maulana"],
      category: "Design",
      comments_id: "comments-1",
      created_at: "",
      deadline: "2024-01-02",
      description: "Membuat design power point",
      priority: "HIGH",
      seen_by: [],
      status: "ON-PROGRESS",
      t_id: "task-1",
      title: "Design PPT",
      w_id: "workspace-1",
      comments_count: 0,
    },
  ]);

  const [task_comments, set_task_comments] = React.useState<CommentType | null>(null);

  const context: ContextType = {
    user_data_ctx: user_data,
    user_data_handler_ctx: set_user_data,
    user_workspaces_ctx: user_workspaces,
    user_workspaces_handler_ctx: set_user_workspaces,
    user_task_ctx: user_task,
    user_task_handler_ctx: set_user_task,
    task_comments_ctx: task_comments,
    task_comment_handler: set_task_comments
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export default Context;
