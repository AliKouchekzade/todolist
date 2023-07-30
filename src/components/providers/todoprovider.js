import { createContext, useContext, useReducer, useState } from "react";
import { v4 as uuid } from "uuid";

const todosContext = createContext();
const setTodosContext = createContext();

const initial = [
  { id: uuid().slice(0, 8), title: "task1", complete: false, edit: false },
  { id: uuid().slice(0, 8), title: "task2", complete: false, edit: false },
  { id: uuid().slice(0, 8), title: "task3", complete: true, edit: false },
  { id: uuid().slice(0, 8), title: "task4", complete: false, edit: false },
];

const ToDosPovider = ({ children }) => {
  const [alltodos, setAllTodos] = useState(initial);
  const [selected, setSelected] = useState("All");

  const filter = function (arr, str) {
    return arr.filter((obj) => {
      if (str === "complete") return obj.complete === true;
      else if (str === "incomplete") return obj.complete === false;
      else return arr;
    });
  };

  const Reduce = (state, action) => {
    if (action.type === "add") {
      const updated = [
        ...alltodos,
        {
          id: uuid().slice(0, 8),
          title: action.title,
          complete: false,
          edit: false,
        },
      ];
      setAllTodos(updated);
      return filter(updated, selected);
    }

    if (action.type === "delete") {
      const updated = alltodos.filter((obj) => obj.id !== action.id);
      setAllTodos(updated);
      return filter(updated, selected);
    }

    if (action.type === "filter") {
      setSelected(action.value);
      return filter(alltodos, action.value);
    }

    const todosCopy = [...alltodos];
    const index = todosCopy.findIndex((obj) => obj.id === action.id);
    const updateToDO = todosCopy[index];

    if (action.type === "complete") updateToDO.complete = !updateToDO.complete;
    else if (action.type === "editButton") updateToDO.edit = true;
    else if (action.type === "edit") updateToDO.title = action.title;
    else if (action.type === "endFocus") updateToDO.edit = false;

    todosCopy[index] = updateToDO;
    setAllTodos(todosCopy);
    return filter(todosCopy,selected);
  };

  const [todos, dispachToDo] = useReducer(Reduce, initial);

  return (
    <todosContext.Provider value={todos}>
      <setTodosContext.Provider value={dispachToDo}>
        {children}
      </setTodosContext.Provider>
    </todosContext.Provider>
  );
};

export default ToDosPovider;

export const useToDos = () => useContext(todosContext);
export const useToDosActions = () => useContext(setTodosContext);
