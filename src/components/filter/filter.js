import Select from "react-select";
import { useState } from "react";
import {
  useAllToDos,
  useCategory,
  useCategoryActions,
  useToDosActions,
} from "../providers/todoprovider";

const options = [
  { value: "all", label: "All" },
  { value: "complete", label: "Complete" },
  { value: "incomplete", label: "Incomplete" },
];

const Filter = () => {
  const [selectedOption, setSelectedOption] = useState({
    value: "all",
    label: "All",
  });
  const dispachToDo = useToDosActions();
  const alltodos = useAllToDos();
  const categorys = useCategory();
  const [categoryInput, setCategoryInput] = useState("");
  const { addCategory } = useCategoryActions();
  const [selectedCategory, setSelectedCategory] = useState(categorys[0]);

  const filterHandler = (sel) => {
    dispachToDo({ type: "filter", value: sel.value });
    setSelectedOption(sel);
  };

  const selectCategoryHandler = (sel) => {
    dispachToDo({ type: "category", value: sel.value });
    setSelectedCategory(sel);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(categoryInput);
    if (!categoryInput) {
      alert("input is empty");
      return;
    }
    addCategory(categoryInput);
    setCategoryInput("");
  };

  const x = alltodos.filter((obj) => {
    if (selectedCategory.value === "All") return alltodos;
    return obj.category === selectedCategory.value;
  });
  let y = x.length;
  let z = x.filter((obj) => obj.complete === true).length;

  return (
    <section className="filterSection">
      <div className="filter__header">
        <h1>{selectedCategory.value}</h1>
        <div>
          <span>{y}</span>
          <span>{z}</span>
          <span>{y - z}</span>
        </div>
      </div>
      <div className="filter__select">
        <p>Filter By : </p>
        <Select
          options={options}
          value={selectedOption}
          onChange={(sel) => filterHandler(sel)}
        />
      </div>
      <div className="filter__category">
        <p>Category : </p>
        <Select
          options={categorys}
          value={selectedCategory}
          onChange={(sel) => selectCategoryHandler(sel)}
        />
      </div>
      <div className="filter__addCategory">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="New Category"
            value={categoryInput}
            onChange={({ target }) => setCategoryInput(target.value)}
          />
          <button type="submit">Add Category</button>
        </form>
      </div>
    </section>
  );
};

export default Filter;
