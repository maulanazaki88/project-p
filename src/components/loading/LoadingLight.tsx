import s from "./LoadingLight.module.css";
import React from "react";
import Context, { ContextType } from "@/context/Store";

interface LoadingProps {
  color?: string;
  style?: React.CSSProperties;
  speed?: number;
  size?: number;
}

const Loading: React.FC<LoadingProps> = (props) => {

  return (
    <div className={s.loading} style={props.style}>
      <svg
        className={s.svg}
        version="1.1"
        id="L9"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
        xmlSpace="preserve"
        width={props.size ? props.size : 40}
        height={props.size ? props.size : 40}
      >
        <path
          fill={props.color ? props.color : "#fff"}
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur={props.speed ? `${1 / props.speed}s` : "1s"}
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default Loading;
