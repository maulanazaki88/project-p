import { ChatBubbleProps } from "../chat-bubble/ChatBubble";
import s from "./CommentsList.module.css";
import React from "react";
import Context, {ContextType} from "@/context/Store";
import ChatBubble from "../chat-bubble/ChatBubble";

interface CommentsScreenProps {
  chat_list: ChatBubbleProps[]
}

const CommentsList: React.FC<CommentsScreenProps> = (props) => {
  const [hide_scroll, setHideScroll] = React.useState<boolean>(true);

  const screenRef = React.useRef<HTMLDivElement>(null);

  const {user_data_ctx} = React.useContext(Context) as ContextType;

  React.useEffect(() => {
    const screen = screenRef.current;

    if (screen) {
      screen.scrollTop = screen.scrollHeight * 3;
    }
  }, [props]);

  return (
    <div
      onMouseOver={() => setHideScroll(false)}
      onMouseLeave={() => setHideScroll(true)}
      onScroll={() => setHideScroll(false)}
      onTouchMove={() => setHideScroll(false)}
      onTouchEnd={() => setHideScroll(true)}
      className={[s.comment_screen, hide_scroll && s.hide_scroll].join(" ")}
      ref={screenRef}
    >
       <ul className={s.list}>
          {props.chat_list.map((chat, index) => {
            return (
              <li
                className={s.item}
                style={{
                  justifyContent:
                    chat.username === user_data_ctx?.username
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
  );
};

export default CommentsList;

export const MemoizedCommentsList = React.memo(CommentsList)