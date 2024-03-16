"use client";
import React from "react";
import TaskPage from "@/components/task-page/TaskPage";
import Context, { ContextType } from "@/context/Store";
import { TaskType } from "@/type";
import { useDateNow } from "@/hook/useDateNow";

const Task: React.FC<{
  params: { id: string; t_id: string };
}> = (props) => {
  const { user_task_ctx, user_data_handler_ctx } = React.useContext(
    Context
  ) as ContextType;

  const date_now = useDateNow();

  React.useEffect(() => {
    fetch(`/api/get-user/${props.params.id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
    })
      .then((res) => res)
      .then((data) => data.json())
      .then((data) => {
        user_data_handler_ctx(data);
        return;
      })
      .catch((e) => console.log(e));
  }, []);

  const currentDate = new Date()

  const loading_task: TaskType = {
    activity_list: [],
    assigned_member: [],
    author: "",
    comments: [],
    created_at: currentDate,
    deadline: currentDate,
    description: "",
    priority: "MED",
    seen_by: [],
    status: "IN-PROGRESS",
    t_id: props.params.t_id,
    title: "",
    updated_at: currentDate,
    w_id: "",
    workspace_name: "",
  };

  const task = React.useMemo(() => {
    const data = user_task_ctx.find((t) => t.t_id === props.params.t_id);

    if (data) {
      return data;
    } else {
      return loading_task;
    }
  }, [user_task_ctx]);

  return <TaskPage task_data={task} />;
};

export default Task;
