import { NextRequest, NextResponse } from "next/server";

import { taskAddComment } from "../../../../../../../services/task.services";

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const t_id = params.slug;

  let body = await req.json();

  try {
    const response = await taskAddComment(t_id, body);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.error();
  }
}
