"use client";
import s from "./Home.module.css";
import React from "react";
import HomeNavbar from "@/components/home-navbar/HomeNavbar";
import Context, { ContextType } from "@/context/Store";
import InputSmall from "@/components/input-small/InputSmall";
import SquareButton from "@/components/square-button/SquareButton";
import WorkspaceCard from "@/components/workspace-card/WorkspaceCard";
import TaskCard from "@/components/task-card/TaskCard";

const Home: React.FC = () => {
  const ctx = React.useContext(Context) as ContextType;

  const user_data = ctx.user_data_ctx;
  const user_workspaces = ctx.user_workspaces_ctx;
  const user_task = ctx.user_task_ctx;

  const [searchInput, setSearchInput] = React.useState<string>("");

  const color_list = ["#BAE0EE", "#E2D3FE", "rgba(28, 6, 45, 0.2)"];

  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  if (user_data) {
    return (
      <>
        <HomeNavbar username="maulana" />
        <main className={s.main}>
          <h2 className={[s.header, "big", "medium"].join(" ")}>
            Selamat datang, {user_data.username}!
          </h2>
          <div className={s.dashboard}>
            <InputSmall
              icon="/icons/search.svg"
              label=""
              name="search"
              onChange={searchInputChange}
              placeholder="Cari workspace, tugas"
              type="text"
              value={searchInput}
              warning=""
            />
            <div className={s.workspace}>
              <div className={s.heading}>
                <div className={s.header}>
                  <h3 className={[s.title, "md", "medium"].join(" ")}>
                    Workspace
                  </h3>
                  <p className={[s.subtitle, "sm", "medium", "soft"].join(" ")}>
                    You have {user_workspaces ? user_workspaces.length : 0}{" "}
                    workspace
                  </p>
                </div>
                <div className={s.action}>
                  <SquareButton
                    bg_color="#1C062D"
                    color="#fff"
                    opacity={1}
                    text="Add +"
                  />
                </div>
              </div>
              {user_workspaces && (
                <div className={s.list_screen}>
                  <ul className={s.list}>
                    {user_workspaces.map((workspace, index) => {
                      return (
                        <li
                          className={s.item}
                          key={`workspace-item-${index}`}
                          style={{ marginLeft: index > 0 ? "16px" : "0px" }}
                        >
                          <WorkspaceCard
                            description={workspace.description}
                            img={"/ilust/team_1.svg"}
                            members={workspace.member_list}
                            name={workspace.name}
                            key={`workspace-${index}`}
                            bg_color={
                              color_list[
                                (index + color_list.length) % color_list.length
                              ]
                            }
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div className={s.todo}>
              <div className={s.heading}>
                <div className={s.header}>
                  <h3 className={[s.title, "md", "medium"].join(" ")}>
                    Task To Do
                  </h3>
                  <p className={[s.subtitle, "sm", "medium", "soft"].join(" ")}>
                    List task to do today {":)"}
                  </p>
                </div>
              </div>
              <ul className={s.task_list}>
                {user_task?.map((task, index) => {
                  return (
                    <li className={s.item} key={`user-task-${index}`}>
                      <TaskCard
                        assigned_member={task.assigned_member}
                        comments_count={task.comments_count}
                        deadline={task.deadline}
                        description={task.description}
                        name={task.title}
                        priority={task.priority}
                        w_id={task.w_id}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return null;
  }
};

Home.displayName = "Home";
export default Home;
