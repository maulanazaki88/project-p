import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { createWorkspace } from "../../../../services/workspace.service";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  let body = await req.json();
  try {
    const response = await createWorkspace(body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
