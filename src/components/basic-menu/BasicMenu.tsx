import s from "./BasicMenu.module.css";
import React from "react";
import ButtonLarge, { ButtonLargeProps } from "../button-large/ButtonLarge";
import { ActivityLogType } from "@/type";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import LogView from "../log-view/LogView";

interface BasicMenuProps {
  title: string;
  button_list: ButtonLargeProps[];
  log_list?: ActivityLogType[];
  delete_text?: string;
  isActive: boolean;
  closeHandler: () => void;
  deleteHandler?: () => void;
}

const BasicMenu: React.FC<BasicMenuProps> = (props) => {
  return (
    <div className={s.menu} style={{ translate : props.isActive ? `0 0` : `100% 0` }}>
      <MenuNavbar title={props.title} closeHandler={props.closeHandler} />
      <ul className={s.button_list}>
        {props.button_list.map((btn, index) => {
          return (
            <li className={s.item} key={`menu-btn-${index}`}>
              <ButtonLarge
                bg_color="#fff"
                color="#000"
                text={btn.text}
                icon={btn.icon}
                notification={btn.notification}
                rowReverse
                onClick={btn.onClick}
                icon_scale={btn.icon_scale}
                disabled={btn.disabled}
              />
            </li>
          );
        })}
      </ul>
      {/* {props.log_list && (
        <div className={s.log}>
          <LogView log={props.log_list} />
        </div>
      )} */}

      {props.delete_text && (
        <ButtonLarge
          bg_color="red"
          color="#fff"
          text={props.delete_text}
          icon="/icons/delete_white.svg"
          rowReverse
          onClick={props.deleteHandler}
        />
      )}
    </div>
  );
};

export default BasicMenu;
