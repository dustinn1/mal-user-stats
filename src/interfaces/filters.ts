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
};
