import Select from "react-select";
import { useState } from "react";
import { useToDosActions } from "../providers/todoprovider";

const Filter = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispachToDo = useToDosActions();

  const options = [
    { value: "all", label: "All" },
    { value: "complete", label: "Complete" },
    { value: "incomplete", label: "Incomplete" },
  ];

  const filterHandler = (sel) => {
    dispachToDo({ type: "filter", value: sel.value });
    setSelectedOption(sel);
  };

  return (
    <section className="filterSection">
      <div className="filter__select">
        <p>Filter By : </p>
        <Select
          options={options}
          value={selectedOption}
          defaultValue={options[0]}
          onChange={(sel) => filterHandler(sel)}
        />
      </div>
    </section>
  );
};

export default Filter;
