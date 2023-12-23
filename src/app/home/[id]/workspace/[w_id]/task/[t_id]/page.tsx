"use client";
import React from "react";
import TaskPage from "@/components/task-page/TaskPage";
import Context, { ContextType } from "@/context/Store";

const Task: React.FC<{
  params: { id: string; t_id: string };
}> = (props) => {
  const { user_task_ctx, user_data_handler_ctx } = React.useContext(
    Context
  ) as ContextType;

  React.useEffect(() => {
    fetch(`/api/get-user/${props.params.id}`)
      .then((res) => res)
      .then((data) => data.json())
      .then((data) => {
        user_data_handler_ctx(data);
        return;
      })
      .catch((e) => console.log(e));
  }, []);
  if (user_task_ctx.find((t) => t.t_id === props.params.t_id)) {
    return (
      <TaskPage
        task_data={user_task_ctx.find((t) => t.t_id === props.params.t_id)}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Task;
