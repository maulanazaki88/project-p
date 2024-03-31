import { NextRequest, NextResponse } from "next/server";
import { getWorkspaceMemberList } from "../../../../../../../services/workspace.service";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const w_id = params.slug;
    const response = await getWorkspaceMemberList(w_id);
    if (response) {
      return NextResponse.json(response, { status: 200 });
    } else {
      throw new Error();
    }
  } catch (error: any) {
    console.error("Api get workspace member list error: ", error.message);
  }
}
