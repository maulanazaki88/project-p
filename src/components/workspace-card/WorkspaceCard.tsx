import Image from "next/image";
import s from "./Workspace.module.css";
import React from "react";
import Avatar from "../avatar/Avatar";
import ButtonMedium from "../button-medium/ButtonMedium";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface WorkspaceCardProps {
  name: string;
  description: string;
  img: string;
  members: { u_id: string; username: string }[];
  bg_color: string;
  id: string;
}

export const color_list = ["#F99370", "#F4D4BE", "#A523A2"];

const WorkspaceCard: React.FC<WorkspaceCardProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();

  const goToWorkspace = (id: string) => {

    router.push(`${pathname}/workspace/${encodeURIComponent(id)}`);

  };

  return (
    <div className={s.card} style={{ backgroundColor: props.bg_color }}>
      <figure className={s.figure}>
        <Image
          src={"/ilustration/team_1.svg"}
          width={98}
          height={60}
          alt={props.name}
          className={s.ilust}
        />
      </figure>
      <div className={s.top}>
        <div className={s.headers}>
          <h5 className={s.name}>{props.name}</h5>
          <span className={[s.desc, "sm", "medium", "soft"].join(" ")}>
            {props.description}
          </span>
        </div>
        <ul className={s.assigned_list}>
          {props.members.map((member, index) => {
            return (
              <li
                className={s.assigned_item}
                key={`assigned-${index}`}
                style={{ translate: `0px -${index * 15}px` }}
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
      </div>
      <div className={s.bottom}>
        <ButtonMedium
          color="#1C062D"
          text="Buka Space"
          accent_color="rgba(255, 255, 255, 0.15)"
          icon={"/icons/arrow_white.svg"}
          onClick={() => {
            goToWorkspace(props.id);
          }}
        />
      </div>
    </div>
  );
};

export default WorkspaceCard;
