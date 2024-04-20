import s from "./Comments.module.css";
import React from "react";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import { ChatBubbleProps } from "../chat-bubble/ChatBubble";
import Context, { ContextType } from "@/context/Store";
import RoundButton from "../round-button/RoundButton";
import { useDateNow } from "@/hook/useDateNow";
import { MemoizedCommentsList } from "./CommentsList";

interface CommentsProps {
  task_name: string;
  workspace_name: string | undefined;
  chat_list: ChatBubbleProps[];
  closeHandler: () => void;
  sendComment: (data: {
    message: string;
    username: string;
    time: Date;
  }) => void;
  isActive: boolean;
  isEmbed?: boolean;
}

const Comments: React.FC<CommentsProps> = (props) => {
  const { user_data_ctx, task_add_comment_ctx, theme_ctx } = React.useContext(
    Context
  ) as ContextType;

  const is_dark = theme_ctx === "dark";

  const screenRef = React.useRef<HTMLDivElement>(null);

  const [comment_val, set_comment_val] = React.useState<string>("");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const screen = screenRef.current;

    if (screen) {
      screen.scrollTop = screen.scrollHeight * 3;
    }
  }, [props.chat_list]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    set_comment_val("");

    props.sendComment({
      message: comment_val,
      username: user_data_ctx?.username ? user_data_ctx.username : "-",
      time: new Date(),
    });
  };

  return (
    <div
      className={[s.comments, props.isEmbed && s.embed, is_dark && s.dark].join(
        " "
      )}
      style={{
        translate: props.isActive ? "0 0" : "100% 0",
      }}
    >
      {!props.isEmbed && (
        <MenuNavbar closeHandler={props.closeHandler} title={props.task_name} />
      )}
      <div className={s.headers}>
        <h3 className={[s.title, "md", "medium"].join(" ")}>Comments</h3>
        <span className={[s.comment_count, "sm", "soft"].join(" ")}>
          {props.chat_list.length}
        </span>
      </div>
      <MemoizedCommentsList chat_list={props.chat_list} />

      <form
        className={[s.fields, is_dark && s.dark].join(" ")}
        onSubmit={submitHandler}
      >
        <input
          type="text"
          className={[s.comment_inp, is_dark && s.dark].join(" ")}
          value={comment_val}
          onChange={(e) => {
            set_comment_val(e.target.value);
          }}
          placeholder={"Type here"}
        />
        <RoundButton
          color={is_dark ? "#535c91" : "#1C062D"}
          icon="/icons/plane_white.svg"
          opacity={0.7}
          onClick={() => {}}
          icon_scale={0.7}
          type="submit"
        />
      </form>
    </div>
  );
};

export default Comments;
