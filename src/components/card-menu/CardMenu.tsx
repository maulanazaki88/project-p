import s from "./CardMenu.module.css";
import React from "react";
import CalendarCard, { CalendarCardProps } from "../calender-card/CalendarCard";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import NotificationCard, {
  NotificationCardProps,
} from "../notification-card/NotificationCard";
import ButtonLarge from "../button-large/ButtonLarge";
import { useCalendar } from "@/hook/useCalendar";
import { DateFormater } from "@/utils/DateFormater";

interface CardMenuProps {
  calendar_list?: CalendarCardProps[];
  notification_list?: NotificationCardProps[];
  isActive: boolean;
  title: string;
  closeHandler: () => void;
  newNotificationHandler?: () => void;
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

const CardMenu: React.FC<CardMenuProps> = (props) => {
  const calendar = useCalendar();

  console.log("available month number", calendar.available_month_number);

  const CalendarViews = props.calendar_list && (
    <ul className={s.calendar}>
      {calendar.available_month_number.map((c, index) => {
        const isEmpty = !props.calendar_list?.some(
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
              {props.calendar_list &&
                props.calendar_list.map((item, index) => {
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
  );

  // console.log("calendar views", CalendarViews);

  const NotificationViews = props.notification_list && (
    <ul className={s.notif_list}>
      {props.notification_list.map((n, index) => {
        return (
          <li className={s.notif_item} key={`notification-item-${index}`}>
            <NotificationCard
              created_at={n.created_at}
              message={n.message}
              username={n.username}
              w_id={n.w_id}
            />
          </li>
        );
      })}
      <li className={s.add}>
        <ButtonLarge
          bg_color="#fff"
          color="#000"
          text="New Notification"
          icon="/icons/plus.svg"
          onClick={props.newNotificationHandler}
        />
      </li>
    </ul>
  );

  return (
    <div
      className={s.menu}
      style={{ translate: props.isActive ? "0 0" : "100% 0" }}
    >
      <MenuNavbar title={props.title} closeHandler={props.closeHandler} />
      {CalendarViews}
      {NotificationViews}
    </div>
  );
};

export default CardMenu;
