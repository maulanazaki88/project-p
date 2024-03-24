import s from "./WorkspaceCard.module.css";
import React from "react";

const WorkspaceCardSkeleton = () => {
  return <div className={[s.card, s.skeleton].join(" ")}></div>;
};

export default WorkspaceCardSkeleton;
