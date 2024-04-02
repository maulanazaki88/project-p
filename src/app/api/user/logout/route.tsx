import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function logout(req: NextRequest) {
  cookies().delete("swift_session");
  cookies().delete("w_accs_tkn");
  cookies().delete("t_accs_tkn");
  
  return NextResponse.json(
    { message: "delete cookie success" },
    { status: 200 }
  );
}
