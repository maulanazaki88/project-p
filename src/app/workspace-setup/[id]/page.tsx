import React from "react";
import { getWorkspace } from "@/server/actions";
import WorkspaceSetupPage from "@/components/workspace-setup-page/WorkspaceSetupPage";

const Workspace: React.FC<{ params: { id: string } }> = async (props) => {
  const { data, status } = await getWorkspace(props.params.id);

  if (data && status == 200) {
    return <WorkspaceSetupPage data={data}  />;
  } else {
    return <div>Loading...</div>
  }
};

export default Workspace;
