import s from "./CalendarInput.module.css";
import React from "react";
import Context, {ContextType} from "@/context/Store";

interface CalendarInputProps {
  show: boolean;
  value: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
}

const CalendarInput: React.FC<CalendarInputProps> = (props) => {

  const {theme_ctx} = React.useContext(Context) as ContextType; 
  const is_dark = theme_ctx === 'dark' 

  return (
    <div
      className={s.calendar}
      style={{ display: props.show ? "block" : "none" }}
    >
      <input
        value={props.value}
        name={props.name}
        type="date"
        className={[s.input, is_dark && s.dark].join(' ')}
        onChange={props.onChange}
        id="calendar-input"
      />
    </div>
  );
};

export default CalendarInput;
