import { NextRequest, NextResponse } from "next/server";
import { deleteWorkspace } from "../../../../../../services/workspace.service";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const w_id = params.slug;
  try {
    const response = await deleteWorkspace(w_id);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
