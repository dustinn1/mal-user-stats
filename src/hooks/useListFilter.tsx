import { useState, useEffect } from "react";
import { Anime } from "../interfaces/stats";
import { Filters } from "../interfaces/filters";

function filtersMatch(anime: Anime, filters: Filters): boolean {
  if (filters.genres.excludes.length > 0) {
    return !filters.genres.excludes.some((genre) =>
      anime.genres.includes(genre)
    );
  }
  if (filters.genres.includes.length > 0) {
    return filters.genres.includes.every((genre) =>
      anime.genres.includes(genre)
    );
  }
  if (filters.studios.excludes.length > 0) {
    return !filters.studios.excludes.some((studio) =>
      anime.studios.includes(studio)
    );
  }
  if (filters.studios.includes.length > 0) {
    return filters.studios.includes.every((studio) =>
      anime.studios.includes(studio)
    );
  }
  if (filters.statuses.excludes.length > 0) {
    return !filters.statuses.excludes.some(
      (status) => status === anime.status.name
    );
  }
  if (filters.statuses.includes.length > 0) {
    return filters.statuses.includes.every(
      (status) => status === anime.status.name
    );
  }
  if (filters.formats.excludes.length > 0) {
    return !filters.formats.excludes.some(
      (format) => format === anime.format.name
    );
  }
  if (filters.formats.includes.length > 0) {
    return filters.formats.includes.every(
      (format) => format === anime.format.name
    );
  }
  return true;
}

export function useListFilter(initialList: Anime[]): {
  filteredList: Anime[];
  length: number;
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
  clearFilters(): void;
  filters: Filters;
} {
  const emptyFilters: Filters = {
    genres: {
      includes: [],
      excludes: [],
    },
    studios: {
      includes: [],
      excludes: [],
    },
    statuses: {
      includes: [],
      excludes: [],
    },
    formats: {
      includes: [],
      excludes: [],
    },
  };

  const [filteredList, setFilteredList] = useState(initialList);
  const [filters, setFilters] = useState(emptyFilters);
  const [length, setLength] = useState(initialList.length);

  useEffect(() => {
    setLength(filteredList.length);
  }, [filteredList.length]);

  function addFilter(
    category: "genres" | "studios" | "statuses" | "formats",
    action: "includes" | "excludes",
    value: string
  ) {
    const updatedFilter = filters;
    updatedFilter[category][action].push(value);
    setFilters(updatedFilter);
    setFilteredList(
      initialList.filter((anime) => filtersMatch(anime, filters))
    );
  }

  function removeFilter(
    category: "genres" | "studios" | "statuses" | "formats",
    action: "includes" | "excludes",
    value: string
  ) {
    const updatedFilter = filters;
    const index = updatedFilter[category][action].indexOf(value);
    if (index > -1) {
      updatedFilter[category][action].splice(index, 1);
    }
    setFilters(updatedFilter);
    setFilteredList(
      initialList.filter((anime) => filtersMatch(anime, filters))
    );
  }

  function clearFilters() {
    setFilters(emptyFilters);
    setFilteredList(initialList);
  }

  return {
    filteredList,
    length,
    addFilter,
    removeFilter,
    clearFilters,
    filters,
  };
}
