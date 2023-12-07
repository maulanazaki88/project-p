"use client";
import s from "./OnlineBar.module.css";
import React from "react";

import Avatar from "../avatar/Avatar";
import { color_list } from "../workspace-card/WorkspaceCard";

interface OnlineBarProps {
  users: string[];
}

const OnlineBar: React.FC<OnlineBarProps> = (props) => {
  return (
    <div className={s.bar}>
      <ul className={s.list}>
        {props.users.map((user, index) => {
          return (
            <li
              className={s.item}
              key={`online-${index}`}
              style={{ marginLeft: index > 0 ? "14px" : "0px" }}
            >
              <Avatar
                bg_color={
                  color_list[(index + color_list.length) % color_list.length]
                }
                txt_color="#fff"
                username={user}
                isOnline
                withBorder
              />
              <span className={[s.username, "reguler", "sm"].join(" ")} >{user}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OnlineBar;
