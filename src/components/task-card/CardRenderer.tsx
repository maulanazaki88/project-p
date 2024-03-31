import s from "./CardRenderer.module.css";
import React from "react";
import { TaskCardProps } from "./TaskCard";
import TaskCard from "./TaskCard";

interface CardRendererProps {
  card_data: TaskCardProps;
  shadow_data: TaskCardProps | null;
}

const CardRenderer: React.FC<CardRendererProps> = (props) => {
  const [hover_top, setHoverTop] = React.useState<boolean>(false);
  const [hover_bottom, setHoverBottom] = React.useState<boolean>(false);

  const rendererRef = React.useRef<HTMLDivElement>(null);

  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const renderer = rendererRef.current;
    if(renderer) {
        console.log("renderer exist")
        
    }
  }

  return (
    <div ref={rendererRef} className={s.renderer}>
      <div className={s.ctn}>
        <TaskCard {...props.card_data} isShadow isAppear={hover_top} />
      </div>
      <div className={s.ctn}>
        <TaskCard {...props.card_data} />
      </div>
      <TaskCard {...props.card_data} isShadow isAppear={hover_bottom} />
    </div>
  );
};

export default CardRenderer;
