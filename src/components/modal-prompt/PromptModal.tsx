import SquareButton from "../square-button/SquareButton";
import s from "./PromptModal.module.css";
import React from "react";
import RoundButton from "../round-button/RoundButton";
export interface PromptModalProps {
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
      <RoundButton
        color="#fff"
        icon={"/icons/close_black.svg"}
        opacity={1}
        onClick={() => {
          props.decline_act();
        }}
        icon_scale={1.2}
        style={{
          position: "absolute",
          top: "5%",
          right: "2%",
          zIndex: 99,
        }}
      />
      <div className={s.header}>
        <p className={[s.title, "md", "medium"].join(" ")}>{props.title}</p>
      </div>
      <div className={[s.content, "sm", "blend"].join(" ")}>
        {props.text_prompt}
      </div>
      <div className={s.btn_group}>
        <SquareButton
          bg_color="steelblue"
          color="#fff"
          opacity={1}
          onClick={props.confirm_act}
          text={props.confirm_text}
        />
        <SquareButton
          bg_color="orange"
          color="#fff"
          opacity={1}
          text={props.decline_text}
          onClick={props.decline_act}
        />
      </div>
    </div>
  );
};

export default PromptModal;
