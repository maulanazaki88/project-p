import { NextRequest, NextResponse } from "next/server";
import { getWorkspace } from "../../../../../../services/workspace.service";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const w_id = params.slug;
  try {
    const response = await getWorkspace(w_id);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
