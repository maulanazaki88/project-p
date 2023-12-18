import React from "react";
import { getTask, getUser } from "@/server/actions";
import TaskPage from "@/components/task-page/TaskPage";

const Task: React.FC<{
  params: { id: string; w_id: string; t_id: string };
}> = async (props) => {
  const response_user = await getUser(props.params.id);

  if (response_user.data && response_user.status == 200) {
    const response_task = await getTask(props.params.t_id);
    if (response_task.data && response_task.status == 200) {
      return (
        <TaskPage
          task_data={response_task.data}
          user_data={response_user.data}
        />
      );
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default Task;
