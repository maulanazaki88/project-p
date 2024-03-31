import s from "./FormMenu.module.css";
import React from "react";
import InputLarge from "../input-large/InputLarge";
import InputSmall from "../input-small/InputSmall";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import SquareButton from "../square-button/SquareButton";

interface FormMenuProps {
  title: string;
  closeHandler: () => void;
  submitHandler: (d: { key: string; value: string }) => void;
  show: boolean;
  label: string;
  name: string;
  hideInputInfo?: boolean;
  type: "LARGE" | "SMALL";
  placeholder?: string;
  maxChar?: number;
  warning?: string;
  button_text: string;
  button_color: string;
}

const FormMenu: React.FC<FormMenuProps> = (props) => {
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    if(!props.show){
      setValue("")
    }
  }, [props.show])

  return (
    <div className={s.menu} style={{ top: props.show ? "50vh" : "150vh" }}>
      <MenuNavbar
        no_blur
        closeHandler={props.closeHandler}
        title={props.title}
      />
      <form className={s.form}>
        {props.type === "LARGE" ? (
          <InputLarge
            label={props.label}
            name={props.label}
            onChange={(e): void => {
              setValue(e.target.value);
            }}
            placeholder={props.placeholder ? props.placeholder : props.label}
            value={value}
            maxChar={props.maxChar}
          />
        ) : (
          <InputSmall
            icon="/icons/clipboard.svg"
            label={props.label}
            name={props.title}
            onChange={(e): void => {
              setValue(e.target.value);
            }}
            placeholder={props.placeholder ? props.placeholder : props.label}
            type="text"
            value={value}
            warning={props.warning ? props.warning : "-"}
            hideCap
          />
        )}

        <div className={s.btn}>
          <SquareButton
            bg_color={props.button_color}
            color="#fff"
            opacity={1}
            text={props.button_text}
            onClick={() => {
              props.submitHandler({ key: props.name, value: value });
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default FormMenu;
