import { useRenderDate } from "@/hook/useRenderDate";
import s from "./CalendarCard.module.css";
import React from "react";
import { TaskType } from "@/type";
import Context from "@/context/Store";

export interface CalendarCardProps {
  date: string;
  task_list: TaskType[];
}

const CalendarCard: React.FC<CalendarCardProps> = (props) => {
  const calendar = useRenderDate();

  const date = new Date(props.date);

  const day = date.getDay();

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  return (
    <div className={s.card}>
      <div className={s.label}>
        <span className={[s.date, "medium", "sm"].join(" ")}>
          {`${days[day]}, ${calendar.calendar(props.date, ["d", "m"])}`}
        </span>
      </div>
      <div className={s.content}>
        <ul className={s.list}>
          {props.task_list.map((task, index) => {
            if (task.status !== "COMPLETED") {
              return (
                <li className={s.item} key={`task-calendar-${index}`}>
                  <span className={[s.name, "medium", "sm"].join(" ")}>
                    {task.title} |{" "}
                  </span>
                  <span
                    className={[s.workspace, "medium", "sm", "soft"].join(" ")}
                  >
                    {task.workspace_name}
                  </span>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default CalendarCard;
