import ToDosPovider from "./components/providers/todoprovider";
import "./App.css";
import ToDoApp from "./components/todoapp/todoapp";
import Header from "./components/header/header";
import Filter from "./components/filter/filter";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content container">
        <ToDosPovider>
          <ToDoApp />
          <Filter />
        </ToDosPovider>
      </div>
    </div>
  );
}

export default App;
