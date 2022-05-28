import { useState } from "react";
import { AnimeManga } from "../../interfaces/stats";
import {
  Filter,
  FilterCategories,
  FilterHookExports,
  FilterTypes,
} from "../../interfaces/filters";
import { filterList } from "./filterList";

export function useListFilter(initialList: AnimeManga[]): FilterHookExports {
  const [filteredList, setFilteredList] = useState(initialList);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [sort, setSort] = useState("title");
  const [searchInput, setSearchInput] = useState("");

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
    setFilters(updatedFilter);
    setFilteredList(filterList(initialList, updatedFilter));
  }

  function clearFilters() {
    setFilters([]);
    setFilteredList(initialList);
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
  };
}
