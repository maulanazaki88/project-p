import s from "./Comments.module.css";
import React from "react";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import ChatBubble, { ChatBubbleProps } from "../chat-bubble/ChatBubble";
import Context from "@/context/Store";
import RoundButton from "../round-button/RoundButton";
import { useDateNow } from "@/hook/useDateNow";

interface CommentsProps {
  task_name: string;
  workspace_name: string | undefined;
  chat_list: ChatBubbleProps[];
  closeHandler: () => void;
  sendComment: (data: {
    message: string;
    username: string;
    time: string;
  }) => void;
  isActive: boolean;
  isEmbed?: boolean;
}

const Comments: React.FC<CommentsProps> = (props) => {
  const ctx = React.useContext(Context);
  const date_now = useDateNow();

  const screenRef = React.useRef<HTMLDivElement>(null);

  const user_data = ctx?.user_data_ctx;

  const [comment_val, set_comment_val] = React.useState<string>("");

  React.useEffect(() => {
    const screen = screenRef.current;

    if (screen) {
      screen.scrollTop = screen.scrollHeight * 3;
    }
  }, []);

  const setScrollToBottom = () => {
    const screen = screenRef.current;
    if (screen) {
      screen.scrollTop = screen.scrollHeight * 3;
      console.log("to bottom")
      set_comment_val("")
    }
  };

  return (
    <div
      className={[s.comments, props.isEmbed && s.embed].join(" ")}
      style={{
        translate: props.isActive ? "0 0" : "100% 0",
      }}
    >
      {!props.isEmbed && (
        <MenuNavbar closeHandler={props.closeHandler} title={props.task_name} />
      )}
      <div className={s.comment_screen} ref={screenRef}>
        <ul className={s.list}>
          {props.chat_list.map((chat, index) => {
            return (
              <li
                className={s.item}
                style={{
                  justifyContent:
                    chat.username === user_data?.username
                      ? "flex-end"
                      : "flex-start",
                }}
                key={`chat-item-${index}`}
              >
                <ChatBubble {...chat} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className={s.fields}>
        <input
          type="text"
          className={s.comment_inp}
          value={comment_val}
          onChange={(e) => {
            set_comment_val(e.target.value);
          }}
          placeholder={"Ketik komentar"}
        />
        <RoundButton
          color="#79C89F"
          icon="/icons/plane_white.svg"
          opacity={1}
          onClick={() => {
            setScrollToBottom();
            props.sendComment({
              message: comment_val,
              username: user_data?.username ? user_data.username : "-",
              time: date_now.withTime(),
            });
            
          }}
          scale={1}
        />
      </div>
    </div>
  );
};

export default Comments;
