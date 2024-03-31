import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../../../../services/user.services";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  let body = await req.json();
  try {
    const response = await createUser(body);
    if (response && response.u_id && !response.exist) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/home/${response?.u_id}`,
        { status: 307 }
      );
    } else if(response && response.exist) {
      return NextResponse.json(response?.message, {status: 409});
    } else {
      return NextResponse.json(response?.message, {status: 500})
    }
  } catch (error) {
    return NextResponse.error();
  }
}
