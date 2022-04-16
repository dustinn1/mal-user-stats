import { useState, useEffect } from "react";
import { Anime } from "../interfaces/stats";

type Filters = {
  genres: {
    includes: string[];
    excludes: string[];
  };
  studios: {
    includes: string[];
    excludes: string[];
  };
  statuses: {
    includes: string[];
    excludes: string[];
  };
  formats: {
    includes: string[];
    excludes: string[];
  };
};

function filtersMatch(anime: Anime, filters: Filters): boolean {
  if (filters.genres.excludes.length > 0) {
    if (filters.genres.excludes.some((genre) => anime.genres.includes(genre))) {
      return false;
    }
  }
  if (filters.genres.includes.length > 0) {
    if (
      !filters.genres.includes.every((genre) => anime.genres.includes(genre))
    ) {
      return false;
    }
  }
  if (filters.studios.excludes.length > 0) {
    if (
      filters.studios.excludes.some((studio) => anime.studios.includes(studio))
    ) {
      return false;
    }
  }
  if (filters.studios.includes.length > 0) {
    if (
      !filters.studios.includes.every((studio) =>
        anime.studios.includes(studio)
      )
    ) {
      return false;
    }
  }
  if (filters.statuses.excludes.length > 0) {
    if (
      filters.statuses.excludes.some((status) => status === anime.status.name)
    ) {
      return false;
    }
  }
  if (filters.statuses.includes.length > 0) {
    if (
      !filters.statuses.includes.every((status) => status === anime.status.name)
    ) {
      return false;
    }
  }
  if (filters.formats.excludes.length > 0) {
    if (
      filters.formats.excludes.some((format) => format === anime.format.name)
    ) {
      return false;
    }
  }
  if (filters.formats.includes.length > 0) {
    if (
      !filters.formats.includes.every((format) => format === anime.format.name)
    ) {
      return false;
    }
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
    category: "genres" | "studios",
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

  function clearFilters() {
    setFilters(emptyFilters);
    setFilteredList(initialList);
  }

  return {
    filteredList,
    length,
    addFilter,
    clearFilters,
    filters,
  };
}
