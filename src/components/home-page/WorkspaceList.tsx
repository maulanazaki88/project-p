import s from "./WorkspaceList.module.css";
import { WorkspaceType } from "@/type";
import router from "next/router";
import React from "react";
import WorkspaceCard from "../workspace-card/WorkspaceCard";
import WorkspaceCardPlaceHolder from "../workspace-card/WorkspaceCardPlaceHolder";
import { usePathname } from "next/navigation";
import WorkspaceCardSkeleton from "../workspace-card/WorkspaceCardSkeleton";

interface WorkspaceListProps {
  workspace_list: WorkspaceType[];
  searchInput: string;
}

const color_list = ["#BAE0EE", "#E2D3FE", "rgba(28, 6, 45, 0.2)"];

const WorkspaceList: React.FC<WorkspaceListProps> = (props) => {
  const [hide_workspace_list_scroll, setHideWorkspaceListScroll] =
    React.useState<boolean>(true);

  const pathname = usePathname();

  const ExpectedViews = (
    <div
      className={[
        s.list_screen,
        hide_workspace_list_scroll && s.hide_scroll,
      ].join(" ")}
      onMouseLeave={() => {
        setHideWorkspaceListScroll(true);
      }}
      onMouseOver={() => {
        setHideWorkspaceListScroll(false);
      }}
      onTouchMove={() => {
        setHideWorkspaceListScroll(false);
      }}
      onTouchEnd={() => {
        setHideWorkspaceListScroll(true);
      }}
    >
      <ul className={s.list}>
        {props.workspace_list
          .filter(
            (workspace) =>
              workspace.name.toLowerCase().includes(props.searchInput) ||
              workspace.description.toLowerCase().includes(props.searchInput)
          )
          .map((workspace, index) => {
            return (
              <li
                className={s.item}
                key={`workspace-item-${index}`}
                // style={{ marginLeft: index > 0 ? "16px" : "0px" }}
              >
                <WorkspaceCard
                  description={workspace.description}
                  img={"/ilust/team_1.svg"}
                  members={workspace.member_list}
                  name={workspace.name}
                  key={`workspace-${index}`}
                  bg_color={
                    color_list[(index + color_list.length) % color_list.length]
                  }
                  id={workspace.w_id}
                />
              </li>
            );
          })}
        {props.workspace_list.length <= 3 && (
          <li className={s.item} key={`workspace-item-placeholder`}>
            <WorkspaceCardPlaceHolder />
          </li>
        )}
        <div className={s.white_blur}></div>
      </ul>
    </div>
  );

  const NoListViews = <WorkspaceCardPlaceHolder />;

  if (props.workspace_list.length > 0) {
    return ExpectedViews;
  } else {
    return NoListViews;
  }
};

export default WorkspaceList;
