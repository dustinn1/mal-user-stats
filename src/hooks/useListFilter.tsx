import { useState, useEffect } from "react";
import { Anime } from "../interfaces/stats";
import { Filter, FilterCategories, FilterTypes } from "../interfaces/filters";

function filterList(animes: Anime[], filters: Filter[]): Anime[] {
  let filteredList = animes;
  for (const filter of filters) {
    filteredList = filteredList.filter((anime) => {
      if (filter.category === "genres" || filter.category === "studios") {
        if (filter.type === "exclude") {
          return !anime[filter.category].includes(filter.value);
        }
        if (filter.type === "include") {
          return anime[filter.category].includes(filter.value);
        }
      }
      if (filter.category === "format" || filter.category === "status") {
        if (filter.type === "exclude") {
          return !(
            anime[filter.category].name.toLowerCase() ===
            filter.value.toLowerCase()
          );
        }
        if (filter.type === "include") {
          return (
            anime[filter.category].name.toLowerCase() ===
            filter.value.toLowerCase()
          );
        }
      }
      return false;
    });
  }
  return filteredList;
}

export function useListFilter(initialList: Anime[]): {
  filteredList: Anime[];
  length: number;
  addFilter(category: FilterCategories, type: FilterTypes, value: string): void;
  removeFilter(
    category: FilterCategories,
    type: FilterTypes,
    value: string
  ): void;
  clearFilters(): void;
  filters: Filter[];
} {
  const [filteredList, setFilteredList] = useState(initialList);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [length, setLength] = useState(initialList.length);

  useEffect(() => {
    setLength(filteredList.length);
  }, [filteredList.length]);

  function addFilter(
    category: FilterCategories,
    type: FilterTypes,
    value: string
  ) {
    const updatedFilter = [...filters, { category, type, value }];
    setFilters(updatedFilter);
    setFilteredList(filterList(initialList, updatedFilter));
  }

  function removeFilter(
    category: FilterCategories,
    type: FilterTypes,
    value: string
  ) {
    const updatedFilter = filters;
    const index = updatedFilter.findIndex(
      (filter) =>
        filter.category === category &&
        filter.type === type &&
        filter.value === value
    );
    if (index > -1) {
      updatedFilter.splice(index, 1);
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
    length,
    addFilter,
    removeFilter,
    clearFilters,
    filters,
  };
}
