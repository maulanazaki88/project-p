import s from "./TaskControl.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { DateFormater } from "@/utils/DateFormater";
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

  const u_id = pathname.split("/")[2]
  const t_id = pathname.split("/")[6]

  const closeHandler = () => {
    router.back();
  };

  return (
    <div className={s.control}>
      <div className={s.left}>
        <span className={[s.w_name, "md", "light"].join(" ")}>{props.workspace_name.toLocaleUpperCase()}</span>
        <div className={s.access} >
          <RoundButton
            color="transparent"
            icon="/icons/edit_access_black.svg"
            opacity={0.5}
            scale={0.8}
            style={{
              scale: 1
            }}
          />
          <RoundButton
            color="transparent"
            icon="/icons/eye_black.svg"
            opacity={0.5}
            scale={0.8}
            style={{
              scale: 1
            }}
          />
        </div>
      </div>
      <div className={s.right}>
        <span className={[s.created_date, "sm", "medium"].join(" ")}> Created on {calendar.calendar(props.created_on, ["d", "m"])}</span>
        {/* <button
          type="button"
          className={s.share_btn}
          onClick={props.showShareModalHandler}
        >
          Share
        </button> */}
        <button
          type="button"
          className={s.delete_btn}
          onClick={props.showDeleteModalHandler}
        >
          Delete
        </button>
        <button type="button" className={s.close_btn} onClick={closeHandler}>
          <Image
            src={"/icons/close_black.svg"}
            alt="close"
            width={30}
            height={30}
            className={s.icon}
          />
        </button>
      </div>
    </div>
  );
};

export default TaskControl;
