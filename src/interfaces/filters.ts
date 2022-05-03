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
  | "watch_year";

export type FilterTypes = "include" | "exclude" | "range";
