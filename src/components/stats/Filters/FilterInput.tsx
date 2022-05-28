import { useContext, useState } from "react";
import { FilterContext } from "../../../contexts/FilterContext";
import { DebounceInput } from "react-debounce-input";

export default function FilterInput() {
  const { searchInput, setSearchInput, addFilter, removeFilter } =
    useContext(FilterContext);

  return (
    <DebounceInput
      type="search"
      id="search"
      name="search"
      placeholder="Search"
      autoComplete="off"
      className="h-full w-full appearance-none rounded-md border border-gray-400 bg-white px-3 outline-0 duration-100 ease-linear focus:border-blue-900 focus:transition-colors"
      debounceTimeout={300}
      value={searchInput}
      onChange={(event) => {
        const input = event.target.value;
        setSearchInput(input);
        if (input !== "") {
          addFilter("search", "search", input);
        } else {
          removeFilter("search");
        }
      }}
    />
  );
}
