import s from "./CalendarMenu.module.css";
import React from "react";
import CalendarCard, { CalendarCardProps } from "../calender-card/CalendarCard";
import Context, { ContextType } from "@/context/Store";
import { TaskType } from "@/type";
import { DateFormater } from "@/utils/DateFormater";
import { useCalendar } from "@/hook/useCalendar";

interface CalendarMenuProps {
  isActive: boolean;
  title: string;
  closeHandler: () => void;
  u_id: string;
}

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const CalendarMenu: React.FC<CalendarMenuProps> = (props) => {
  const calendar = useCalendar();
  const [user_task, setUserTask] = React.useState<TaskType[]>([]);

  const calendar_list = React.useMemo(() => {
    const deadlines = user_task.slice(0).map((task, index) => {
      return task.deadline;
    });

    const deadlines_set = new Set(deadlines);

    const deadlines_set_arr = Array.from(deadlines_set);

    const calendar_list =
      deadlines_set_arr &&
      deadlines_set_arr.map((d, index) => {
        return {
          date: DateFormater(new Date(d)),
          task_list: user_task.filter((task) => task.deadline === d),
        } as CalendarCardProps;
      });

    return calendar_list.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);

      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return 0;
      }
    });
  }, [props]);

  React.useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-all-user-task/${props.u_id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        cache: "no-cache",
      }
    )
      .then((res) => res)
      .then((data) => data.json())
      .then((data) => {
        setUserTask(data);
        return;
      })
      .catch((e) => console.error(e.message));
  }, []);

  return (
    <div
      className={s.menu}
      style={{ translate: props.isActive ? "0 0" : "100% 0" }}
    >
      <ul className={s.calendar}>
        {calendar.available_month_number.map((c, index) => {
          const isEmpty = !calendar_list?.some(
            (item) =>
              parseInt(item.date.split("-")[0]) === parseInt(c.split("-")[0]) &&
              parseInt(item.date.split("-")[1]) === parseInt(c.split("-")[1])
          );
          return (
            <li key={`month-${index}`} className={s.month}>
              <h4 className={[s.month_header, "md", "medium"].join(" ")}>{`${
                months[parseInt(c.split("-")[1]) - 1]
              } ${c.split("-")[0]}`}</h4>
              {isEmpty && (
                <span className={"medium md soft"} style={{ width: "100%" }}>
                  Tidak ada tugas
                </span>
              )}
              <ul className={s.list}>
                {calendar_list &&
                  calendar_list.map((item, index) => {
                    if (
                      parseInt(item.date.split("-")[0]) ===
                        parseInt(c.split("-")[0]) &&
                      parseInt(item.date.split("-")[1]) ===
                        parseInt(c.split("-")[1])
                    ) {
                      return (
                        <li className={s.item} key={`calendar-item-${index}`}>
                          <CalendarCard
                            date={item.date}
                            task_list={item.task_list}
                          />
                        </li>
                      );
                    } else {
                    }
                  })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CalendarMenu;
