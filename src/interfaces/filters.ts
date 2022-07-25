import { Dispatch, SetStateAction } from "react";
import type { AnimeManga, StatArraysOnly } from "./stats";

export type Filter = {
  category: FilterCategories;
  type: FilterTypes;
  value: string;
};

export type FilterCategories =
  | "genres"
  | "creators"
  | "format"
  | "status"
  | "release_year"
  | "start_year"
  | "score"
  | "count"
  | "search";

export type FilterTypes = "include" | "exclude" | "range" | "search";

export type FilterRanges = {
  score: number[];
  count: number[];
  release_year: number[];
  start_year: number[];
};

export type FilterHookExports = {
  filteredList: AnimeManga[];
  addFilter(category: FilterCategories, type: FilterTypes, value: string): void;
  removeFilter(
    category: FilterCategories,
    type?: FilterTypes,
    value?: string
  ): void;
  clearFilters(): void;
  filters: Filter[];
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  ranges: FilterRanges;
  setRanges: Dispatch<Partial<FilterRanges>>;
  initialRanges: FilterRanges;
};
