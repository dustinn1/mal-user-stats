import { Stats } from "../interfaces/stats";

type pageInfo = {
  id: {
    anime: string;
    manga: string;
  };
  name: {
    anime: string;
    manga: string;
  };
  key: keyof Stats;
  chart: {
    type: "line" | "bar" | "pie";
  };
};

export const statsPages: pageInfo[] = [
  {
    id: {
      anime: "episodes_counts",
      manga: "chapters_counts",
    },
    name: {
      anime: "Episodes Counts",
      manga: "Chapters Counts",
    },
    key: "counts",
    chart: {
      type: "bar",
    },
  },
  {
    id: {
      anime: "genres",
      manga: "genres",
    },
    name: {
      anime: "Genres",
      manga: "Genres",
    },
    key: "genres",
    chart: {
      type: "bar",
    },
  },
  {
    id: {
      anime: "studios",
      manga: "authors",
    },
    name: {
      anime: "Studios",
      manga: "Authors",
    },
    key: "creators",
    chart: {
      type: "bar",
    },
  },
  {
    id: {
      anime: "formats",
      manga: "formats",
    },
    name: {
      anime: "Formats",
      manga: "Formats",
    },
    key: "formats",
    chart: {
      type: "bar",
    },
  },
  {
    id: {
      anime: "statuses",
      manga: "statuses",
    },
    name: {
      anime: "Statuses",
      manga: "Statuses",
    },
    key: "statuses",
    chart: {
      type: "bar",
    },
  },
  {
    id: {
      anime: "release_years",
      manga: "release_years",
    },
    name: {
      anime: "Release Years",
      manga: "Release Years",
    },
    key: "release_years",
    chart: {
      type: "line",
    },
  },
  {
    id: {
      anime: "start_years",
      manga: "start_years",
    },
    name: {
      anime: "Start Years",
      manga: "Start Years",
    },
    key: "start_years",
    chart: {
      type: "line",
    },
  },
  {
    id: {
      anime: "scores",
      manga: "scores",
    },
    name: {
      anime: "Scores",
      manga: "Scores",
    },
    key: "scores",
    chart: {
      type: "bar",
    },
  },
];
