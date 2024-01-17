import s from "./TaskFilterWidget.module.css"
import React from 'react'
import { SortType, FilterType } from "../task-stage-section/TaskStageSection";

interface TaskFilterWidgetProps {
  sort: SortType;
  filter: FilterType;
  byAssigned: string;
  sortHandler: React.Dispatch<SortType>;
  filterHandler: React.Dispatch<FilterType>;
  byAssignedHandler: React.Dispatch<string>;
}

const TaskFilterWidget: React.FC<TaskFilterWidgetProps> = (props) => {
  return (
    <div className={s.widget} >
      <div className={s.ctn} >
        
      </div>
    </div>
  )
}

export default TaskFilterWidget