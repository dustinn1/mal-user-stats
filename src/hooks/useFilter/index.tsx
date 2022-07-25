import {
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
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

export function useFilter(
  initialList: AnimeManga[],
  initialSearch?: string
): FilterHookExports {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [sort, setSort] = useState("title");
  const [searchQuery, setSearchQuery] = useState(initialSearch ?? "");

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

  const addFilter = useCallback(
    (category: FilterCategories, type: FilterTypes, value: string) => {
      setFilters((filters) => {
        const index = filters.findIndex((filter) => {
          if (type === "range" || type === "search") {
            return filter.category === category;
          } else {
            return (
              filter.category === category &&
              filter.type === type &&
              filter.value === value
            );
          }
        });
        if (index > -1) {
          filters[index] = { category, type, value };
          return filters;
        } else {
          return [...filters, { category, type, value }];
        }
      });
    },
    []
  );

  const removeFilter = useCallback(
    (category: FilterCategories, type?: FilterTypes, value?: string) => {
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
      setFilters((filters) => {
        if (type || value) {
          return filters.filter(
            (filter) =>
              !(
                filter.category === category &&
                filter.type === type &&
                filter.value === value
              )
          );
        } else {
          return filters.filter((filter) => filter.category !== category);
        }
      });
    },
    [initialRanges]
  );

  const clearFilters = useCallback(() => {
    setFilters([]);
    setRanges(initialRanges);
  }, [initialRanges]);

  useEffect(() => {
    clearFilters();
  }, [clearFilters]);

  useEffect(() => {
    if (searchQuery) {
      addFilter("search", "search", searchQuery);
    } else {
      removeFilter("search");
    }
  }, [addFilter, removeFilter, searchQuery]);

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
