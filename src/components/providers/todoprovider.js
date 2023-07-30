import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

const todosContext = createContext();
const setTodosContext = createContext();

const ToDosPovider = ({ children }) => {
  const [todos, setToDos] = useState([]);

  return (
    <todosContext.Provider value={todos}>
      <setTodosContext.Provider value={setToDos}>
        {children}
      </setTodosContext.Provider>
    </todosContext.Provider>
  );
};

export default ToDosPovider;

export const useToDos = () => useContext(todosContext);
export const useToDosActions = () => {
  const todos = useToDos();
  const setToDos = useContext(setTodosContext);

  const addToDo = (todoText) => {
    setToDos([
      ...todos,
      { id: uuid().slice(0, 8), title: todoText, complete: false },
    ]);
    console.log(todos);
  };

  return { addToDo };
};
