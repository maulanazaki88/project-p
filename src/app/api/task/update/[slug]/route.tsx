import { NextRequest, NextResponse } from "next/server";
import { updateTask } from "../../../../../../services/task.services";

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const t_id = params.slug;

  let body = await req.json();

  try {
    const response = await updateTask(t_id, body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
