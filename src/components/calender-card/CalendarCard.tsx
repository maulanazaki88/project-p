import { useCalendar } from "@/hook/useCalendar";
import s from "./CalendarCard.module.css";
import React from "react";
import { TaskType } from "@/type";
import Context from "@/context/Store";

export interface CalendarCardProps {
  date: string;
  task_list: TaskType[];
}

const CalendarCard: React.FC<CalendarCardProps> = (props) => {
  const ctx = React.useContext(Context);

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
        <span className={[s.date, "medium", "sm"].join(" ")}>
          {useCalendar(props.date, ["d", "m"])}
        </span>
      </div>
      <div className={s.content}>
        <ul className={s.list}>
          {props.task_list.map((task, index) => {
            return (
              <li className={s.item} key={`task-calendar-${index}`}>
                <span className={[s.name, "medium", "sm"].join(" ")}>
                  {task.title} |{" "}
                </span>
                <span
                  className={[s.workspace, "medium", "sm", "soft"].join(" ")}
                >
                  {getWorkspaceName(task.w_id)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CalendarCard;
