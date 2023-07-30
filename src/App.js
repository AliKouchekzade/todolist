import ToDosPovider from "./components/providers/todoprovider";
import "./App.css";
import ToDoApp from "./components/todoapp/todoapp";
import Header from "./components/header/header";

function App() {
  return (
    <div className="App">
      <Header />
      <ToDosPovider>
        <ToDoApp />
      </ToDosPovider>
    </div>
  );
}

export default App;
