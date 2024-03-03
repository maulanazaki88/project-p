import { NextRequest, NextResponse } from "next/server";
import { getTask } from "../../../../../services/task.services";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const t_id = params.slug;
  try {
    const response = await getTask(t_id);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
