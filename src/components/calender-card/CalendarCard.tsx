import { useRenderDate } from "@/hook/useRenderDate";
import s from "./CalendarCard.module.css";
import React from "react";
import { TaskType } from "@/type";
import Context, { ContextType } from "@/context/Store";
import { useRouter } from "next/navigation";

export interface CalendarCardProps {
  date: string;
  task_list: TaskType[];
  firstItem?: boolean;
}

const CalendarCard: React.FC<CalendarCardProps> = (props) => {
  const calendar = useRenderDate();

  const router = useRouter();

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

  const firstItemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (props.firstItem) {
      const firstItem = firstItemRef.current;
      console.log(firstItem);
      if (firstItem) {
        firstItem.scrollIntoView({block: "center"});
        console.log("jump to calendar card");
      }
    }
  }, [props.task_list]);
  if(props.task_list.some((task) => task.status !== "COMPLETED")) {
    return (
      <div className={s.card} ref={firstItemRef}>
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
              } else {
                return null
              }
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return null
  }
 
};

export default CalendarCard;
