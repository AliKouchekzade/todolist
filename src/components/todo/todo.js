import "./todos.css";

const ToDo = ({ todo }) => {
  return (
    <div className="todo">
      <div className="todo__left">
        <p>{todo.title}</p>
      </div>
      <div className="todo__right">
        <button className="button">edit</button>
        <button className="button">delete</button>
      </div>
    </div>
  );
};

export default ToDo;
