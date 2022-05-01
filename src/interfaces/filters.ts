export type Filter = {
  category: FilterCategories;
  type: FilterTypes;
  value: string;
};

export type FilterCategories = "genres" | "studios" | "status" | "format";

export type FilterTypes = "include" | "exclude";
