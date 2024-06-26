import Image from "next/image";
import s from "./WorkspaceCard.module.css";
import React from "react";
import Avatar from "../avatar/Avatar";
import ButtonMedium from "../button-medium/ButtonMedium";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import WorkspaceCardSkeleton from "./WorkspaceCardSkeleton";
import Link from "next/link";

interface WorkspaceCardProps {
  name: string;
  description: string;
  img: string;
  members: { u_id: string; username: string }[];
  bg_color: string;
  id: string;
  isEmpty?: boolean;
}

export const color_list = ["#F99370", "#F4D4BE", "#A523A2"];

const WorkspaceCard: React.FC<WorkspaceCardProps> = (props) => {
  // console.log("Workspace card props: ", props)

  const router = useRouter();
  const pathname = usePathname();

  const goToWorkspace = (id: string) => {
    router.push(`${pathname}/workspace/${encodeURIComponent(id)}`);
  };

  const goToWorkspaceSetup = () => {
    router.push(`${pathname}/workspace-setup`);
  };

  const render_desc = (desc: string) => {
    if (desc.length > 45) {
      return `${desc.slice(0, 44)}...`;
    } else {
      return desc;
    }
  };

  if (props.name === "~") {
    <WorkspaceCardSkeleton />;
  } else {
    return (
      <Link
        prefetch={true}
        href={`${pathname}/workspace/${encodeURIComponent(props.id)}`}
      >
        <div
          className={s.card}
          style={{ backgroundColor: props.bg_color }}
          onClick={() => {
            if (props.isEmpty) {
              goToWorkspaceSetup();
            } else {
              goToWorkspace(props.id);
            }
          }}
        >
          {!props.isEmpty ? (
            <figure className={s.figure}>
              <Image
                src={props.img}
                width={98}
                height={60}
                alt={props.name}
                className={s.ilust}
              />
            </figure>
          ) : (
            <figure className={s.figure}>
              <Image
                src={"/icons/plus.svg"}
                width={20}
                height={20}
                style={{ opacity: 0.1 }}
                alt={props.name}
                className={s.ilust}
              />
            </figure>
          )}
          <div className={s.top}>
            <div className={s.headers}>
              <h5 className={s.name}>{props.name}</h5>
              <span className={[s.desc, "sm", "medium", "soft"].join(" ")}>
                {render_desc(props.description)}
              </span>
            </div>
            <ul className={s.assigned_list}>
              {props.members.slice(0, 3).map((member, index) => {
                return (
                  <li
                    className={s.assigned_item}
                    key={`assigned-${index}`}
                    style={{ top: `-${index * 15}px` }}
                  >
                    <Avatar
                      bg_color={
                        color_list[
                          (index + color_list.length) % color_list.length
                        ]
                      }
                      txt_color="#fff"
                      username={member.username}
                      withBorder
                    />
                  </li>
                );
              })}
              {props.members.length > 3 && (
                <div className={s.offset_num}>+{props.members.length - 3}</div>
              )}
            </ul>
          </div>
          {!props.isEmpty && (
            <div className={s.bottom}>
              <ButtonMedium
                color={"#1C062D"}
                text="Open Space"
                accent_color="rgba(255, 255, 255, 0.15)"
                icon={"/icons/arrow_white.svg"}
                onClick={() => {}}
              />
            </div>
          )}
        </div>
      </Link>
    );
  }
};

export default WorkspaceCard;
