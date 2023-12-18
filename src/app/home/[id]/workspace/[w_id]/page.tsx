import React from "react";
import { getUser, getWorkspace } from "@/server/actions";
import WorkspacePage from "@/components/workspace-page/WorkspacePage";

const Workspace: React.FC<{ params: { id: string; w_id: string } }> = async (
  props
) => {
  const user_response = await getUser(props.params.id);

  if (user_response.data && user_response.status == 200) {
    const workspace_response = await getWorkspace(props.params.w_id);
    if (workspace_response.data && workspace_response.status == 200) {
      return (
        <WorkspacePage
          user_data={user_response.data}
          workspace_data={workspace_response.data}
        />
      );
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default Workspace;
