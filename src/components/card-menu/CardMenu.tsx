import s from "./CardMenu.module.css";
import React from "react";
import CalendarCard, { CalendarCardProps } from "../calender-card/CalendarCard";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import NotificationCard, {
  NotificationCardProps,
} from "../notification-card/NotificationCard";

interface CardMenuProps {
  calendar_list?: CalendarCardProps[];
  notification_list?: NotificationCardProps[];
  isActive: boolean;
  title: string;
}

const CardMenu: React.FC<CardMenuProps> = (props) => {
  const CalendarViews = props.calendar_list && (
    <ul className={s.list}>
      {props.calendar_list.map((c, index) => {
        return (
          <li className={s.item} key={`calendar-item-${index}`}>
            <CalendarCard date={c.date} task_list={c.task_list} />
          </li>
        );
      })}
    </ul>
  );

  const NotificationViews = props.notification_list && (
    <ul className={s.list}>
      {props.notification_list.map((n, index) => {
        return (
          <li className={s.item} key={`notification-item-${index}`}>
            <NotificationCard
              date={n.date}
              text={n.text}
              username={n.username}
              w_id={n.w_id}
            />
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={s.menu} style={{left: props.isActive ? "0" : '100%'}} >
      <MenuNavbar title={props.title} />
      {CalendarViews}
      {NotificationViews}
    </div>
  );
};

export default CardMenu;
