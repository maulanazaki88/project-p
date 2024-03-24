import { createUser } from "../../../../services/user.services";
import { NextRequest, NextResponse } from "next/server";
import { addMemberWaitingList } from "../../../../services/workspace.service";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = (await req.json()) as {
      username: string;
      email: string;
      password: string;
      w_id: string;
    };

    const signup_res = await createUser({
      email: body.email,
      username: body.username,
      password: body.password,
    });

    if (signup_res && signup_res.message === "success") {
      const addWaitingList_res = await addMemberWaitingList(body.w_id, {
        u_id: signup_res.u_id,
        username: body.username,
      });

      if (addWaitingList_res && addWaitingList_res.updated_count > 0) {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL}/invitation/${body.w_id}/user/${signup_res.username}`,
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
        { message: "Failed add member, unauthorized initiator" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error("Error add member to waiting list: ", error.message);
  }
}
