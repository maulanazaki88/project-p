import s from "./WaitingList.module.css";
import React from "react";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import UsernameButton from "../username-button/UsernameButton";
import RoundButton from "../round-button/RoundButton";
import Context, { ContextType } from "@/context/Store";
import { usePathname } from "next/navigation";

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

  React.useEffect(() => {
    if (props.show) {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-workspace-waiting-list/${w_id}`,
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
  }, [props]);

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
        onClick={() => {props.closeHandler()}}
        scale={1.2}
        style={{
          position: "absolute",
          top: "2%",
          right: "2%",
          zIndex: 99
        }}
      />
      <div className={s.header}>
        <h2 className={[s.title, "md", "medium"].join(" ")}>Waiting Room</h2>
      </div>
      <div className={s.ctn_screen}>
        {waiting_list.length === 0 && (
          <p className={[s.empty_txt, "reguler", "md", "soft"].join(" ")}>
            Antrian Kosong
          </p>
        )}

        <ul className={s.list}>
          {waiting_list.map((candidate, index) => {
            return (
              <li className={s.item} key={`candidate-${index}`}>
                <UsernameButton username={candidate.username} />
                <div className={s.btn_group}>
                  <RoundButton
                    color="#79C89F"
                    icon="/icons/check_white.svg"
                    scale={0.87}
                    opacity={1}
                    onClick={() => {
                      owner_acc_user_add_workspace_ctx(w_id, {
                        candidate: candidate,
                        u_id: u_id,
                      });
                    }}
                  />
                  <RoundButton
                    color="red"
                    icon="/icons/plus_white.svg"
                    opacity={1}
                    onClick={() => {
                      owner_reject_user_add_workspace_ctx(w_id, {
                        candidate: candidate,
                        u_id: u_id,
                      });
                    }}
                    rotate={45}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default WaitingList;
