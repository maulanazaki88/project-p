import s from "./MemberList.module.css";
import React from "react";
import RoundButton from "../round-button/RoundButton";
import ButtonLarge from "../button-large/ButtonLarge";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Context, { ContextType } from "@/context/Store";
import UsernameItem from "../username-button/UsernameItem";

interface MemberListProps {
  closeHandler: () => void;
  show: boolean;
  showWaitingListHandler: () => void;
  showInvitationMenuHandler: () => void;
}

const MemberList: React.FC<MemberListProps> = (props) => {
  const {
    user_workspaces_ctx,
    workspace_refresh_member,
    owner_kick_user_workspace,
  } = React.useContext(Context) as ContextType;

  const pathname = usePathname();

  const w_id = pathname.split("/")[4];

  const router = useRouter();

  const u_id = pathname.split("/")[2];

  const workspace = React.useMemo(() => {
    const workspace = user_workspaces_ctx.find((w) => w.w_id === w_id);
    return workspace;
  }, [user_workspaces_ctx]);

  // const workspace_name = React.useMemo(() => {
  //   const workspace = user_workspaces_ctx.find((w) => w.w_id === w_id);
  //   if (workspace) {
  //     return workspace.name;
  //   } else {
  //     return "~";
  //   }
  // }, [user_workspaces_ctx]);

  React.useEffect(() => {
    //fetch
    if (props.show) {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/workspace/get/member-list/${w_id}?u_id=${u_id}&w_id=${w_id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          cache: "no-cache",
        }
      )
        .then((res) => res)
        .then((data) => data.json())
        .then((data) => {
          workspace_refresh_member(w_id, {
            action: "REFRESH",
            member_list: data,
            u_id: u_id,
          });
        })
        .catch((e: any) => {
          console.log(e);
          alert(e.message);
        });
    }
  }, [props.show]);

  const isOwner = React.useMemo(() => {
    const workspace = user_workspaces_ctx.find((w) => w.w_id === w_id);

    return workspace && workspace.admin_list.some((u) => u.u_id === u_id);
  }, [user_workspaces_ctx]);

  const kickHandler = async (kick_id: string) => {
    const data = await owner_kick_user_workspace(u_id, w_id, kick_id);

    const updated_count = await data.updated_count;

    if (updated_count && updated_count > 0) {
      console.log("Yeyyyy");
    }
  };

  return (
    <div
      className={s.menu}
      style={{ translate: props.show ? "-50% -50%" : "-50% 100%" }}
    >
      {/* <MenuNavbar title={workspace_nam  e} closeHandler={props.closeHandler} /> */}
      <RoundButton
        color="#fff"
        icon={"/icons/close_black.svg"}
        opacity={1}
        onClick={() => {
          props.closeHandler();
        }}
        scale={1.2}
        style={{
          position: "absolute",
          top: "2%",
          right: "2%",
          zIndex: 99,
        }}
      />
      <h3 className={[s.title, "medium", "md"].join(" ")}>Member List</h3>
      <div className={s.ctn_screen}>
        <ul className={s.list}>
          <li
            className={s.item}
            key={`candidate-you}`}
            // style={{ justifyContent: "flex-start" }}
          >
            <UsernameItem
              u_id={u_id}
              username={"You"}
              kickHandler={kickHandler}
              isOwner={
                workspace?.admin_list.some((w) => w.u_id === u_id)
                  ? true
                  : false
              }
              isSelf
            />
          </li>
          {workspace?.member_list.map((member, index) => {
            if (member.u_id !== u_id) {
              return (
                <li className={s.item} key={`candidate-${index}`}>
                  <UsernameItem
                    u_id={member.u_id}
                    username={member.username}
                    kickHandler={kickHandler}
                    isOwner={
                      workspace?.admin_list.some((w) => w.u_id === member.u_id)
                        ? true
                        : false
                    }
                  />
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </div>
      <div className={s.action}>
        <ButtonLarge
          bg_color="#080726"
          color="#fff"
          text="Waiting List"
          icon="/icons/queue_white.svg"
          onClick={props.showWaitingListHandler}
          rowReverse
        />
        <ButtonLarge
          bg_color="#080726"
          color="#fff"
          text="Invite friends"
          icon="/icons/plus_white.svg"
          onClick={props.showInvitationMenuHandler}
          rowReverse
        />
      </div>
    </div>
  );
};

export default MemberList;

export const MemoizedMemberList = React.memo(MemberList);
