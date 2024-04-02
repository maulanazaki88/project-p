import { NextRequest, NextResponse } from "next/server";
import { protectHomeRoute, protectWorkspaceRoute, updateSession } from "./lib";
import { protectTasks } from "./lib";
import { protectWorkspace } from "./lib";
import { protectUser } from "./lib";

export async function middleware(request: NextRequest) {
  const method = request.method;

  const swift_session = request.cookies.get("swift_session")?.value;
  const w_accs_tkn = request.cookies.get("w_accs_tkn")?.value;
  const t_accs_tkn = request.cookies.get("t_accs_tkn")?.value;

  // console.log("swift_session: ", swift_session);
  // console.log("w_accs_tkn: ", w_accs_tkn);
  // console.log("t_accs_tkn: ", t_accs_tkn);
  if (
    request.nextUrl.pathname.startsWith("/home/") &&
    !request.nextUrl.pathname.includes("/api/")
  ) {
    console.log(
      "MIDDLEWARE INTERCEPT: ",
      `${request.nextUrl.pathname} method: ${method}`
    );

    const u_id = request.nextUrl.pathname.split("/")[2];
    console.log("u_id: ", u_id);
    if (u_id && swift_session) {
      return await protectHomeRoute(u_id, swift_session, request);
    } else {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    }
  } else if (
    request.nextUrl.pathname.startsWith("/api/workspace") &&
    method === "POST"
  ) {
    console.log(
      "MIDDLEWARE INTERCEPT: ",
      `${request.nextUrl.pathname} method: ${method}`
    );
    const u_id = request.nextUrl.searchParams.get("u_id");
    const w_id = request.nextUrl.searchParams.get("w_id");
    console.log("authorization", swift_session);
    if (swift_session && u_id && w_id) {
      return await protectUser(w_id, u_id, swift_session, request, method);
    } else {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
  } else if (
    request.nextUrl.pathname.startsWith("/api/workspace") &&
    method === "GET"
  ) {
    console.log("authorization", swift_session);
    console.log(
      "MIDDLEWARE INTERCEPT: ",
      `${request.nextUrl.pathname} method: ${method} authorization: ${swift_session}`
    );
    const u_id = request.nextUrl.searchParams.get("u_id");
    const w_id = request.nextUrl.searchParams.get("w_id");

    if (swift_session && u_id && w_id) {
      return await protectUser(w_id, u_id, swift_session, request, method);
    } else {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
  } else if (
    request.nextUrl.pathname.startsWith("/api/workspace") &&
    (method === "PUT" || method === "DELETE")
  ) {
    console.log(
      "MIDDLEWARE INTERCEPT: ",
      `${request.nextUrl.pathname} method: ${method}`
    );
    const u_id = request.nextUrl.searchParams.get("u_id");
    const w_id = request.nextUrl.searchParams.get("w_id");
    console.log("authorization", w_accs_tkn);
    if (w_accs_tkn && u_id && w_id) {
      return await protectWorkspace(w_id, u_id, w_accs_tkn, request, method);
    } else {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
  } else if (
    request.nextUrl.pathname.startsWith("/api/task") &&
    method === "POST"
  ) {
    const u_id = request.nextUrl.searchParams.get("u_id");
    const w_id = request.nextUrl.searchParams.get("w_id");
    console.log(
      "MIDDLEWARE INTERCEPT: ",
      `${request.nextUrl.pathname} method: ${method}`
    );
    if (w_accs_tkn && u_id && w_id) {
      return await protectWorkspace(w_id, u_id, w_accs_tkn, request, method);
    } else {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
  } else if (
    request.nextUrl.pathname.startsWith("/api/task") &&
    method === "PUT"
  ) {
    const u_id = request.nextUrl.searchParams.get("u_id");
    const w_id = request.nextUrl.searchParams.get("w_id");
    console.log(
      "MIDDLEWARE INTERCEPT: ",
      `${request.nextUrl.pathname} method: ${method}`
    );
    if (w_accs_tkn && u_id && w_id) {
      return await protectWorkspace(w_id, u_id, w_accs_tkn, request, method);
    } else {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
  } else if (
    request.nextUrl.pathname.startsWith("/api/task") &&
    method === "GET"
  ) {
    const u_id = request.nextUrl.searchParams.get("u_id");
    const w_id = request.nextUrl.searchParams.get("w_id");
    console.log(
      "MIDDLEWARE INTERCEPT: ",
      `${request.nextUrl.pathname} method: ${method}`
    );
    if (swift_session && u_id && w_id) {
      return await protectUser(w_id, u_id, swift_session, request, method);
    } else {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
  } else if (
    request.nextUrl.pathname.startsWith("/api/task") &&
    method === "DELETE"
  ) {
    const u_id = request.nextUrl.searchParams.get("u_id");
    const t_id = request.nextUrl.searchParams.get("t_id");
    console.log(
      "MIDDLEWARE INTERCEPT: ",
      `${request.nextUrl.pathname} method: ${method}`
    );
    if (t_accs_tkn && u_id && t_id) {
      return await protectTasks(t_id, u_id, t_accs_tkn, request, method);
    } else {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
  } else if (
    request.nextUrl.pathname.startsWith("/api/user") &&
    method === "PUT"
  ) {
    const u_id = request.nextUrl.searchParams.get("u_id");
    const w_id = request.nextUrl.searchParams.get("w_id");
    console.log(
      "MIDDLEWARE INTERCEPT: ",
      `${request.nextUrl.pathname} method: ${method}`
    );
    if (swift_session && u_id && w_id) {
      return await protectUser(w_id, u_id, swift_session, request, method);
    } else {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
  } else {
    return await updateSession("swift_session", request);
  }
}
