import s from "./TaskControl.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRenderDate } from "@/hook/useRenderDate";
import RoundButton from "../round-button/RoundButton";
import { usePathname } from "next/navigation";
import Context, {ContextType} from "@/context/Store";

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

  const {theme_ctx} = React.useContext(Context) as ContextType

  const is_dark = theme_ctx === 'dark'

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
    <div className={[s.control, is_dark && s.dark].join(' ')}>
      <div className={s.first}>
        <div className={s.left} onClick={closeHandler}>
          <RoundButton
            color="transparent"
            highlightOnActive
            icon={ is_dark ? "/icons/next_white.svg" : "/icons/next_black.svg"}
            opacity={1}
            icon_scale={1}
          />
          <span className={[s.w_name].join(" ")}>
            {props.workspace_name.toLocaleUpperCase()}
          </span>
        </div>
        <div className={s.right}>
          <span className={[s.created_date, "sm", "medium", "soft", is_dark && s.dark].join(" ")}>
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
            icon_scale={0.8}
            button_scale={0.8}
            onClick={props.showDeleteModalHandler}
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
