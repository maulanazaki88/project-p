import { NextRequest, NextResponse } from "next/server";
import { getUserAllWorkspace } from "../../../../../../../services/workspace.service";
import { WorkspaceType } from "../../../../../../type";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const u_id = params.slug;

  try {
    const res = (await getUserAllWorkspace(u_id)) as WorkspaceType[];

    if (res) {
      return NextResponse.json(res);
    }
  } catch (error: any) {
    console.error("API get user all workspace error: ", error.message);
  }
}
