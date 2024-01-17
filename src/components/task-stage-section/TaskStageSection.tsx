import s from "./TaskStageSection.module.css";
import React from "react";
import ProgressTitle from "../progress-title/ProgressTitle";
import { TaskType, ProgressStatusType, TaskPriorityType } from "@/type";
import TaskCard from "../task-card/TaskCard";

interface TaskStageSectionProps {
  task_list: TaskType[] | undefined;
  newTask: (t: ProgressStatusType) => Promise<void>;
  title: string;
  status: ProgressStatusType;
  members: { username: string; u_id: string }[];
}

export type SortType =
  | "LATEST-CHANGE"
  | "NAME"
  | "DEADLINE"
  | "CREATED-AT"
  | "PRIORITY";

export type FilterType =
  | "HIGH-ONLY"
  | "MED-ONLY"
  | "LOW-ONLY"
  | "INVOLVED-ONLY"
  | "NONE";

const TaskStageSection: React.FC<TaskStageSectionProps> = (props) => {
  const [sort, setSort] = React.useState<SortType>("LATEST-CHANGE");
  const [filter, setFilter] = React.useState<FilterType>("NONE");
  const [byAssigned, setByAssigned] = React.useState<string>("ALL");
  const [sortType, setSortType] = React.useState<"ASCEND" | "DESCEND">(
    "ASCEND"
  );

  const filterFunctions = (type: FilterType) => {
    let fn: (task: TaskType) => boolean;

    switch (type) {
      case "HIGH-ONLY":
        fn = (task) => task.priority == "HIGH";
        break;
      case "MED-ONLY":
        fn = (task) => task.priority == "MED";
        break;
      case "LOW-ONLY":
        fn = (task) => task.priority == "LOW";
        break;
      case "INVOLVED-ONLY":
        fn = (task) =>
          task.assigned_member.some((member) => member.username == byAssigned);
        break;
      case "NONE":
        fn = (task) => true;
        break;
      default:
        fn = (task) => true;
        break;
    }

    return fn;
  };

  const sortFunctions = (type: SortType) => {
    let fn: ((task_1: TaskType, task_2: TaskType) => number) | undefined;

    switch (type) {
      case "LATEST-CHANGE":
        fn = (task_1, task_2) => {
          let updated_at_1 = new Date(task_1.updated_at);
          let updated_at_2 = new Date(task_2.updated_at);

          return updated_at_1.getTime() - updated_at_2.getTime();
        };
        break;
      case "NAME":
        fn = undefined;
        break;
      case "DEADLINE":
        fn = (task_1, task_2) => {
          let deadline_1 = new Date(task_1.deadline);
          let deadline_2 = new Date(task_2.deadline);

          return deadline_1.getTime() - deadline_2.getTime();
        };
        break;
      case "CREATED-AT":
        fn = (task_1, task_2) => {
          let created_at_1 = new Date(task_1.created_at);
          let created_at_2 = new Date(task_2.created_at);

          return created_at_1.getTime() - created_at_2.getTime();
        };
      case "PRIORITY":
        fn = (task_1, task_2) => {
          const valuation = (priority: TaskPriorityType) => {
            let values: number;

            switch (priority) {
              case "HIGH":
                values = 2;
                break;
              case "MED":
                values = 1;
                break;
              case "LOW":
                values = 0;
                break;
              default:
                values = 0;
                break;
            }

            return values;
          };

          let task_priority_1 = task_1.priority;
          let task_priority_2 = task_2.priority;

          return valuation(task_priority_1) - valuation(task_priority_2);
        };
        break;
      default:
        fn = undefined;
        break;
    }
    return fn;
  };

  let preprocessedTasksList = React.useMemo(() => {
    if (props.task_list) {
      let task_list = props.task_list
        ?.filter((task) =>
          task.assigned_member.some((member) => member.username === byAssigned)
        )
        .filter(filterFunctions(filter))
        .slice(0);

      task_list.sort(sortFunctions(sort));

      return task_list;
    } else {
      return [];
    }
  }, [props, sort, filter, byAssigned, sortType]);

  const ListViews =
    props.task_list ? (
      props.task_list.map((task, index) => {
        return (
          <li className={s.task} key={`next-up-${index}`}>
            <TaskCard
              assigned_member={task.assigned_member}
              comments_count={task.comments.length}
              deadline={task.deadline}
              description={task.description}
              name={task.title}
              priority={task.priority}
              id={task.t_id}
              w_id={task.t_id}
            />
          </li>
        );
      })
    ) : (
      <span className={[s.no_task, "sm", "regular"].join(" ")}>
        Currently no task
      </span>
    );

  return (
    <section className={s.stage}>
      <ProgressTitle
        bg_color="#080726"
        bg_color_accent="#BBE0EF"
        color="#fff"
        count={
          props.task_list ? props.task_list.length : 0
        }
        title={props.title}
        type={props.status}
        newTaskHandler={props.newTask}
      />
      <div className={s.list_screen}>
        <ul className={s.task_list}>{ListViews}</ul>
      </div>
    </section>
  );
};

export default TaskStageSection;
