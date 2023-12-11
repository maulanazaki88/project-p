import React from "react";
import { getWorkspace } from "@/server/actions";
import WorkspacePage from "@/components/workspace-page/WorkspacePage";

const Workspace: React.FC<{ params: { id: string } }> = async (props) => {
  const { data, status } = await getWorkspace(props.params.id);

  if (data && status == 200) {
    return <WorkspacePage data={data} />;
  } else {
    return <div>Loading...</div>
  }
};

export default Workspace;
