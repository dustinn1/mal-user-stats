import { Dispatch, SetStateAction } from "react";
import { Anime } from "./stats";

export type Filter = {
  category: FilterCategories;
  type: FilterTypes;
  value: string;
};

export type FilterCategories =
  | "genres"
  | "studios"
  | "status"
  | "format"
  | "score"
  | "episodes_count"
  | "release_year"
  | "watch_year"
  | "search";

export type FilterTypes = "include" | "exclude" | "range" | "search";

export type FilterInputValues = {
  search: string;
  score: number[];
  episodes_count: number[];
  release_year: number[];
  watch_year: number[];
};

export type FilterHookExports = {
  filteredList: Anime[];
  addFilter(category: FilterCategories, type: FilterTypes, value: string): void;
  removeFilter(
    category: FilterCategories,
    type?: FilterTypes,
    value?: string
  ): void;
  clearFilters(): void;
  filters: Filter[];
  inputValues: FilterInputValues;
  updateInputValues(category: keyof FilterInputValues, value: string): void;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
};
