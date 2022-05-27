import { Dispatch, SetStateAction } from "react";
import { Anime, Manga } from "./stats";

export type Filter<T extends "anime" | "manga"> = {
  category: T extends "anime" ? FilterCategoriesAnime : FilterCategoriesManga;
  type: FilterTypes;
  value: string;
};

export type FilterCategoriesAnime =
  | "genres"
  | "studios"
  | "status"
  | "format"
  | "score"
  | "episodes_count"
  | "release_year"
  | "watch_year"
  | "search";

export type FilterCategoriesManga =
  | "genres"
  | "authors"
  | "status"
  | "format"
  | "score"
  | "chapters_count"
  | "volumes_count"
  | "release_year"
  | "start_year"
  | "search";

export type FilterTypes = "include" | "exclude" | "range" | "search";

export type FilterInputValuesAnime = {
  search: string;
  score: number[];
  episodes_count: number[];
  release_year: number[];
  watch_year: number[];
};

export type FilterInputValuesManga = {
  search: string;
  score: number[];
  chapters_count: number[];
  volumes_count: number[];
  release_year: number[];
  start_year: number[];
};

export type FilterHookExports<T extends "anime" | "manga"> = {
  filteredList: T extends "anime" ? Anime[] : Manga[];
  addFilter(
    category: T extends "anime" ? FilterCategoriesAnime : FilterCategoriesManga,
    type: FilterTypes,
    value: string
  ): void;
  removeFilter(
    category: T extends "anime" ? FilterCategoriesAnime : FilterCategoriesManga,
    type?: FilterTypes,
    value?: string
  ): void;
  clearFilters(): void;
  filters: Filter<T>[];
  inputValues: T extends "anime"
    ? FilterInputValuesAnime
    : FilterInputValuesManga;
  updateInputValues(
    category: keyof (T extends "anime"
      ? FilterInputValuesAnime
      : FilterInputValuesManga),
    value: string
  ): void;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
};
