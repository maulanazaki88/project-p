import { WorkspaceType } from "@/type";
import s from "./ModalWorkspaceInfo.module.css";
import React from "react";
import { useRenderDate } from "@/hook/useRenderDate";
import RoundButton from "../round-button/RoundButton";

export interface WorkspaceInfoModalProps extends WorkspaceType {
  show: boolean;
  closeHandler: () => void;
}

const ModalWorkspaceInfo: React.FC<WorkspaceInfoModalProps> = (props) => {
  const renderdate = useRenderDate();
  return (
    <div
      className={s.modal}
      style={{ translate: props.show ? "-50% -50%" : "-50% 100%" }}
    >
      <RoundButton
        color="#fff"
        icon={"/icons/close_black.svg"}
        opacity={1}
        onClick={props.closeHandler}
        icon_scale={1.2}
        style={{
          position: "absolute",
          top: "2%",
          right: "2%",
          zIndex: 99,
        }}
      />
      <div className={s.header}>
        <div className={[s.title, 'md', 'medium'].join(' ')}>Workspace Detail</div>
      </div>
      <ul className={s.content}>
        <li className={s.item}>
          <div className={[s.label, "md", "medium"].join(" ")}>ID</div>
          <div className={[s.value, "sm", "medium"].join(" ")}>
            {props.w_id}
          </div>
        </li>
        <li className={s.item}>
          <div className={[s.label, "md", "medium"].join(" ")}>Name</div>
          <div className={[s.value, "sm", "medium"].join(" ")}>
            {props.name}
          </div>
        </li>
        <li className={s.item}>
          <div className={[s.label, "md", "medium"].join(" ")}>Description</div>
          <div className={[s.value, "sm", "medium"].join(" ")}>
            {props.description}
          </div>
        </li>
        <li className={s.item}>
          <div className={[s.label, "md", "medium"].join(" ")}>Created at</div>
          <div className={[s.value, "sm", "medium"].join(" ")}>
            {renderdate.calendar(props.created_at, ["d", "m", "y"])}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ModalWorkspaceInfo;
