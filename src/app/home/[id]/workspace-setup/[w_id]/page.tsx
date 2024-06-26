"use client";
import React from "react";
import WorkspaceSetupPage from "@/components/workspace-setup-page/WorkspaceSetupPage";
import Context, { ContextType } from "@/context/Store";

const Workspace: React.FC<{ params: { id: string; w_id: string } }> = (
  props
) => {
  const { user_workspaces_ctx, user_data_handler_ctx } = React.useContext(
    Context
  ) as ContextType;

  React.useEffect(() => {
    fetch(`/api/user/get/${props.params.id}`, {
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

  if (user_workspaces_ctx?.find((w) => w.w_id === props.params.w_id)) {
    return (
      <WorkspaceSetupPage
        data={user_workspaces_ctx?.find((w) => w.w_id === props.params.w_id)}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Workspace;
