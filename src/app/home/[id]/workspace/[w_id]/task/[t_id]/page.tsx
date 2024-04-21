"use client";
import React from "react";
import TaskPage from "@/components/task-page/TaskPage";
import Context, { ContextType } from "@/context/Store";
import { TaskType } from "@/type";
import Loading from "@/components/loading/LoadingLight";

const Task: React.FC<{
  params: { id: string; w_id: string; t_id: string };
}> = (props) => {
  const {
    user_task_ctx,
    user_data_handler_ctx,
    user_data_ctx,
    task_refresh_ctx,
    user_workspaces_ctx,
    theme_ctx,
  } = React.useContext(Context) as ContextType;

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const is_dark = theme_ctx === "dark";

  React.useEffect(() => {
    if (user_data_ctx) {
      fetch(
        `/api/task/get/${props.params.t_id}?u_id=${props.params.id}&w_id=${props.params.w_id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          cache: "no-cache",
        }
      )
        .then((res) => res)
        .then((data) => data.json())
        .then((data) => {
          const workspace = user_workspaces_ctx.find(
            (w) => w.w_id === props.params.w_id
          );

          const workspace_name = workspace ? workspace.name : "~~";

          setIsLoading(false);
          task_refresh_ctx(props.params.t_id, {
            task: { ...data, workspace_name: workspace_name },
            u_id: props.params.id,
            w_id: props.params.w_id,
          });
          return;
        })
        .catch((e) => console.log(e));
    } else {
      setIsLoading(true);
      fetch(`/api/user/get/${props.params.id}?u_id=${props.params.id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        cache: "no-cache",
      })
        .then((res) => res)
        .then((data) => data.json())
        .then((data) => {
          setIsLoading(false);
          user_data_handler_ctx(data);
          return;
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const currentDate = new Date();

  const loading_task: TaskType = {
    activity_list: [],
    assigned_member: [],
    author: "~~",
    comments: [],
    created_at: currentDate,
    deadline: currentDate,
    description: "~~",
    priority: "MED",
    seen_by: [],
    status: "IN-PROGRESS",
    t_id: props.params.t_id,
    title: "~~",
    updated_at: currentDate,
    w_id: "~~",
    workspace_name: "~~",
  };

  const task = React.useMemo(() => {
    const data = user_task_ctx.find((t) => t.t_id === props.params.t_id);

    return data ? data : loading_task;
  }, [user_task_ctx]);

  if (!isLoading) {
    return <TaskPage task_data={task} />;
  } else {
    return (
      <div className={["loading_screen", is_dark && "dark"].join(" ")}>
        <Loading color={is_dark ? "#fff" : "#1a1a2e"} size={100} />
      </div>
    );
  }
};

export default Task;
