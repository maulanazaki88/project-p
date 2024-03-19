import s from "./TaskCard.module.css";
import React from "react";
import { TaskPriorityType } from "@/type";
import Image from "next/image";
import Avatar from "../avatar/Avatar";
import { useRenderDate } from "@/hook/useRenderDate";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Context from "@/context/Store";

interface TaskCardProps {
  name: string;
  w_id: string;
  assigned_member: { u_id: string; username: string }[];
  priority: TaskPriorityType;
  description: string;
  deadline: Date;
  comments_count: number;
  id: string;
}

const color_list = ["#F99370", "#F4D4BE", "#A523A2"];

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const ctx = React.useContext(Context);
  const calendar = useRenderDate();

  const user_workspaces = ctx?.user_workspaces_ctx;

  const workspace_name =
    user_workspaces &&
    user_workspaces.find((workspace) => workspace.w_id === props.w_id)?.name;

  const router = useRouter();
  const pathname = usePathname();

  const goToTask = (id: string) => {
    if (pathname.includes("workspace")) {
      router.push(`${pathname}/task/${id}`);
    } else {
      router.push(`${pathname}/workspace/${props.w_id}/task/${id}`);
    }
  };

  // menjaga agar deskripsi tidak offset dari kartu
  const description_render = (desc: string) => {
    if(desc.length > 38){
      return `${desc.slice(0, 38)}...`
    } else {
      return desc
    }
  }

  return (
    <div
      className={s.card}
      onClick={() => {
        goToTask(props.id);
      }}
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
          {description_render(props.description)}
        </p>
      </div>
      <div className={s.bottom}>
        <ul className={s.assigned_member}>
          {props.assigned_member.slice(0, 6).map((member, index) => {
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
};

export default TaskCard;
