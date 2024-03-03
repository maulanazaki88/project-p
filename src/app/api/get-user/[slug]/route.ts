import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../../../../services/user.services";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const u_id = params.slug;
  try {
    const response = await getUser(u_id);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
