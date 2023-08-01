import { useState } from "react";
import { useCategory, useToDosActions } from "../providers/todoprovider";
import Select from "react-select";

const ToDoForm = () => {
  const [todoInput, setToDoInput] = useState("");
  const categorys = [...useCategory()].slice(1);
  const dispachToDo = useToDosActions();
  const [selectedCategory, setSelectedCategory] = useState(categorys[0]);

  const toDoInputHandler = (event) => {
    setToDoInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!todoInput) {
      alert("input is empty");
      return;
    }
    dispachToDo({ type: "add", title: todoInput ,category:selectedCategory.value });
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
        <Select
          options={categorys}
          value={selectedCategory}
          onChange={(sel) => setSelectedCategory(sel)}
        />
        <button className="button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;
