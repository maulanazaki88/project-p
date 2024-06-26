import s from "./TaskCard.module.css";
import React from "react";
import { TaskPriorityType } from "@/type";
import Image from "next/image";
import Avatar from "../avatar/Avatar";
import { useRenderDate } from "@/hook/useRenderDate";
import { usePathname } from "next/navigation";
import Context, { ContextType } from "@/context/Store";
import TaskCardSkeleton from "./TaskCardSkeleton";
import Link from "next/link";

export interface TaskCardProps {
  name: string;
  w_id: string;
  assigned_member: { u_id: string; username: string }[];
  priority: TaskPriorityType;
  description: string;
  deadline: Date;
  comments_count: number;
  id: string;
  isShadow?: boolean;
  isAppear?: boolean;
}

const color_list = ["#F99370", "#F4D4BE", "#A523A2"];

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const { user_workspaces_ctx, theme_ctx } = React.useContext(
    Context
  ) as ContextType;

  const calendar = useRenderDate();

  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const card = cardRef.current;
    if (props.name == "Untitled" && card) {
      card.scrollIntoView({ block: "end" });
    }
  }, []);

  const workspace_name =
    user_workspaces_ctx &&
    user_workspaces_ctx.find((workspace) => workspace.w_id === props.w_id)
      ?.name;
  const pathname = usePathname();

  // menjaga agar deskripsi tidak offset dari kartu

  const is_dark = theme_ctx === "dark";

  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {};

  const CardView = (
    <div
      draggable
      onDragStart={() => {
        console.log("drag start");
      }}
      onDrag={() => {
        console.log("Card dragged");
      }}
      className={[s.card, is_dark && s.dark].join(" ")}
      onClick={() => {}}
      ref={cardRef}
      onMouseOver={(e) => {}}
      style={
        props.isShadow
          ? {
              height: props.isAppear ? "calc(230/360 * 280px)" : 0,
            }
          : {}
      }
    >
      <div className={s.top}>
        <div className={[s.workspaceName, "bold", "sm", "soft"].join(" ")}>
          {workspace_name}
        </div>
        <div
          className={s.priority}
          style={{
            backgroundColor:
              props.priority === "HIGH"
                ? "red"
                : props.priority === "MED"
                ? "#faa300"
                : "green",
          }}
        >
          <span className={[s.text, "medium", "sm"].join(" ")}>
            {props.priority}
          </span>
        </div>
      </div>
      <div className={s.content}>
        <h4 className={[s.title, "bold", "sm"].join(" ")}>{props.name}</h4>
        <p className={[s.desc, "sm", "medium"].join(" ")}>
          {props.description}
        </p>
      </div>
      <div className={s.bottom}>
        <ul className={s.assigned_member}>
          {props.assigned_member.slice(0, 3).map((member, index) => {
            return (
              <li
                key={`member-${index}`}
                className={s.member}
                style={{ translate: `${index * -15}px 0px` }}
              >
                <Avatar
                  bg_color={
                    color_list[(index + color_list.length) % color_list.length]
                  }
                  txt_color="#fff"
                  username={member.username}
                  withBorder
                />
              </li>
            );
          })}
          {props.assigned_member.length > 3 && (
            <div className={s.offset_num}>
              +{props.assigned_member.length - 3}
            </div>
          )}
        </ul>
        <div className={s.info}>
          <div className={[s.subInfo, is_dark && s.dark].join(" ")}>
            <Image
              src={!is_dark ? "/icons/comment.svg" : "/icons/comment_white.svg"}
              alt="comment"
              width={16}
              height={16}
              className={s.icon}
            />
            <span className={[s.text, "medium", "sm", "blend"].join(" ")}>
              {props.comments_count}
            </span>
          </div>
          <div className={[s.subInfo, is_dark && s.dark].join(" ")}>
            <Image
              src={
                !is_dark ? "/icons/calendar.svg" : "/icons/calendar_white.svg"
              }
              alt="calendar"
              width={16}
              height={16}
              className={s.icon}
            />
            <span className={[s.text, "medium", "sm", "blend"].join(" ")}>
              {calendar.calendar(new Date(props.deadline), ["d", "m"])}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const ShadowCardView = (
    <div
      draggable
      onDragStart={() => {
        console.log("drag start");
      }}
      onDrag={() => {
        console.log("Card dragged");
      }}
      className={s.card}
      onClick={() => {}}
      ref={cardRef}
      onMouseOver={(e) => {}}
    >
      <div className={s.top}>
        <div className={[s.workspaceName, "bold", "sm", "soft"].join(" ")}>
          {workspace_name}
        </div>
        <div
          className={s.priority}
          style={{
            backgroundColor:
              props.priority === "HIGH"
                ? "red"
                : props.priority === "MED"
                ? "rgb(245, 221, 97)"
                : "green",
          }}
        >
          <span className={[s.text, "medium", "sm"].join(" ")}>
            {props.priority}
          </span>
        </div>
      </div>
      <div className={s.content}>
        <h4 className={[s.title, "bold", "sm"].join(" ")}>{props.name}</h4>
        <p className={[s.desc, "sm", "medium"].join(" ")}>
          {props.description}
        </p>
      </div>
      <div className={s.bottom}>
        <ul className={s.assigned_member}>
          {props.assigned_member.slice(0, 2).map((member, index) => {
            return (
              <li
                key={`member-${index}`}
                className={s.member}
                style={{ translate: `${index * -15}px 0px` }}
              >
                <Avatar
                  bg_color={
                    color_list[(index + color_list.length) % color_list.length]
                  }
                  txt_color="#fff"
                  username={member.username}
                  withBorder
                />
              </li>
            );
          })}
          {props.assigned_member.length > 2 && (
            <div className={s.offset_num}>
              +{props.assigned_member.length - 2}
            </div>
          )}
        </ul>
        <div className={s.info}>
          <div className={s.subInfo}>
            <Image
              src={"/icons/comment.svg"}
              alt="comment"
              width={16}
              height={16}
              className={s.icon}
            />
            <span className={[s.text, "medium", "sm", "blend"].join(" ")}>
              {props.comments_count}
            </span>
          </div>
          <div className={s.subInfo}>
            <Image
              src={"/icons/calendar.svg"}
              alt="calendar"
              width={16}
              height={16}
              className={s.icon}
            />
            <span className={[s.text, "medium", "sm", "blend"].join(" ")}>
              {calendar.calendar(new Date(props.deadline), ["d", "m"])}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Link
      className={s.card_link}
      href={
        pathname.includes("workspace")
          ? `${pathname}/task/${props.id}`
          : `${pathname}/workspace/${props.w_id}/task/${props.id}`
      }
    >
      {CardView}
    </Link>
  );
};

export default TaskCard;
