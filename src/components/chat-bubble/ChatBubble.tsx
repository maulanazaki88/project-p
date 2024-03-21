import s from "./ChatBubble.module.css";
import React from "react";
import Context from "@/context/Store";
import { formatSentTime } from "@/utils/SentTimeFormater";

export interface ChatBubbleProps {
  color?: string;
  username: string;
  message: string;
  time: Date;
}

const ChatBubble: React.FC<ChatBubbleProps> = (props) => {
  const ctx = React.useContext(Context);

  const user_data = ctx?.user_data_ctx;

  return (
    <div className={s.bubble}>
      <div className={s.username_box}>
        <span className={[s.username, "medium", "sm"].join(" ")}>
          {props.username === user_data?.username ? "Anda" : props.username}
        </span>
      </div>
      <p className={[s.message, "sm", "medium"].join(" ")}>{props.message}</p>
      <div
        className={s.stamp}
        style={{
          justifyContent:
            props.username === user_data?.username ? "flex-start" : "flex-end",
        }}
      >
        <span className={[s.time, "sm", "medium", "soft"].join(" ")}>
          {formatSentTime(props.time)}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
