import { Reducer, useMemo, useReducer, useState } from "react";
import type { AnimeManga } from "../../interfaces/stats";
import type {
  Filter,
  FilterCategories,
  FilterHookExports,
  FilterTypes,
  FilterRanges,
} from "../../interfaces/filters";
import { filterList } from "./filterList";
import { getRange } from "../../utils/getRange";

export function useFilter(initialList: AnimeManga[]): FilterHookExports {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [sort, setSort] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = useMemo(() => {
    return filterList(initialList, filters);
  }, [filters, initialList]);

  const initialRanges = useMemo<FilterRanges>(() => {
    return {
      score: [0, 10],
      count: getRange(initialList, "count"),
      release_year: getRange(initialList, "release_year"),
      start_year: getRange(initialList, "start_year"),
    };
  }, [initialList]);

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
  }

  function removeFilter(
    category: FilterCategories,
    type?: FilterTypes,
    value?: string
  ) {
    let updatedFilter: Filter[] = [];
    if (type || value) {
      updatedFilter = filters.filter(
        (filter) =>
          !(
            filter.category === category &&
            filter.type === type &&
            filter.value === value
          )
      );
    } else {
      updatedFilter = filters.filter((filter) => filter.category !== category);
    }
    if (category === "search") {
      setSearchQuery("");
    }
    if (
      category === "score" ||
      category === "count" ||
      category === "release_year" ||
      category === "start_year"
    ) {
      setRanges({ [category]: initialRanges[category] });
    }
    setFilters(updatedFilter);
  }

  function clearFilters() {
    setFilters([]);
    setRanges(initialRanges);
  }

  return {
    filteredList,
    addFilter,
    removeFilter,
    clearFilters,
    filters,
    searchQuery,
    setSearchQuery,
    sort,
    setSort,
    ranges,
    setRanges,
    initialRanges,
  };
}
