import { useState } from "react";
import { Anime } from "../../interfaces/stats";
import {
  Filter,
  FilterCategories,
  FilterHookExports,
  FilterTypes,
  FilterInputValues,
} from "../../interfaces/filters";
import { filterList } from "./filterList";
import { getMin, getMax } from "./minMax";

export function useListFilter(initialList: Anime[]): FilterHookExports {
  const [filteredList, setFilteredList] = useState(initialList);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [sort, setSort] = useState("title");

  const InputValuesEmpty: FilterInputValues = {
    search: "",
    score: [0, 10],
    episodes_count: [
      getMin(initialList, "episodes_count"),
      getMax(initialList, "episodes_count"),
    ],
    release_year: [
      getMin(initialList, "release_year"),
      getMax(initialList, "release_year"),
    ],
    watch_year: [
      getMin(initialList, "watch_year"),
      getMax(initialList, "watch_year"),
    ],
  };

  console.log(InputValuesEmpty);
  const [inputValues, setInputValues] =
    useState<FilterInputValues>(InputValuesEmpty);

  function addFilter(
    category: FilterCategories,
    type: FilterTypes,
    value: string
  ) {
    let index: number;
    let updatedFilter: Filter[] = filters;
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
    category: FilterCategories,
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
      category === "episodes_count" ||
      category === "release_year" ||
      category === "watch_year"
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

  function updateInputValues(category: keyof FilterInputValues, value: string) {
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
