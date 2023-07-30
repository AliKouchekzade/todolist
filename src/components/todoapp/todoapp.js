import ToDoForm from "../todoform/todoform";
import ToDoList from "../todolist/todolist";


const ToDoApp = () => {
  return (
    <section className="toDoAppSection">
      <ToDoList />
      <ToDoForm />
    </section>
  );
};

export default ToDoApp;
