import { Dispatch, SetStateAction } from "react";
import { AnimeManga } from "./stats";

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
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
};
