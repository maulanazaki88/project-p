import SquareButton from "../square-button/SquareButton";
import s from "./PromptModal.module.css";
import React from "react";
interface PromptModalProps {
  title: string;
  text_prompt: string;
  confirm_text: string;
  decline_text: string;
  confirm_act: () => void;
  decline_act: () => void;
}

const PromptModal: React.FC<PromptModalProps> = (props) => {
  return (
    <div className={s.modal}>
      <div className={s.header}>
        <p className={s.title}>{props.title}</p>
      </div>
      <div className={s.content}>{props.text_prompt}</div>
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

export default PromptModal;
