import React from "react";
import { SVGIconProps } from "@/type";

const DotMenuSVG: React.FC<SVGIconProps> = (props) => {
  return (
    <svg
      width="4"
      height="20"
      viewBox="0 0 4 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: props.opacity, scale: props.scale }}
    >
      <circle cx="2.00003" cy="2.44446" r="1.88889" fill={props.color} />
      <circle cx="2.00003" cy="9.99997" r="1.88889" fill={props.color} />
      <circle cx="2.00003" cy="17.5555" r="1.88889" fill={props.color} />
    </svg>
  );
};

export default DotMenuSVG