import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12 hour from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    // console.log("PAYLOAD: ", payload);
    return payload;
  } catch (error: any) {
    console.error("Decrypt error: ", error.message);
  }
}

export async function updateSession(session_name: string, req: NextRequest) {
  const session = req.cookies.get(session_name)?.value;
  if (!session) return;

  // Automatically refresh the session

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 3600 * 1000 * 12);
  const res = NextResponse.next();
  res.cookies.set({
    name: session_name,
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

/**
 *
 * @param u_ids - user id list for task participant
 * @param token - session token
 * @param req
 * @returns update token session and next()
 */
export const protectTasks = async (
  t_id_param: string,
  u_id: string,
  token: string,
  req: NextRequest,
  type: "GET" | "PUT" | "DELETE" | "POST"
) => {
  try {
    const { t_accs_payload } = await decrypt(token);
    // console.log("assigned_member from token: ", t_accs_payload.assigned_member);
    // console.log("t_id from token: ", t_accs_payload.t_id);

    if (
      type === "DELETE" &&
      t_accs_payload &&
      t_accs_payload.assigned_member &&
      t_accs_payload.assigned_member.some((m: any) => m.u_id === u_id) &&
      t_accs_payload.t_id === t_id_param
    ) {
      return await updateSession("t_accs_tkn", req);
    } else {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Not Authorized",
      },
      { status: 401 }
    );
  }
};

/**
 *
 * @param u_ids - user id list for workspace member
 * @param token - session token
 * @param req
 * @returns update token session and next()
 */
export const protectWorkspace = async (
  w_id_param: string,
  u_id: string,
  token: string,
  req: NextRequest,
  type: "GET" | "PUT" | "DELETE" | "POST"
) => {
  try {
    const { w_accs_payload } = await decrypt(token);

    // console.log("admin_list from token: ", w_accs_payload.admin_list);
    // console.log("member_list from token: ", w_accs_payload.member_list);
    // console.log("w_id from token: ", w_accs_payload.w_id);

    if (
      type === "DELETE" &&
      w_accs_payload &&
      w_accs_payload.admin_list &&
      w_accs_payload.admin_list.some((m: any) => m.u_id === u_id) &&
      w_accs_payload.w_id === w_id_param
    ) {
      return await updateSession("w_accs_tkn", req);
    } else if (
      (type === "PUT" || type === "POST" || type === "GET") &&
      w_accs_payload &&
      w_accs_payload.member_list &&
      w_accs_payload.member_list.some((m: any) => m.u_id === u_id) &&
      w_accs_payload.w_id === w_id_param
    ) {
      return await updateSession("w_accs_tkn", req);
    } else {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Not Authorized",
      },
      { status: 401 }
    );
  }
};

/**
 *
 * @param u_id - user id to authnticate
 * @param token session token
 * @param req - NextRequest
 * @returns update token session and next()
 */
export const protectUser = async (
  w_id: string | undefined,
  u_id: string,
  token: string,
  req: NextRequest,
  type: "GET" | "PUT" | "POST" | "DELETE"
) => {
  try {
    const { safe_user } = await decrypt(token);
    // console.log("token: ", token);
    // console.log("safe_user from token: ", safe_user);
    // console.log("u_id: ", u_id);

    if (
      (type === "DELETE" || type === "PUT") &&
      safe_user &&
      u_id === safe_user.u_id
    ) {
      return await updateSession("swift_session", req);
    } else if (
      (type === "GET" || type === "POST") &&
      w_id &&
      safe_user.workspace_ids.some((w: any) => w === w_id)
    ) {
    } else {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
  } catch (error: any) {
    console.error("Protect user: ", error.message);
    return NextResponse.json(
      {
        message: "Not Authorized",
      },
      { status: 401 }
    );
  }
};