import s from "./CalendarMenu.module.css";
import React from "react";
import CalendarCard, { CalendarCardProps } from "../calender-card/CalendarCard";
import Context, { ContextType } from "@/context/Store";
import { TaskType } from "@/type";
import { DateFormater } from "@/utils/DateFormater";
import { useCalendar } from "@/hook/useCalendar";
import RoundButton from "../round-button/RoundButton";
import { usePathname } from "next/navigation";
import Loading from "../loading/LoadingLight";

interface CalendarMenuProps {
  isActive: boolean;
  title: string;
  closeHandler: () => void;
  u_id: string;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarMenu: React.FC<CalendarMenuProps> = (props) => {
  const pathname = usePathname();
  const w_id = pathname.split("/")[4];
  const calendar = useCalendar();
  const [user_task, setUserTask] = React.useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const calendar_list = React.useMemo(() => {
    const deadlines = user_task.slice(0).map((task) => {
      return task.deadline;
    });

    const deadlines_set = new Set(deadlines);

    const deadlines_set_arr = Array.from(deadlines_set);

    const calendar_list =
      deadlines_set_arr &&
      deadlines_set_arr.map((d) => {
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
  }, [user_task]);

  React.useEffect(() => {
    if (props.isActive) {
      setIsLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/task/get/user/${props.u_id}?u_id=${props.u_id}&w_id=${w_id}`,
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
          setIsLoading(false);
          return;
        })
        .catch((e) => console.error(e.message));
    }
  }, [props.isActive]);

  return (
    <div
      className={s.menu}
      style={{ translate: props.isActive ? "-50% -50%" : "-50% 100%" }}
    >
      {isLoading ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99
          }}
        >
          <Loading color="1a1a2e" size={100} />
        </div>
      ) : (
        <>
          <RoundButton
            color="#fff"
            icon={"/icons/close_black.svg"}
            opacity={1}
            onClick={() => {
              props.closeHandler();
            }}
            scale={1.2}
            style={{
              position: "absolute",
              top: "2%",
              right: "2%",
              zIndex: 99,
            }}
          />
          <div className={s.header}>
            <p className={[s.title, "big", "medium"].join(" ")}>
              Task Calendar
            </p>
          </div>
          <ul className={s.calendar}>
            {calendar.available_month_number.map((c, index) => {
              const isEmpty = !calendar_list?.some(
                (item) =>
                  parseInt(item.date.split("-")[0]) ===
                    parseInt(c.split("-")[0]) &&
                  parseInt(item.date.split("-")[1]) ===
                    parseInt(c.split("-")[1])
              );
              return (
                <li key={`month-${index}`} className={s.month}>
                  <h4
                    className={[s.month_header, "md", "medium"].join(" ")}
                  >{`${months[parseInt(c.split("-")[1]) - 1]} ${
                    c.split("-")[0]
                  }`}</h4>
                  {isEmpty && (
                    <span
                      className={"medium sm soft"}
                      style={{ width: "100%" }}
                    >
                      No task
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
                            <li
                              className={s.item}
                              key={`calendar-item-${index}`}
                            >
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
        </>
      )}
    </div>
  );
};

export default CalendarMenu;
