import { useState } from "react";
import { Manga } from "../../interfaces/stats";
import {
  Filter,
  FilterCategoriesManga,
  FilterHookExports,
  FilterTypes,
  FilterInputValuesManga,
} from "../../interfaces/filters";
import { filterList } from "./fitlerList/manga";
import { getMin, getMax } from "./minMax";

export function useListFilter(
  initialList: Manga[]
): FilterHookExports<"manga"> {
  const [filteredList, setFilteredList] = useState(initialList);
  const [filters, setFilters] = useState<Filter<"manga">[]>([]);
  const [sort, setSort] = useState("title");

  const InputValuesEmpty: FilterInputValuesManga = {
    search: "",
    score: [0, 10],
    chapters_count: [0, 10],
    volumes_count: [0, 10],
    release_year: [0, 10],
    start_year: [0, 10],
  };

  const [inputValues, setInputValues] =
    useState<FilterInputValuesManga>(InputValuesEmpty);

  function addFilter(
    category: FilterCategoriesManga,
    type: FilterTypes,
    value: string
  ) {
    let index: number;
    let updatedFilter: Filter<"manga">[] = filters;
    if (type === "range" || type === "search") {
      index = filters.findIndex((filter) => filter.category === category);
    } else {
      index = filters.findIndex(
        (filter) =>
          filter.category === category &&
          filter.type === type &&
          filter.value === value
      );
    }
    if (index > -1) {
      updatedFilter[index] = { category, type, value };
    } else {
      updatedFilter = [...filters, { category, type, value }];
    }
    setFilters(updatedFilter);
    setFilteredList(filterList(initialList, updatedFilter));
  }

  function removeFilter(
    category: FilterCategoriesManga,
    type?: FilterTypes,
    value?: string
  ) {
    const updatedFilter = filters;
    let index: number;
    if (type !== undefined || value !== undefined) {
      index = updatedFilter.findIndex(
        (filter) =>
          filter.category === category &&
          filter.type === type &&
          filter.value === value
      );
    } else {
      index = updatedFilter.findIndex((filter) => filter.category === category);
    }
    if (index > -1) {
      updatedFilter.splice(index, 1);
    }
    if (
      category === "search" ||
      category === "score" ||
      category === "chapters_count" ||
      category === "volumes_count" ||
      category === "release_year" ||
      category === "start_year"
    ) {
      updateInputValues(
        category,
        category === "search" ? "" : JSON.stringify(InputValuesEmpty[category])
      );
    }
    setFilters(updatedFilter);
    setFilteredList(filterList(initialList, updatedFilter));
  }

  function clearFilters() {
    setFilters([]);
    setFilteredList(initialList);
    setInputValues(InputValuesEmpty);
  }

  function updateInputValues(
    category: keyof FilterInputValuesManga,
    value: string
  ) {
    const newValues = inputValues;
    newValues[category] = category === "search" ? value : JSON.parse(value);
    setInputValues(newValues);
  }

  return {
    filteredList,
    addFilter,
    removeFilter,
    clearFilters,
    filters,
    inputValues,
    updateInputValues,
    sort,
    setSort,
  };
}
