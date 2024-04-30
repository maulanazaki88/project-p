import { useRenderDate } from "@/hook/useRenderDate";
import s from "./CalendarCard.module.css";
import React from "react";
import { TaskType } from "@/type";
import Context, { ContextType } from "@/context/Store";

export interface CalendarCardProps {
  date: string;
  task_list: TaskType[];
  firstItem?: boolean;
}

const CalendarCard: React.FC<CalendarCardProps> = (props) => {
  const calendar = useRenderDate();

  const date = new Date(props.date);

  const day = date.getDay();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const firstItemRef = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    if (props.firstItem) {
      const firstItem = firstItemRef.current;
      if (firstItem) {
        firstItem.scrollTo();
      }
    }
  }, [props.task_list]);

  return (
    <div className={s.card}>
      <div className={s.label}>
        <span className={[s.date, "medium", "sm"].join(" ")}>
          {`${days[day]}, ${calendar.calendar(new Date(props.date), [
            "d",
            "m",
          ])}`}
        </span>
      </div>
      <div className={s.content}>
        <ul className={s.list}>
          {props.task_list.map((task, index) => {
            if (task.status !== "COMPLETED") {
              return (
                <li
                  className={s.item}
                  key={`task-calendar-${index}`}
                  ref={index == 0 ? firstItemRef : null}
                >
                  <span className={[s.name, "medium", "sm"].join(" ")}>
                    {task.title} |
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
