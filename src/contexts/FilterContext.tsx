import { createContext } from "react";
import { Filter, FilterCategories, FilterTypes } from "../interfaces/filters";

type FilterContext = {
  addFilter(category: FilterCategories, type: FilterTypes, value: string): void;
  removeFilter(
    category: FilterCategories,
    type?: FilterTypes,
    value?: string
  ): void;
  updateFilter(
    category: FilterCategories,
    type?: FilterTypes,
    value?: string
  ): void;
  filters: Filter[];
};

export const FilterContext = createContext({} as FilterContext);
