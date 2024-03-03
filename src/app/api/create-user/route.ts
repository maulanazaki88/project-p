import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../../../services/user.services";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  let body = await req.json();
  try {
    const response = await createUser(body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
