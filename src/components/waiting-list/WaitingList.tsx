import s from "./WaitingList.module.css";
import React from "react";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import UsernameButton from "../username-button/UsernameButton";
import RoundButton from "../round-button/RoundButton";

interface WaitingListProps {
  list: { username: string; u_id: string }[];
  accHandler: (data: { u_id: string; w_id: string; username: string }) => void;
  rejHandler: (data: { u_id: string; w_id: string; username: string }) => void;
  workspace_name: string;
  closeHandler: () => void;
  show: boolean;
  w_id: string;
}

const WaitingList: React.FC<WaitingListProps> = (props) => {
  return (
    <div className={s.menu} style={{translate: props.show ?  "0 0" : "100vw 0"}} >
      <MenuNavbar
        title={props.workspace_name}
        closeHandler={props.closeHandler}
      />
      <div className={s.ctn_screen}>
        <ul className={s.list}>
          {props.list.map((candidate, index) => {
            return (
              <li className={s.item} key={`candidate-${index}`}>
                <UsernameButton username={candidate.username} />
                <div className={s.btn_group}>
                  <RoundButton
                    color="#79C89F"
                    icon="/icons/check_white.svg"
                    opacity={1}
                    onClick={() => {
                      props.accHandler({
                        u_id: candidate.u_id,
                        username: candidate.username,
                        w_id: props.w_id,
                      });
                    }}
                  />
                  <RoundButton
                    color="#79C89F"
                    icon="/icons/plus_white.svg"
                    opacity={1}
                    onClick={() => {
                      props.rejHandler({
                        u_id: candidate.u_id,
                        username: candidate.username,
                        w_id: props.w_id,
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
