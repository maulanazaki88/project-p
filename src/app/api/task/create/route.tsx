import { NextRequest, NextResponse } from "next/server";
import { createTask } from "../../../../../services/task.services";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
    let body = await req.json()

    try {
        const response = await createTask(body);
        return NextResponse.json(response)

    } catch (error: any) {
        return NextResponse.error()
    }
}
