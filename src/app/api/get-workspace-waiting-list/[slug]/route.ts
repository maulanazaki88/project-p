import { NextRequest, NextResponse } from "next/server";
import { getWorkspaceWaitingList } from "../../../../../services/workspace.service";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const w_id = params.slug;
    const response = await getWorkspaceWaitingList(w_id);
    if (response) {
      return NextResponse.json(response, { status: 200 });
    } else {
      throw new Error();
    }
  } catch (error: any) {
    console.error("Api get workspace waiting list error: ", error.message);
  }
}
