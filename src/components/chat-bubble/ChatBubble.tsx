import s from "./ChatBubble.module.css";
import React from "react";
import Context, { ContextType } from "@/context/Store";
import { formatSentTime } from "@/utils/SentTimeFormater";

export interface ChatBubbleProps {
  color?: string;
  username: string;
  message: string;
  time: Date;
}

const ChatBubble: React.FC<ChatBubbleProps> = (props) => {
  const { user_data_ctx, theme_ctx } = React.useContext(Context) as ContextType;

  const is_dark = theme_ctx === "dark";

  return (
    <div className={[s.bubble, is_dark && s.dark].join(" ")}>
      <div className={s.username_box}>
        <span className={[s.username, "medium", "sm"].join(" ")}>
          {props.username === user_data_ctx?.username ? "You" : props.username}
        </span>
      </div>
      <p className={[s.message, "sm", "medium"].join(" ")}>{props.message}</p>
      <div
        className={s.stamp}
        style={{
          justifyContent:
            props.username === user_data_ctx?.username
              ? "flex-start"
              : "flex-end",
        }}
      >
        <span className={[s.time].join(" ")}>{formatSentTime(props.time)}</span>
      </div>
    </div>
  );
};

export default ChatBubble;
