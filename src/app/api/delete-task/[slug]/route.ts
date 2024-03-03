import { NextRequest, NextResponse } from "next/server";
import { deleteTask } from "../../../../../services/task.services";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const t_id = params.slug;

  try {
    const response = await deleteTask(t_id);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
