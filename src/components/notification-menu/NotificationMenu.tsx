import { WorkspaceType } from "@/type";
import ButtonLarge from "../button-large/ButtonLarge";
import NotificationCard, {
  NotificationCardProps,
} from "../notification-card/NotificationCard";
import s from "./NotificationMenu.module.css";
import React from "react";

interface NotificationMenuProps {
  isActive: boolean;
  title: string;
  closeHandler: () => void;
  newNotificationHandler?: () => void;
  u_id: string;
}

const NotificationMenu: React.FC<NotificationMenuProps> = (props) => {
  const [workspace_list, setWorkspaceList] = React.useState<WorkspaceType[]>(
    []
  );

  const notification_list: NotificationCardProps[] = React.useMemo(() => {
    return workspace_list
      .map((w, index) => {
        return w.notification_list.map((n) => {
          return {
            ...n,
            w_id: w.w_id,
          } as NotificationCardProps;
        });
      })
      .flat(1);
  }, [workspace_list]);

  React.useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-all-user-workspace/${props.u_id}`,
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
        setWorkspaceList(data);
        return;
      })
      .catch((e) => console.error(e.message));
  }, []);

  return (
    <div
      className={s.menu}
      style={{ translate: props.isActive ? "0 0" : "100% 0" }}
    >
      <ul className={s.notif_list}>
        {notification_list.map((n, index) => {
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
    </div>
  );
};

export default NotificationMenu;
