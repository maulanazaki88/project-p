import Image from "next/image";
import s from "./ThemeSelector.module.css";
import React from "react";
import Context, { ContextType } from "@/context/Store";
import RoundButton from "../round-button/RoundButton";

interface Props {
  is_dark: boolean;
  show: boolean;
  closeHandler: () => void
}

interface ButtonProps {
  onClick: () => void;
  icon: string;
  text: string;
  on: boolean;
}

const ThemeButton: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={[s.button, props.on && s.on].join(" ")}
      onClick={props.onClick}
    >
      <Image
        src={props.icon}
        alt="light-mode"
        width={18}
        height={18}
        className={s.theme_icons}
        loading="lazy"
      />
      <span className={s.text}>{props.text}</span>
    </button>
  );
};

const ThemeSelector: React.FC<Props> = (props) => {
  const { theme_ctx, theme_handler_ctx } = React.useContext(
    Context
  ) as ContextType;

  const button_list = React.useMemo(() => {
    return [
      {
        icon: props.is_dark ? "/icons/sun_white.svg" : "/icons/sun_black.svg",
        onClick: () => {
          theme_handler_ctx("light");
        },
        text: "Light",
        on: theme_ctx === "light",
      } satisfies ButtonProps,
      {
        icon: props.is_dark ? "/icons/moon_white.svg" : "/icons/moon_black.svg",
        onClick: () => {
          theme_handler_ctx("dark");
        },
        text: "Dark",
        on: theme_ctx === "dark",
      } satisfies ButtonProps,
      {
        icon: props.is_dark
          ? "/icons/system_white.svg"
          : "/icons/system_black.svg",
        onClick: () => {
          theme_handler_ctx("system");
        },
        text: "System",
        on: theme_ctx === "system",
      } satisfies ButtonProps,
    ];
  }, [theme_ctx]);

  return (
    <div className={[s.selector, props.is_dark && s.dark].join(" ")}>
      <RoundButton
        color="transparent"
        icon={props.is_dark ? "/icons/close_white.svg" : "/icons/close_black.svg"}
        opacity={1}
        onClick={() => {
          props.closeHandler();
        }}
        icon_scale={1}
        style={{
          position: "absolute",
          top: "1%",
          right: "1%",
          zIndex: 99,
        }}
      />
      <div className={s.header}>
        <p className={s.title}>Select theme</p>
      </div>
      <ul className={[s.list, props.is_dark && s.dark].join(" ")}>
        {button_list.map((b, i) => {
          return (
            <li
              className={[s.item, props.is_dark && s.dark].join(" ")}
              key={`button-theme-${i}`}
            >
              <ThemeButton {...b} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ThemeSelector;
