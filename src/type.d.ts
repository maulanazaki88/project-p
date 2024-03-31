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
  notification_list: (NotificationCardProps | never)[];
  status: WorkspaceStatusType;
  admin_list: ({ u_id: string; username: string } | never)[];
  member_list: ({ u_id: string; username: string } | never)[];
  waiting_list: ({ u_id: string; username: string } | never)[];
  task_ids: (string | never)[];
  task_list: (TaskType | never)[];
  activity_list: (ActivityLogType | never)[];
  updated_at: Date;
  created_at: Date;
}

export interface TaskType {
  t_id: string;
  title: string;
  description: string;
  assigned_member: ({ u_id: string; username: string } | never)[];
  deadline: Date;
  priority: TaskPriorityType;
  created_at: Date;
  activity_list: ActivityLogType[];
  w_id: string;
  workspace_name: string;
  seen_by: ({ u_id: string; username: string } | never)[];
  comments: (ChatBubbleProps | never)[];
  status: ProgressStatusType;
  updated_at: Date;
  author: string;
}

export interface UserType {
  u_id: string;
  username: string;
  email: string;
  password: string;
  workspace_ids: (string | never)[];
  workspace_list: (WorkspaceType | never)[];
  created_at: Date;
  is_online: 0 | 1;
  updated_at: Date;
}

export interface CommentType {
  comment_id: string;
  t_id: string;
  chat_list: (ChatBubbleProps | never)[];
  updated_at: Date;
}

export interface ActivityLogType {
  a_id: string;
  activity_desc: string;
  created_at: Date;
  activity_type: "CREATE" | "READ" | "UPDATE" | "DELETE";
}

export interface SVGIconProps {
  color: string;
  opacity: number;
  scale: number;
}
