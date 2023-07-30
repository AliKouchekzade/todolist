import ToDoForm from "../todoform/todoform";
import ToDoList from "../todolist/todolist";
import "./todoapp.css";

const ToDoApp = () => {
  return (
    <section className="toDoAppSection container">
      <ToDoForm />
      <ToDoList />
    </section>
  );
};

export default ToDoApp;
