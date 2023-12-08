import s from "./LogView.module.css";
import React from "react";
import { ActivityLogType } from "@/type";
import { useCalendar } from "@/hook/useCalendar";

interface LogViewProps {
  log: ActivityLogType[];
}

const LogView: React.FC<LogViewProps> = (props) => {
  return (
    <div className={s.ctn}>
      <p className={[s.label, "medium", "md", "soft"].join(" ")}>Aktivitas Terakhir</p>
      <div className={s.log}>
        <ul className={s.list}>
          {props.log.map((a, index) => {
            return (
              <li className={s.item} key={`log-index-${index}`}>
                <span className={[s.info, "medium", "sm"].join(" ")}>
                  {a.activity_desc}
                </span>
                <span className={[s.time, "medium", "sm"].join(" ")}>
                  {useCalendar(a.created_at, ["m", "d"])}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LogView;
