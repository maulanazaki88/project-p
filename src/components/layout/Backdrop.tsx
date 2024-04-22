import React from "react";

interface BackdropProps {
  onClick: () => void;
  isActive: boolean;
  opacity?: number;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return (
    <div
      onClick={props.onClick}
      style={{
        display: props.isActive ? "block" : "none",
        width: "100vw",
        height: "100vh",
        backgroundColor: `rgba(0, 0, 0, ${
          props.opacity ? props.opacity : 0.3
        })`,
        zIndex: 100,
        position: "fixed",
        top: 0,
        left: 0,
      }}
    ></div>
  );
};

export default Backdrop;
