import { Reducer, useReducer, useState } from "react";
import { AnimeManga } from "../../interfaces/stats";
import {
  Filter,
  FilterCategories,
  FilterHookExports,
  FilterTypes,
  FilterRanges,
} from "../../interfaces/filters";
import { filterList } from "./filterList";
import { getRange } from "../../utils/getRange";

export function useListFilter(initialList: AnimeManga[]): FilterHookExports {
  const [filteredList, setFilteredList] = useState(initialList);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [sort, setSort] = useState("title");
  const [searchInput, setSearchInput] = useState("");

  const initialRanges: FilterRanges = {
    score: [0, 10],
    count: getRange(initialList, "count"),
    release_year: getRange(initialList, "release_year"),
    start_year: getRange(initialList, "start_year"),
  };

  const [ranges, setRanges] = useReducer<
    Reducer<FilterRanges, Partial<FilterRanges>>
  >((state, newState) => ({ ...state, ...newState }), initialRanges);

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
    if (category === "search") {
      setSearchInput("");
    }
    if (type === "range") {
      setRanges({ [category]: [0, 10] });
    }
    setFilters(updatedFilter);
    setFilteredList(filterList(initialList, updatedFilter));
  }

  function clearFilters() {
    setFilters([]);
    setFilteredList(initialList);
    setRanges(initialRanges);
  }

  return {
    filteredList,
    addFilter,
    removeFilter,
    clearFilters,
    filters,
    searchInput,
    setSearchInput,
    sort,
    setSort,
    ranges,
    setRanges,
    initialRanges,
  };
}
