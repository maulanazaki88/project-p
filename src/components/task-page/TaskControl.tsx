import s from "./TaskControl.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRenderDate } from "@/hook/useRenderDate";
import RoundButton from "../round-button/RoundButton";
import { usePathname } from "next/navigation";

interface TaskControlInterface {
  workspace_name: string;
  showShareModalHandler: () => void;
  showDeleteModalHandler: () => void;
  created_on: Date;
}

const TaskControl: React.FC<TaskControlInterface> = (props) => {
  const router = useRouter();
  const calendar = useRenderDate();
  const pathname = usePathname();

  const u_id = pathname.split("/")[2];
  const t_id = pathname.split("/")[6];

  const closeHandler = () => {
    router.back();
  };

  const [display_width, setDisplayWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    function getDisplayWidth() {
      const width = window.innerWidth;
      setDisplayWidth(width);
    }

    getDisplayWidth();

    window.addEventListener("resize", getDisplayWidth);

    return function cleanUp() {
      window.removeEventListener("resize", getDisplayWidth);
    };
  }, []);

  return (
    <div className={s.control}>
      <div className={s.first}>
        <div className={s.left} onClick={closeHandler}>
          <RoundButton
            color="transparent"
            highlightOnActive
            icon="/icons/next_black.svg"
            opacity={1}
            scale={1}
          />
          <span className={[s.w_name].join(" ")}>
            {props.workspace_name.toLocaleUpperCase()}
          </span>
        </div>
        <div className={s.right}>
          <span className={[s.created_date, "sm", "medium", "soft"].join(" ")}>
            Created on {calendar.calendar(props.created_on, ["d", "m"])}
          </span>
          {/* <button
          type="button"
          className={s.share_btn}
          onClick={props.showShareModalHandler}
        >
          Share
        </button> */}
          <RoundButton
            color="#dc143c"
            icon="/icons/delete_white.svg"
            opacity={1}
            highlightOnActive
            scale={0.8}
          />
        </div>
      </div>
      {display_width && display_width < 640 && (
        <div className={s.second}>
          <div className={s.left}>
            <div className={s.head}>
              <p className={[s.section, "sm", "regular"].join(" ")}>Details</p>
            </div>
          </div>
          <div className={s.right}>
            <div className={s.head}>
              <p className={[s.section, "sm", "regular"].join(" ")}>Comments</p>
            </div>
          </div>
          {/* <div className={s.slider} ></div> */}
        </div>
      )}
    </div>
  );
};

export default TaskControl;
