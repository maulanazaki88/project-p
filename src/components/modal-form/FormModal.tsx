import SquareButton from "../square-button/SquareButton";
import s from "./FormModal.module.css";
import React from "react";
import InputSmall from "../input-small/InputSmall";
interface FormModalProps {
  title: string;
  text_guide: string;
  placeholder: string;
  error: string;
  confirm_text: string;
  decline_text: string;
  confirm_act: () => void;
  decline_act: () => void;
}

const FormModal: React.FC<FormModalProps> = (props) => {
  const [prompt_value, setPromptValue] = React.useState<string>("");

  return (
    <div className={s.modal}>
      <div className={s.header}>
        <p className={s.title}>{props.title}</p>
      </div>
      <div className={s.content}>{props.text_guide}</div>
      <InputSmall
        icon={"/icons/delete.svg"}
        label=""
        name="delete"
        onChange={(e) => {
          setPromptValue(e.target.value);
        }}
        value={prompt_value}
        placeholder={props.placeholder}
        type="text"
        warning={props.error}
        hideCap
      />
      <div className={s.btn_group}>
        <SquareButton
          bg_color="steelblue"
          color="#fff"
          opacity={1}
          text={props.confirm_text}
        />
        <SquareButton
          bg_color="orange"
          color="#fff"
          opacity={1}
          text={props.confirm_text}
        />
      </div>
    </div>
  );
};

export default FormModal;
