import { NextRequest, NextResponse } from "next/server";
import { getUserAllTask } from "../../../../../services/task.services";
import { TaskType } from "@/type";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const u_id = params.slug;

  try {
    const res = (await getUserAllTask(u_id)) as TaskType[];
    return NextResponse.json(res);
  } catch (error: any) {
    console.error("API get user all task error:", error.message);
  }
}
