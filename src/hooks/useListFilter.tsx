import { useState } from "react";
import { Anime } from "../interfaces/stats";
import {
  Filter,
  FilterCategories,
  FilterHookExports,
  FilterTypes,
} from "../interfaces/filters";
import Fuse from "fuse.js";

function filterList(animes: Anime[], filters: Filter[]): Anime[] {
  let filteredList = animes;
  for (const filter of filters) {
    if (filter.category !== "search") {
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
        if (
          filter.category === "score" ||
          filter.category === "release_year" ||
          filter.category === "watch_year"
        ) {
          const range = filter.value.split(",");
          return (
            (anime[filter.category] ?? -1) >= parseInt(range[0]) &&
            (anime[filter.category] ?? -1) <= parseInt(range[1])
          );
        }
        return false;
      });
      if (filteredList.length === 0) {
        break;
      }
    } else {
      const fuse = new Fuse(filteredList, {
        keys: ["title"],
        fieldNormWeight: 1,
      });
      filteredList = fuse.search(filter.value).map((result) => result.item);
    }
  }

  return filteredList;
}

export function useListFilter(initialList: Anime[]): FilterHookExports {
  const [filteredList, setFilteredList] = useState(initialList);
  const [filters, setFilters] = useState<Filter[]>([]);

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
    console.log(index, updatedFilter);
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
  };
}
