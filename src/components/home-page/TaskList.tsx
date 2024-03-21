import { TaskType } from "@/type";
import s from "./TaskList.module.css";
import React from "react";
import { usePathname } from "next/navigation";
import TaskCard from "../task-card/TaskCard";

interface TaskListProps {
  task_list: TaskType[];
  searchInput: string;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const pathname = usePathname();

  const u_id = pathname.split("/")[2];

  const [hide_task_list_scroll, setHideTaskListScroll] =
    React.useState<boolean>(true);

  if (
    props.task_list.filter((task) =>
      task.assigned_member.some((user) => user.u_id)
    ).length > 0
  ) {
    return (
      <div
        className={[
          s.task_list_screen,
          hide_task_list_scroll && s.hide_scroll,
        ].join(" ")}
        onMouseLeave={() => {
          setHideTaskListScroll(true);
        }}
        onMouseOver={() => {
          setHideTaskListScroll(false);
        }}
        onTouchMove={() => {
          setHideTaskListScroll(false);
        }}
        onTouchEnd={() => {
          setHideTaskListScroll(true);
        }}
      >
        <ul className={s.task_list}>
          {props.task_list
            ?.filter(
              (task) =>
                task.title.toLowerCase().includes(props.searchInput) ||
                task.description.toLowerCase().includes(props.searchInput)
            )
            .map((task, index) => {
              if (task.assigned_member.some((m) => m.u_id === u_id)) {
                return (
                  <li className={s.item} key={`user-task-${index}`}>
                    <TaskCard
                      assigned_member={task.assigned_member}
                      comments_count={task.comments.length}
                      deadline={task.deadline}
                      description={task.description}
                      name={task.title}
                      priority={task.priority}
                      w_id={task.w_id}
                      id={task.t_id}
                    />
                  </li>
                );
              }
            })}
        </ul>
      </div>
    );
  } else {
    return (
      <span className={[s.empty_task, "light", "md"].join(" ")}>
        {" "}
        Currently you didn&apos;t have any task{" "}
      </span>
    );
  }
};

export default TaskList;
