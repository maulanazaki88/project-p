"use client";
import React from "react";
import WorkspacePage from "@/components/workspace-page/WorkspacePage";
import Context, { ContextType } from "@/context/Store";
import { WorkspaceType } from "@/type";
import { useDateNow } from "@/hook/useDateNow";
import Loading from "@/components/loading/LoadingLight";

const Workspace: React.FC<{ params: { id: string; w_id: string } }> = (
  props
) => {
  const { user_workspaces_ctx, user_data_handler_ctx } = React.useContext(
    Context
  ) as ContextType;

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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
        setIsLoading(false);
        user_data_handler_ctx(data);
        return;
      })
      .catch((e) => console.log(e));
  }, []);

  const currentDate = new Date();

  const loading_workspace: WorkspaceType = {
    activity_list: [],
    admin_list: [],
    created_at: currentDate,
    description: "",
    member_list: [],
    name: "",
    notification_list: [],
    status: "ON-GOING",
    task_ids: [],
    task_list: [],
    updated_at: currentDate,
    w_id: props.params.w_id,
    waiting_list: [],
  };

  const workspace = React.useMemo(() => {
    const data = user_workspaces_ctx.find((w) => w.w_id === props.params.w_id);
    return data;
  }, [user_workspaces_ctx]);

  if (
    !isLoading &&
    workspace
  ) {
    return <WorkspacePage data={workspace} />;
  } else {
    return (
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading color="#1a1a2e" size={100} />
      </div>
    );
  }
};

export default Workspace;
