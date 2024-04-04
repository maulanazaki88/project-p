import s from "./SearchModal.module.css";
import React from "react";
import Context, { ContextType } from "@/context/Store";
import ResultItem, { ResultItemProps } from "./ResultItem";
import RoundButton from "../round-button/RoundButton";

interface Props {
  show: boolean;
  value: string;
  closeHandler: () => void;
  u_id: string;
  searchChangeHandler: React.Dispatch<string>;
}

const SearchModal: React.FC<Props> = (props) => {
  const { user_task_ctx, user_workspaces_ctx } = React.useContext(
    Context
  ) as ContextType;

  const items = React.useMemo(() => {
    let value = props.value.toLowerCase();
    const relevant_task = user_task_ctx
      .filter(
        (task) =>
          task.title.toLowerCase().includes(value) ||
          task.description.toLowerCase().includes(value)
      )
      .map((task) => {
        return {
          desc: task.description,
          link: `${process.env.NEXT_PUBLIC_BASE_URL}/home/${props.u_id}/workspace/${task.w_id}/task/${task.t_id}`,
          name: task.title,
          type: "Task",
        } as ResultItemProps;
      });

    const relevant_workspace = user_workspaces_ctx
      .filter(
        (workspace) =>
          workspace.name.toLowerCase().includes(value) ||
          workspace.description.toLowerCase().includes(value)
      )
      .map((workspace) => {
        return {
          desc: workspace.description,
          link: `${process.env.NEXT_PUBLIC_BASE_URL}/home/${props.u_id}/workspace/${workspace.w_id}`,
          name: workspace.name,
          type: "Workspace",
        } as ResultItemProps;
      });

    return [...relevant_workspace, ...relevant_task] as ResultItemProps[];
  }, [props.value, user_task_ctx, user_workspaces_ctx]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (props.show && inputRef) {
      inputRef.current?.focus();
    }
  }, [props.show]);

  return (
    <div
      className={s.modal}
      style={{ translate: props.show ? "-50% -50%" : "-50% 100%" }}
    >
      <RoundButton
        color="#fff"
        icon={"/icons/close_black.svg"}
        opacity={1}
        onClick={() => {
          props.closeHandler();
        }}
        icon_scale={1.2}
        style={{
          position: "absolute",
          top: "2%",
          right: "2%",
          zIndex: 99,
        }}
      />
      <div className={s.header}>
        <span className={[s.txt, "md", "regular", 'soft'].join(" ")}>Search for:</span>
        <input
          type="text"
          className={[s.search_input, 'md', 'medium'].join(' ')}
          placeholder="Type here"
          name="search"
          value={props.value}
          onChange={(e) => props.searchChangeHandler(e.target.value)}
          ref={inputRef}
        />
      </div>
      <div className={s.result_screen}>
        {items.length > 0 ? (
          <ul className={s.result_list}>
            {items.map((item, index) => {
              return (
                <li className={s.result_item} key={`result-item-${index}`}>
                  <ResultItem {...item} />
                </li>
              );
            })}
          </ul>
        ) : (
          <span className={[s.empty, "md", "medium"].join(" ")}>
            No result 😟
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
