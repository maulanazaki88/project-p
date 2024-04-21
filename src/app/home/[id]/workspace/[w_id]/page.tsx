"use client";
import React from "react";
import WorkspacePage from "@/components/workspace-page/WorkspacePage";
import Context, { ContextType } from "@/context/Store";
import { WorkspaceType } from "@/type";
import Loading from "@/components/loading/LoadingLight";

const currentDate = new Date();

const Workspace: React.FC<{ params: { id: string; w_id: string } }> = (
  props
) => {
  const loading_workspace = {
    activity_list: [],
    admin_list: [],
    created_at: currentDate,
    description: "~",
    member_list: [],
    name: "~",
    notification_list: [],
    status: "ON-GOING",
    task_ids: [],
    task_list: [],
    updated_at: currentDate,
    w_id: "~",
    waiting_list: [],
  } as WorkspaceType;
  const {
    user_workspaces_ctx,
    workspace_refresh_ctx,
    user_data_ctx,
    user_data_handler_ctx,
    theme_ctx,
  } = React.useContext(Context) as ContextType;

  const is_dark = theme_ctx === "dark";

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (user_data_ctx) {
      fetch(
        `/api/workspace/get/${props.params.w_id}?u_id=${props.params.id}&w_id=${props.params.w_id}`,
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
          setIsLoading(false);
          workspace_refresh_ctx(props.params.w_id, {
            u_id: props.params.id,
            wokrspace: data,
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

  const workspace = React.useMemo(() => {
    const data = user_workspaces_ctx.find((w) => w.w_id === props.params.w_id);
    return data ? data : (loading_workspace as WorkspaceType);
  }, [user_workspaces_ctx]);

  if (!isLoading) {
    return <WorkspacePage data={workspace} />;
  } else {
    return (
      <div className={["loading_screen", is_dark && "dark"].join(" ")}>
        <Loading color={is_dark ? "#fff" : "#1a1a2e"} size={100} />
      </div>
    );
  }
};

export default Workspace;
