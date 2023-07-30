import { useToDos } from "../providers/todoprovider";
import ToDo from "../todo/todo";
import "./todolist.css";

const ToDoList = () => {
  const todos = useToDos();

  const renderToDoList = () => {
    if (!todos.length) return <p style={{textAlign:"center"}}>empty</p>;
    return todos.map((todo, index) => {
      return <ToDo todo={todo} key={index} />;
    });
  };

  return <div className="toDoList">{renderToDoList()}</div>;
};

export default ToDoList;
