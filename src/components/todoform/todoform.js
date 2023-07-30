import { useState } from "react";
import { useToDosActions } from "../providers/todoprovider";
import "./todoform.css";

const ToDoForm = () => {
  const [todoInput, setToDoInput] = useState("");
  const { addToDo } = useToDosActions();

  const toDoInputHandler = (event) => {
    setToDoInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!todoInput) {
      alert("input is empty");
      return;
    }
    addToDo(todoInput);
    setToDoInput("");
  };

  return (
    <div className="toDoFrom">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={todoInput}
          placeholder="task"
          onChange={toDoInputHandler}
        ></input>
        <button className="button" type="submit">add</button>
      </form>
    </div>
  );
};

export default ToDoForm;
