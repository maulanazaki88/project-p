import s from "./TaskCard.module.css";
import React from "react";

const TaskCardSkeleton = () => {
  return <div className={[s.card, s.skeleton].join(" ")}></div>;
};

export default TaskCardSkeleton;
