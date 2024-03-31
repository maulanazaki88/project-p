import { NextRequest, NextResponse } from "next/server";
import { deleteUser } from "../../../../../../services/user.services";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const u_id = params.slug;

  try {
    const response = await deleteUser(u_id);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
