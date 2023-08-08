import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { v4 as uuid } from "uuid";

const todosContext = createContext();
const setTodosContext = createContext();
const alltodosContext = createContext();
const categoryContext = createContext();
const setCategoryContext = createContext();

const getAllTodosFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("todos"));
const setAllTodosToLocalStorage = (all) =>
  localStorage.setItem("todos", JSON.stringify(all));
const getAllCategoryFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("category"));
const setAllCategoryToLocalStorage = (all) =>
  localStorage.setItem("category", JSON.stringify(all));

const ToDosPovider = ({ children }) => {
  const [alltodos, setAllTodos] = useState([]);
  const [category, setCategory] = useState([
    { value: "All", label: "All" },
    { value: "Inbox", label: "Inbox" },
  ]);
  const [selected, setSelected] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filter = function (arr, str, cat) {
    const step1 = arr.filter((obj) => {
      if (str === "complete") return obj.complete === true;
      else if (str === "incomplete") return obj.complete === false;
      else return arr;
    });
    return step1.filter((obj) => {
      if (cat === "All") return arr;
      return obj.category === cat;
    });
  };

  useEffect(() => {
    setAllTodos(getAllTodosFromLocalStorage());
    dispachToDo({ type: "update" });
    console.log("get todos on mount");
    setCategory(getAllCategoryFromLocalStorage());
  }, []);

  const Reduce = (state, action) => {
    if (action.type === "update")
      return filter(alltodos, selected, selectedCategory);

    if (action.type === "add") {
      const updated = [
        ...alltodos,
        {
          id: uuid().slice(0, 8),
          title: action.title,
          complete: false,
          edit: false,
          category: action.category,
        },
      ];
      setAllTodos(updated);
      setAllTodosToLocalStorage(updated);
      return filter(updated, selected, selectedCategory);
    }

    if (action.type === "delete") {
      const updated = alltodos.filter((obj) => obj.id !== action.id);
      setAllTodos(updated);
      setAllTodosToLocalStorage(updated);
      return filter(updated, selected, selectedCategory);
    }

    if (action.type === "category") {
      setSelectedCategory(action.value);
      return filter(alltodos, selected, action.value);
    }

    if (action.type === "filter") {
      setSelected(action.value);
      return filter(alltodos, action.value, selectedCategory);
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
    return filter(todosCopy, selected, selectedCategory);
  };

  const [todos, dispachToDo] = useReducer(Reduce, alltodos);

  return (
    <todosContext.Provider value={todos}>
      <setTodosContext.Provider value={dispachToDo}>
        <alltodosContext.Provider value={alltodos}>
          <categoryContext.Provider value={category}>
            <setCategoryContext.Provider value={setCategory}>
              {children}
            </setCategoryContext.Provider>
          </categoryContext.Provider>
        </alltodosContext.Provider>
      </setTodosContext.Provider>
    </todosContext.Provider>
  );
};

export default ToDosPovider;

export const useToDos = () => useContext(todosContext);
export const useToDosActions = () => useContext(setTodosContext);

export const useAllToDos = () => useContext(alltodosContext);

export const useCategory = () => useContext(categoryContext);
export const useCategoryActions = () => {
  const setCategory = useContext(setCategoryContext);
  const category = useCategory();

  const addCategory = (value) => {
    const updatedcat = [...category, { value, label: value }];
    setCategory(updatedcat);
    setAllCategoryToLocalStorage(updatedcat);
  };

  return { addCategory };
};
