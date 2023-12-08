// list of data types

export type WorkspaceStatusType = "ON-GOING" | "EVALUATION" | "COMPLETE" | "INACTIVE";
export type TaskPriorityType = "HIGH" | "MED" | "LOW";
export type ProgressStatusType = "NEXT-UP" | "IN-PROGRESS" | "COMPLETED" | "REVISED";
export type ChatReferenceStatusType = "REPLY" | "DEFAULT";
export type ChatSentStatusType = "SENT" | "POSTPONED" | "SENDING" | "NOT-SENT";
export type ActivityType = "CREATE" | "DELETE" | "EDIT" | "READ";

export interface WorkspaceType {
  w_id: string;
  name: string;
  description: string;
  notification_list: string[];
  status: WorkspaceStatusType;
  admin_list: string[];
  member_list: string[];
  task_list: string[];
  activity_list: string[];
}

export interface TaskType {
  t_id: string;
  title: string;
  description: string;
  assigned_member: string[];
  deadline: string;
  priority: TaskPriorityType
  category: string;
  created_at: string;
  activity_list: string[];
  w_id: string;
  seen_by: string[];
  comments_id: string;
  comments_count: number;
  status: ProgressStatusType
}

export interface ChatType {
  c_id: string;
  text: string;
  ref_status: ChatReferenceStatusType
  sent_status: ChatSentStatusType
  author_id: string;
  seen_list: string[];
  created_at: string;
}

export interface NotificationType {
  n_id: string;
  title: string;
  description: string;
  author_id: string;
  activity_list: string;
  workspace_id: string;
}

export interface UserType {
  u_id: string;
  username: string;
  email: string;
  password: string;
  workspace_list: string[];
  created_at: string;
  is_online: 0 | 1;
}

export interface CommentType{
  comment_id: string;
  t_id: string;
  chat_list: ChatType[];

}

export interface ActivityLogType {
  a_id: string;
  t_id: string;
  activity_desc: string
  created_at: string;
  w_id: string;
  u_id: string;
}

export interface SVGIconProps {
  color: string;
  opacity: number;
  scale: number;
}
