import s from "./WorkspaceList.module.css";
import { WorkspaceType } from "@/type";
import React from "react";
import WorkspaceCard from "../workspace-card/WorkspaceCard";
import WorkspaceCardPlaceHolder from "../workspace-card/WorkspaceCardPlaceHolder";
import { usePathname } from "next/navigation";

interface WorkspaceListProps {
  workspace_list: WorkspaceType[];
  searchInput: string;
}

const color_list = [
  "#BAE0EE",
  "#E2D3FE",
  "#F9F5E7",
  "#E3FEF7",
  "#FEC7B4",
  "#FFE6E6",
  "#A5DD9B",
];

const ilust_list = [
  "/ilustration/workspace_1.svg",
  "/ilustration/workspace_2.svg",
  "/ilustration/workspace_3.svg",
  "/ilustration/workspace_4.svg",
  "/ilustration/workspace_5.svg",
  "/ilustration/workspace_6.svg",
  "/ilustration/workspace_7.svg",
];

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
                  img={ilust_list[index % ilust_list.length]}
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
