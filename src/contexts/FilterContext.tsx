import { createContext } from "react";
import { Filters } from "../interfaces/filters";

type Filter = {
  addFilter(
    category: "genres" | "studios" | "statuses" | "formats",
    action: "includes" | "excludes",
    value: string
  ): void;
  removeFilter(
    category: "genres" | "studios" | "statuses" | "formats",
    action: "includes" | "excludes",
    value: string
  ): void;
  filters: Filters;
};

export const FilterContext = createContext({} as Filter);
