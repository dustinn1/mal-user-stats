type pageInfo = {
  id: string;
  name: string;
  chart: {
    type: "line" | "bar" | "pie";
  };
};

export const statsPages: pageInfo[] = [
  {
    id: "episodes_counts",
    name: "Episodes Counts",
    chart: {
      type: "bar",
    },
  },
  {
    id: "formats",
    name: "Formats",
    chart: {
      type: "bar",
    },
  },
  {
    id: "release_years",
    name: "Release Years",
    chart: {
      type: "line",
    },
  },
  {
    id: "scores",
    name: "Scores",
    chart: {
      type: "bar",
    },
  },
  {
    id: "statuses",
    name: "Statuses",
    chart: {
      type: "bar",
    },
  },
  {
    id: "watch_years",
    name: "Watch Years",
    chart: {
      type: "line",
    },
  },
  {
    id: "genres",
    name: "Genres",
    chart: {
      type: "bar",
    },
  },
  {
    id: "studios",
    name: "Studios",
    chart: {
      type: "bar",
    },
  },
];
