import s from "./NotificationCard.module.css";
import React from "react";
import { useRenderDate } from "@/hook/useRenderDate";
import Context from "@/context/Store";

export interface NotificationCardProps {
  username: string;
  message: string;
  created_at: string;
  w_id: string;
}

const NotificationCard: React.FC<NotificationCardProps> = (props) => {
  const ctx = React.useContext(Context);
  const calendar = useRenderDate();

  const workspace_list = ctx?.user_workspaces_ctx;

  const getWorkspaceName = (id: string) => {
    if (workspace_list) {
      const name = workspace_list.find((w) => w.w_id === id)?.name;
      return name;
    } else {
      return "No workspace";
    }
  };

  return (
    <div className={s.card}>
      <div className={s.label}>
        <span className={[s.workspace, "medium", "sm"].join(" ")}>
          {getWorkspaceName(props.w_id)}
        </span>
      </div>
      <div className={s.content}>
        <div className={s.message}>
          <span className={[s.username, "bold", "sm"].join(" ")}>
            {props.username}
          </span>
          <span className={[s.text, "sm", "reguler"].join(" ")}>
            {props.message}
          </span>
        </div>
        <div className={s.info}>
          <span className={[s.time, "sm", "medium", "soft"].join(" ")}>
            {calendar.calendar(new Date(props.created_at), ["d", "m"])}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
