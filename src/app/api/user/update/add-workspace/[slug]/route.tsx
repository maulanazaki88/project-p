import { NextRequest, NextResponse } from "next/server";
import { userAddWorkspace } from "../../../../../../../services/user.services";

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const u_id = params.slug;
  let body = await req.json();
  try {
    const response = await userAddWorkspace(u_id, body.w_id);
    console.log("API user-add-workspace-res: ", response);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
