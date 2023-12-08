"use client";
import s from "./TaskPage.module.css";
import React from "react";
import InputLarge from "@/components/input-large/InputLarge";
import Navbar from "@/components/navbar/Navbar";
import { TaskType } from "@/type";
import RoundButton from "@/components/round-button/RoundButton";
import SquareButton from "@/components/square-button/SquareButton";
import UsernameButton from "@/components/username-button/UsernameButton";
import ButtonLarge, {
  ButtonLargeProps,
} from "@/components/button-large/ButtonLarge";
import BasicMenu from "@/components/basic-menu/BasicMenu";
import { ActivityLogType } from "@/type";

const TaskPage: React.FC = () => {
  const [data, setData] = React.useState<TaskType>({
    activity_list: [],
    assigned_member: ["aleck", "tuslam"],
    category: "",
    comments_count: 0,
    comments_id: "comments-1",
    created_at: "",
    deadline: "",
    description: "",
    priority: "LOW",
    seen_by: [],
    status: "NEXT-UP",
    t_id: "",
    title: "",
    w_id: "",
  });

  const date_raw = Date.now();

  const date_form = new Date(date_raw);

  const date = new Date(date_form);

  const date_only = date.toString().split(" ");

  const render_date = `${date_only[1]} ${date_only[2]} ${date_only[3]}`;

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const menu_list: ButtonLargeProps[] = [
    {
      bg_color: "",
      color: "",
      text: "Show in Calendar",
      icon: "/icons/calendar.svg",
    },
  ];

  const log_list: ActivityLogType[] = [
    {
      a_id: "",
      activity_desc: "maulana open this task",
      created_at: "2023-2-2",
      t_id: "",
      u_id: "",
      w_id: "",
    },
    {
      a_id: "",
      activity_desc: "tuslam open this task",
      created_at: "2023-2-2",
      t_id: "",
      u_id: "",
      w_id: "",
    },
  ];

  const [prioritySelect, setPrioritySelect] = React.useState<number>(0);
  const [statusSelect, setStatusSelect] = React.useState<number>(0);

  const [isMenuActive, setIsMenuActive] = React.useState<boolean>(true);

  return (
    <>
      <Navbar title="Design PPT" subtitle="Workspace 1" />
      <BasicMenu
        button_list={menu_list}
        log_list={log_list}
        isActive={isMenuActive}
        title="Task Menu"
        delete_text="Delete Task"
      />
      <main className={s.main}>
        <section className={s.task}>
          <div className={s.desc}>
            <InputLarge
              onChange={changeHandler}
              label="Deskripsi Task"
              name="description"
              placeholder="📋 Deskripsi"
              value={data.description}
            />
          </div>
          <div className={s.deadline}>
            <p className={[s.label, "medium", "md"].join(" ")}>Deadline</p>
            <div className={s.content}>
              <RoundButton
                color="rgba(0, 0, 0, 0.08)"
                icon="/icons/calendar.svg"
                opacity={1}
              />
              <span className={[s.date, "sm", "medium"].join(" ")}>
                {render_date}
              </span>
            </div>
          </div>
          <div className={s.priority}>
            <p className={[s.label, "medium", "md"].join(" ")}>Priority</p>
            <div className={s.content}>
              <ul className={s.list}>
                <li className={s.item}>
                  <SquareButton
                    bg_color={
                      prioritySelect == 0 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                    }
                    color={prioritySelect == 0 ? "#fff" : "#1C062D"}
                    opacity={1}
                    text="Low"
                    onClick={() => {
                      setPrioritySelect(0);
                    }}
                    key={"low-priority-btn"}
                  />
                </li>
                <li className={s.item}>
                  <SquareButton
                    bg_color={
                      prioritySelect == 1 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                    }
                    color={prioritySelect == 1 ? "#fff" : "#1C062D"}
                    opacity={1}
                    text="Med"
                    key={"med-priority-btn"}
                    onClick={() => {
                      setPrioritySelect(1);
                    }}
                  />
                </li>
                <li className={s.item}>
                  <SquareButton
                    bg_color={
                      prioritySelect == 2 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                    }
                    color={prioritySelect == 2 ? "#fff" : "#1C062D"}
                    opacity={1}
                    text="High"
                    onClick={() => {
                      setPrioritySelect(2);
                    }}
                    key={"high-priority-btn"}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className={s.participants}>
            <p className={[s.label, "medium", "md"].join(" ")}>Participants</p>
            <div className={s.content}>
              <SquareButton
                bg_color="rgba(0, 0, 0, 0.08)"
                color="#1C062D"
                opacity={0.5}
                text=""
                icon="/icons/plus.svg"
                key={"plus-btn"}
              />
              <ul className={s.list}>
                {data.assigned_member.map((member, index) => {
                  return (
                    <li
                      className={s.item}
                      key={`assigned-member-${index}`}
                      style={{ marginLeft: index > 0 ? "12px" : "0px" }}
                    >
                      <UsernameButton username={member} withDelete />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={s.status}>
            <p className={[s.label, "medium", "md"].join(" ")}>Status</p>
            <div className={s.content}>
              <ul className={s.list}>
                <li className={s.item}>
                  <SquareButton
                    bg_color={
                      statusSelect == 0 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                    }
                    color={statusSelect == 0 ? "#fff" : "#1C062D"}
                    opacity={1}
                    text="Next up"
                    onClick={() => {
                      setStatusSelect(0);
                    }}
                    key={"next-up-status-btn"}
                  />
                </li>
                <li className={s.item}>
                  <SquareButton
                    bg_color={
                      statusSelect == 1 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                    }
                    color={statusSelect == 1 ? "#fff" : "#1C062D"}
                    opacity={1}
                    text="In progress"
                    onClick={() => {
                      setStatusSelect(1);
                    }}
                    key={"in-progress-status-btn"}
                  />
                </li>
                <li className={s.item}>
                  <SquareButton
                    bg_color={
                      statusSelect == 2 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                    }
                    color={statusSelect == 2 ? "#fff" : "#1C062D"}
                    opacity={1}
                    text="Revised"
                    onClick={() => {
                      setStatusSelect(2);
                    }}
                    key={"revised-status-btn"}
                  />
                </li>
                <li className={s.item}>
                  <SquareButton
                    bg_color={
                      statusSelect == 3 ? "#1C062D" : "rgba(0, 0, 0, 0.08)"
                    }
                    color={statusSelect == 3 ? "#fff" : "#1C062D"}
                    opacity={1}
                    text="Completed"
                    onClick={() => {
                      setStatusSelect(3);
                    }}
                    key={"completed-status-btn"}
                  />
                </li>
              </ul>
            </div>
          </div>
          <ButtonLarge
            bg_color="080726"
            color="#fff"
            text="Comments"
            icon="/icons/comment_white.svg"
            key={"comment-btn"}
          />
        </section>
      </main>
    </>
  );
};

export default TaskPage;
