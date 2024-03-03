import { NextRequest, NextResponse } from "next/server";
import { userDeleteWorkspace } from "../../../../../services/user.services";

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const u_id = params.slug;
  let body = await req.json();

  try {
    const response = await userDeleteWorkspace(u_id, body.w_id);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
