"use client";
import s from "./ParticipantList.module.css";
import React from "react";
import Context, { ContextType } from "@/context/Store";
import { usePathname } from "next/navigation";

interface ParticipantListProps {
  assigned_member: { u_id: string; username: string }[];
  t_id: string;
}

const ParticipantList: React.FC<ParticipantListProps> = (props) => {
  const { task_change_participants_ctx } = React.useContext(
    Context
  ) as ContextType;

  const [hide_scroll, setHideScroll] = React.useState<boolean>(true);

  const pathname = usePathname();

  const u_id = pathname.split("/")[2];
  const w_id = pathname.split("/")[4];

  const color_list = ["#F99370", "#F4D4BE", "#A523A2"];

  return (
    <ul
      className={[s.list, hide_scroll && s.hide_scroll].join(" ")}
      onMouseOver={() => {
        setHideScroll(false);
      }}
      onMouseLeave={() => {
        setHideScroll(true);
      }}
    >
      {props.assigned_member.map((member, index) => {
        return (
          <li
            className={s.item}
            key={`assigned-member-${index}`}
            style={{ marginLeft: index > 0 ? "12px" : "0px" }}
          >
            <div title={member.username} className={[s.participant, "sm", "regular"].join(" ")} style={{backgroundColor: color_list[index % 3]}}>
              {member.username.slice(0, 2).toLocaleUpperCase()}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ParticipantList;
