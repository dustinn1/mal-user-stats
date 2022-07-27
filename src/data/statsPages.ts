import type { StatArraysOnly } from "../interfaces/stats";

type Pages = {
  [key: string]: {
    name: string;
    key: keyof StatArraysOnly;
    chart: "bar" | "line";
  };
};

const anime: Pages = {
  episodes_counts: {
    name: "Episodes Counts",
    key: "counts",
    chart: "bar",
  },
  genres: {
    name: "Genres",
    key: "genres",
    chart: "bar",
  },
  studios: {
    name: "Studios",
    key: "creators",
    chart: "bar",
  },
  formats: {
    name: "Formats",
    key: "formats",
    chart: "bar",
  },
  statuses: {
    name: "Statuses",
    key: "statuses",
    chart: "bar",
  },
  release_years: {
    name: "Release Years",
    key: "release_years",
    chart: "line",
  },
  start_years: {
    name: "Start Years",
    key: "start_years",
    chart: "line",
  },
  scores: {
    name: "Scores",
    key: "scores",
    chart: "bar",
  },
};

const manga: Pages = {
  chapters_counts: {
    name: "Chapters Counts",
    key: "counts",
    chart: "bar",
  },
  genres: {
    name: "Genres",
    key: "genres",
    chart: "bar",
  },
  authors: {
    name: "Authors",
    key: "creators",
    chart: "bar",
  },
  formats: {
    name: "Formats",
    key: "formats",
    chart: "bar",
  },
  statuses: {
    name: "Statuses",
    key: "statuses",
    chart: "bar",
  },
  release_years: {
    name: "Release Years",
    key: "release_years",
    chart: "line",
  },
  start_years: {
    name: "Start Years",
    key: "start_years",
    chart: "line",
  },
  scores: {
    name: "Scores",
    key: "scores",
    chart: "bar",
  },
};

export const pageInfos = {
  anime,
  manga,
};
