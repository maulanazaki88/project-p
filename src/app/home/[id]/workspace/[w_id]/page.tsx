"use client";
import React from "react";
import WorkspacePage from "@/components/workspace-page/WorkspacePage";
import Context, { ContextType } from "@/context/Store";
import { WorkspaceType } from "@/type";
import { useDateNow } from "@/hook/useDateNow";

const Workspace: React.FC<{ params: { id: string; w_id: string } }> = (
  props
) => {
  const { user_workspaces_ctx, user_data_handler_ctx } = React.useContext(
    Context
  ) as ContextType;

  const date_now = useDateNow();

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

  const loading_workspace: WorkspaceType = {
    activity_list: [],
    admin_list: [],
    created_at: date_now.withTime(),
    description: "",
    member_list: [],
    name: "",
    notification_list: [],
    status: "ON-GOING",
    task_ids: [],
    task_list: [],
    updated_at: date_now.withTime(),
    w_id: props.params.w_id,
    waiting_list: []
  };

  const workspace = React.useMemo(() => {
    const data = user_workspaces_ctx.find((w) => w.w_id === props.params.w_id);
    if (data) {
      return data;
    } else {
      return loading_workspace;
    }
  }, [user_workspaces_ctx]);

  return <WorkspacePage data={workspace} />;
};

export default Workspace;
