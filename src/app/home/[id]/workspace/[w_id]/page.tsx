"use client";
import React from "react";
import WorkspacePage from "@/components/workspace-page/WorkspacePage";
import Context, { ContextType } from "@/context/Store";

const Workspace: React.FC<{ params: { id: string; w_id: string } }> = (
  props
) => {
  const { user_workspaces_ctx, user_data_handler_ctx } = React.useContext(
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

  if (user_workspaces_ctx.find((w) => w.w_id === props.params.w_id)) {
    return (
      <WorkspacePage
        data={user_workspaces_ctx.find((w) => w.w_id === props.params.w_id)}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Workspace;
