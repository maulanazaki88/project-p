import { NextRequest, NextResponse } from "next/server";
import { login } from "../../../../services/user.services";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  let body = await req.json();

  try {
    const response = await login(body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
