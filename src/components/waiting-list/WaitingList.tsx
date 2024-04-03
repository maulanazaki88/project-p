import s from "./WaitingList.module.css";
import React from "react";
import RoundButton from "../round-button/RoundButton";
import Context, { ContextType } from "@/context/Store";
import { usePathname } from "next/navigation";
import WaitingItem from "./WaitingItem";

interface WaitingListProps {
  // list: { username: string; u_id: string }[];
  // accHandler: (data: { u_id: string; w_id: string; username: string }) => void;
  // rejHandler: (data: { u_id: string; w_id: string; username: string }) => void;
  // workspace_name: string;
  closeHandler: () => void;
  show: boolean;
  // w_id: string;
}

const WaitingList: React.FC<WaitingListProps> = (props) => {
  const currentDate = new Date();
  const loading_workspace = {
    activity_list: [],
    admin_list: [],
    created_at: currentDate,
    description: "~",
    member_list: [],
    name: "~",
    notification_list: [],
    status: "ON-GOING",
    task_ids: [],
    task_list: [],
    updated_at: currentDate,
    w_id: "~",
    waiting_list: [],
  };
  const pathname = usePathname();

  const u_id = pathname.split("/")[2];
  const w_id = pathname.split("/")[4];

  const {
    user_workspaces_ctx,
    workspace_refresh_waiting_list,
    owner_acc_user_add_workspace_ctx,
    owner_reject_user_add_workspace_ctx,
  } = React.useContext(Context) as ContextType;

  const waiting_list = React.useMemo(() => {
    const workspace = user_workspaces_ctx.find((w) => w.w_id === w_id);

    return workspace ? workspace.waiting_list : [];
  }, [user_workspaces_ctx]);

  const workspace = React.useMemo(() => {
    const workspace = user_workspaces_ctx.find((w) => w.w_id === w_id);
    if (workspace) {
      return workspace;
    } else {
      return loading_workspace;
    }
  }, [user_workspaces_ctx]);

  React.useEffect(() => {
    if (props.show) {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/workspace/get/waiting-list/${w_id}?w_id=${w_id}&u_id=${u_id}`,
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
          workspace_refresh_waiting_list(w_id, {
            action: "REFRESH",
            u_id: u_id,
            waiting_list: data,
          });
          return;
        })
        .catch((error: any) => {
          alert("Error get waiting list: " + error.message);
        });
    }
  }, [props.show]);

  return (
    <div
      className={s.menu}
      style={{ translate: props.show ? "-50% -50%" : "-50% 100%" }}
    >
      {/* <MenuNavbar
        title={props.workspace_name}
        closeHandler={props.closeHandler}
      /> */}
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
      <div className={s.header}>
        <h2 className={[s.title, "md", "medium"].join(" ")}>Waiting Room</h2>
      </div>
      <div className={s.ctn_screen}>
        {waiting_list.length === 0 && (
          <p className={[s.empty_txt, "reguler", "md", "soft"].join(" ")}>
            Waiting list empty
          </p>
        )}

        <ul className={s.list}>
          {waiting_list.map((candidate, index) => {
            return (
              <li className={s.item} key={`candidate-${index}`}>
                <WaitingItem
                  accHandler={() => {
                    owner_acc_user_add_workspace_ctx(w_id, {
                      candidate: candidate,
                      u_id: u_id,
                    });
                  }}
                  currentUserOwner={workspace.admin_list.some(
                    (u) => u.u_id === u_id
                  )}
                  rejHandler={() => {
                    owner_reject_user_add_workspace_ctx(w_id, {
                      candidate: candidate,
                      u_id: u_id,
                    });
                  }}
                  u_id={candidate.u_id}
                  username={candidate.username}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default WaitingList;

export const MemoizedWaitingList = React.memo(WaitingList);
