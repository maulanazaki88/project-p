import s from "./FormMenu.module.css";
import React from "react";
import InputLarge from "../input-large/InputLarge";
import MenuNavbar from "../menu-navbar/MenuNavbar";
import SquareButton from "../square-button/SquareButton";

interface FormMenuProps {
  title: string;
  closeHandler: () => void;
  submitHandler: (d: { key: string; value: string }) => void;
  show: boolean;
  label: string;
  name: string;
}

const FormMenu: React.FC<FormMenuProps> = (props) => {
  const [value, setValue] = React.useState<string>("");

  return (
    <div className={s.menu} style={{ top: props.show ? "50vh" : "150vh" }}>
      <MenuNavbar
        no_blur
        closeHandler={props.closeHandler}
        title={props.title}
      />
      <form
        className={s.form}
        onSubmit={() => {
          props.submitHandler({ key: props.name, value: value });
        }}
      >
        <InputLarge
          label={props.label}
          name={props.label}
          onChange={(e): void => {
            setValue(e.target.value);
          }}
          placeholder={props.label}
          value={value}
        />
        <div className={s.btn}>
          <SquareButton
            bg_color="#1c062d"
            color="#fff"
            opacity={1}
            text="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default FormMenu;
