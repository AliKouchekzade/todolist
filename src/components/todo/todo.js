import { createRef, useEffect } from "react";
import { useToDosActions } from "../providers/todoprovider";

const ToDo = ({ todo }) => {
  const dispachToDo = useToDosActions();
  const inputTitleRef = createRef();

  useEffect(() => {
    if (todo.edit) inputTitleRef.current.focus();
  });


  return (
    <div className="todo">
      <div className="todo__left">
        <input
          type="checkbox"
          id={todo.id}
          checked={todo.complete}
          onChange={() => dispachToDo({ id: todo.id, type: "complete" })}
        />
        <input
          type="text"
          value={todo.title}
          disabled={!todo.edit}
          className={`todo__title ${todo.complete ? "completed" : undefined}`}
          ref={inputTitleRef}
          onBlur={() => dispachToDo({ id: todo.id, type: "endFocus" })}
          onChange={(event) =>
            dispachToDo({
              id: todo.id,
              type: "edit",
              title: event.target.value,
            })
          }
          onKeyUp={(event) => {
            if (event.code === "Enter")
              dispachToDo({ id: todo.id, type: "endFocus" });
          }}
        />
      </div>
      <div className="todo__right">
      <span>{todo.category}</span>
        <button
          className="button"
          onClick={() => dispachToDo({ id: todo.id, type: "editButton" })}
        >
          Edit
        </button>
        <button
          className="button"
          onClick={() => dispachToDo({ id: todo.id, type: "delete" })}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ToDo;
