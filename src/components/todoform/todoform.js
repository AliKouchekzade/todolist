import { useState } from "react";
import { useToDosActions } from "../providers/todoprovider";

const ToDoForm = () => {
  const [todoInput, setToDoInput] = useState("");

  const dispachToDo = useToDosActions();

  const toDoInputHandler = (event) => {
    setToDoInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!todoInput) {
      alert("input is empty");
      return;
    }
    dispachToDo({type:"add",title:todoInput});
    setToDoInput("");
  };

  return (
    <div className="toDoFrom">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={todoInput}
          placeholder="New Todo"
          onChange={toDoInputHandler}
        ></input>
        <button className="button" type="submit">Add</button>
      </form>
    </div>
  );
};

export default ToDoForm;
