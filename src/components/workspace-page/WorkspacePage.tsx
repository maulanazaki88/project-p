"use client";
import s from "./Workspace.module.css";
import React from "react";
import Context, { ContextType } from "@/context/Store";
import { ProgressStatusType, TaskType, WorkspaceType } from "@/type";
import { useRouter } from "next/navigation";
import { useDateNow } from "@/hook/useDateNow";
import { usePathname } from "next/navigation";
import { useIdGenerator } from "@/hook/useIdGenerator";
import TaskStageSection from "../task-stage-section/TaskStageSection";
import WorkspaceControl from "./WorkspaceControl";
import ModalWorkspaceInfo from "../modal-workspace-info/ModalWorkspaceInfo";
import Backdrop from "../layout/Backdrop";
import Indicator from "./Indicator";

interface WorkspacePageProps {
  data: WorkspaceType;
}

const WorkspacePage: React.FC<WorkspacePageProps> = (props) => {
  const { task_create_ctx, theme_ctx } = React.useContext(
    Context
  ) as ContextType;

  const is_dark = theme_ctx === "dark";

  const router = useRouter();
  const pathname = usePathname();
  const id_generator = useIdGenerator();
  const date_now = useDateNow();

  const u_id = pathname.split("/")[2];
  const w_id = pathname.split("/")[4];

  const screenRef = React.useRef<HTMLDivElement>(null);

  const [display_width, setDisplayWidth] = React.useState<number | null>(null);
  const [stage, setStage] = React.useState<number>(0);

  React.useEffect(() => {
    function getDisplayWidth() {
      const width = window.innerWidth;
      setDisplayWidth(width);
    }

    getDisplayWidth();
    window.addEventListener("resize", getDisplayWidth);
  }, []);

  React.useEffect(() => {
    const screen = screenRef.current;
    if (screen && display_width && display_width < 640) {
      const indicatorInterval = setInterval(() => {
        const mid = screen.scrollLeft + display_width/2;
        if (mid < display_width) {
          setStage(0);
        } else if (
          mid >= display_width &&
          mid < display_width * 2
        ) {
          setStage(1);
        } else if (
          mid >= display_width * 2 &&
          mid < display_width * 3
        ) {
          setStage(2);
        } else if (
          mid >= display_width * 3 &&
          mid < display_width * 4
        ) {
          setStage(3);
        }
      }, 250);

      return function cleanUp() {
        clearInterval(indicatorInterval);
      };
    }
  }, [display_width]);

  const { user_data_ctx, user_task_ctx } = React.useContext(
    Context
  ) as ContextType;

  const [show_backdrop, setShowBackdrop] = React.useState<boolean>(false);

  const [show_workspace_info, setShowWorkspaceInfo] =
    React.useState<boolean>(false);

  const [search_value, setSearchValue] = React.useState<string>("");

  React.useEffect(() => {
    if (show_workspace_info) {
      setShowBackdrop(true);
    }
  }, [show_workspace_info]);

  const filtered_user_task = React.useMemo(() => {
    const lower_case_value = search_value.toLowerCase();
    if (user_task_ctx && search_value !== "") {
      return user_task_ctx.filter(
        (task) =>
          task.title.toLocaleLowerCase().includes(lower_case_value) ||
          task.assigned_member.some((member) =>
            member.username.toLowerCase().includes(lower_case_value)
          ) ||
          task.description.toLocaleLowerCase().includes(lower_case_value)
      );
    } else {
      return user_task_ctx;
    }
  }, [user_task_ctx, search_value]);

  if (props.data !== undefined) {
    const t_id = id_generator.task();
    const date_time = new Date();
    const date_ = new Date();

    const newTaskHandler = async (t: ProgressStatusType) => {
      const new_task: TaskType = {
        activity_list: [],
        assigned_member: [],
        author: user_data_ctx ? user_data_ctx.username : "",
        comments: [],
        created_at: date_time,
        deadline: date_,
        description: "",
        priority: "MED",
        seen_by: [],
        status: t,
        t_id: t_id,
        title: "Untitled",
        updated_at: date_time,
        w_id: w_id,
        workspace_name: "",
      };

      const data = await task_create_ctx(t_id, {
        task: new_task,
        u_id: u_id,
        w_id: w_id,
      });

      if (data && data.updated_count === 1) {
        console.log("yeyyy");
        // redirect to new task page
        // router.replace(`/home/${u_id}/workspace/${w_id}/task/${t_id}`);
      } else {
        console.log("Update failed huhu 😭");
      }
    };

    const next_up = filtered_user_task.filter(
      (task) => task.status === "NEXT-UP" && task.w_id === w_id
    );

    const in_progress = filtered_user_task?.filter(
      (task) => task.status === "IN-PROGRESS" && task.w_id === w_id
    );

    const revised = filtered_user_task?.filter(
      (task) => task.status === "REVISED" && task.w_id === w_id
    );

    const completed = filtered_user_task?.filter(
      (task) => task.status === "COMPLETED" && task.w_id === w_id
    );

    const backdropAction = () => {
      setShowWorkspaceInfo(false);
      setShowBackdrop(false);
    };

    return (
      <>
        <Backdrop isActive={show_backdrop} onClick={backdropAction} />
        {/* <Navbar
          title={props.data.name}
          menuHandler={() => setIsMenuActive(true)}
        /> */}
        {display_width && display_width < 640 && (
          <Indicator is_dark={is_dark} stage={stage} />
        )}
        <ModalWorkspaceInfo
          {...props.data}
          show={show_workspace_info}
          closeHandler={backdropAction}
        />

        <main className={[s.main, is_dark && s.dark].join(" ")}>
          <WorkspaceControl
            created_on={props.data.created_at}
            searchInputHandler={(e): void => {
              setSearchValue(e.target.value);
            }}
            search_value={search_value}
            workspace_desc={props.data.description}
            workspace_name={props.data.name}
            showWorkspaceInfoHandler={setShowWorkspaceInfo}
          />
          <div className={s.task_board}>
            {/* <OnlineBar users={props.data.member_list} /> */}
            <div
              dir="ltr"
              className={s.selection_screen}
              ref={screenRef}
              // onTouchEnd={pointerUpHandler}
            >
              {/* <div className={s.selection_display}> */}
              <TaskStageSection
                newTask={newTaskHandler}
                status="NEXT-UP"
                task_list={next_up}
                title="Next Up"
                key={"next-up-stage-section"}
                members={props.data.member_list}
                color_accent="#B4B4B8"
              />
              <TaskStageSection
                newTask={newTaskHandler}
                status="IN-PROGRESS"
                task_list={in_progress}
                title="In Progress"
                key={"in-progress-stage-section"}
                members={props.data.member_list}
                color_accent="#F5DD61"
              />
              <TaskStageSection
                newTask={newTaskHandler}
                status="REVISED"
                task_list={revised}
                title="Revised"
                key={"revised-stage-section"}
                members={props.data.member_list}
                color_accent="#FAA300"
              />
              <TaskStageSection
                newTask={newTaskHandler}
                status="COMPLETED"
                task_list={completed}
                title="Completed"
                key={"completed-stage-section"}
                members={props.data.member_list}
                color_accent="#5356FF"
              />
            </div>
          </div>
          {/* </div> */}
        </main>
      </>
    );
  } else {
    router.replace(`/home/${pathname.split("/")[2]}`);
  }
};

export default WorkspacePage;
