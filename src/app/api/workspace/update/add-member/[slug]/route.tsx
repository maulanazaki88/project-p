import { NextRequest, NextResponse } from "next/server";
import { workspaceAddMember } from "../../../../../../../services/workspace.service";

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const w_id = params.slug;
  let body = await req.json();

  try {
    const response = await workspaceAddMember(w_id, body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
