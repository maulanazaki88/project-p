
import React from "react";
import { getTask } from "@/server/actions";
import TaskPage from "@/components/task-page/TaskPage";

const Task: React.FC<{ params: { id: string } }> = async (props) => {

  const {data, status} = await getTask(props.params.id)

  if(data && status == 200){
    return <TaskPage data={data} />
  } else {
    return (
      <div>Loading...</div>
    )
  }
 
};

export default Task;