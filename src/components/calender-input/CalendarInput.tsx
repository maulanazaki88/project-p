import s from "./CalendarInput.module.css";
import React from "react";

interface CalendarInputProps {
  show: boolean;
  value: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
}

const CalendarInput: React.FC<CalendarInputProps> = (props) => {
  return (
    <div
      className={s.calendar}
      style={{ display: props.show ? "block" : "none" }}
    >
      <input
        value={props.value}
        name={props.name}
        type="date"
        className={s.input}
        onChange={props.onChange}
        id="calendar-input"
      />
    </div>
  );
};

export default CalendarInput;
