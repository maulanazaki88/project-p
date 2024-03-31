import { NextRequest, NextResponse } from "next/server";
import { login } from "../../../../../services/user.services";
import { addMemberWaitingList } from "../../../../../services/workspace.service";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = (await req.json()) as {
    email: string;
    password: string;
    w_id: string;
  };

  try {
    const login_response = await login({
      email: data.email,
      password: data.password,
    });

    if (login_response?.message === "success" ) {
      const addMember_response = await addMemberWaitingList(data.w_id, {
        u_id: login_response.u_id,
        username: login_response.username,
      });

      if (addMember_response && addMember_response?.updated_count > 0) {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL}/invitation/${data.w_id}/user/${login_response.u_id}`,
          { status: 307 }
        );
      } else {
        return NextResponse.json(
          { message: "Failed add member, workspace not found" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Failed add member, unauthorized" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error(
      "Error adding user to workspace waiting list: ",
      error.message
    );
  }
}
