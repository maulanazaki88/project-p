import s from "./Indicator.module.css";
import React from "react";


interface IndicatorProps {
  stage: number;
}

const Indicator: React.FC<IndicatorProps> = (props) => {
  return (
    <div className={s.indicator}>
      <div
        className={s.circle}
        style={{
          backgroundColor:
            props.stage === 0
              ? "hsla(207, 44%, 49%, 1)"
              : "hsla(207, 44%, 49%, 0.2)",
        }}
      ></div>
      <div
        className={s.circle}
        style={{
          backgroundColor:
            props.stage === 1
              ? "hsla(207, 44%, 49%, 1)"
              : "hsla(207, 44%, 49%, 0.2)",
        }}
      ></div>
      <div
        className={s.circle}
        style={{
          backgroundColor:
            props.stage === 2
              ? "hsla(207, 44%, 49%, 1)"
              : "hsla(207, 44%, 49%, 0.2)",
        }}
      ></div>
      <div
        className={s.circle}
        style={{
          backgroundColor:
            props.stage === 3
              ? "hsla(207, 44%, 49%, 1)"
              : "hsla(207, 44%, 49%, 0.2)",
        }}
      ></div>
    </div>
  );
};

export default Indicator;
