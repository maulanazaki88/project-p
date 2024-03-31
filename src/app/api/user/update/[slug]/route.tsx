import { NextRequest, NextResponse } from "next/server";
import { updateUser } from "../../../../../../services/user.services";

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const u_id = params.slug;
  let body = await req.json();
  try {
    const response = await updateUser(u_id, body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
