// list of data types
import { ChatBubbleProps } from "./components/chat-bubble/ChatBubble";
import { NotificationCardProps } from "./components/notification-card/NotificationCard";

export type WorkspaceStatusType =
  | "ON-GOING"
  | "EVALUATION"
  | "COMPLETE"
  | "INACTIVE";
export type TaskPriorityType = "HIGH" | "MED" | "LOW";
export type ProgressStatusType =
  | "NEXT-UP"
  | "IN-PROGRESS"
  | "COMPLETED"
  | "REVISED";
export type ChatReferenceStatusType = "REPLY" | "DEFAULT";
export type ChatSentStatusType = "SENT" | "POSTPONED" | "SENDING" | "NOT-SENT";
export type ActivityType = "CREATE" | "DELETE" | "EDIT" | "READ";

export interface WorkspaceType {
  w_id: string;
  name: string;
  description: string;
  notification_list: NotificationCardProps[];
  status: WorkspaceStatusType;
  admin_list: { u_id: string; username: string }[];
  member_list: { u_id: string; username: string }[];
  task_ids: string[];
  task_list: TaskType[];
  activity_list: ActivityLogType[];
  updated_at: string;
  created_at: string;
}

export interface TaskType {
  t_id: string;
  title: string;
  description: string;
  assigned_member: { u_id: string; username: string }[];
  deadline: string;
  priority: TaskPriorityType;
  created_at: string;
  activity_list: ActivityLogType[];
  w_id: string;
  workspace_name: string;
  seen_by: { u_id: string; username: string }[];
  comments: ChatBubbleProps[];
  status: ProgressStatusType;
  updated_at: string;
  author: string;
}

export interface UserType {
  u_id: string;
  username: string;
  email: string;
  password: string;
  workspace_ids: string[];
  workspace_list: WorkspaceType[];
  created_at: string;
  is_online: 0 | 1;
  updated_at: string;
}

export interface CommentType {
  comment_id: string;
  t_id: string;
  chat_list: ChatBubbleProps[];
  updated_at: string;
}

export interface ActivityLogType {
  a_id: string;
  activity_desc: string;
  created_at: string;
  activity_type: "CREATE" | "READ" | "UPDATE" | "DELETE";
}

export interface SVGIconProps {
  color: string;
  opacity: number;
  scale: number;
}
