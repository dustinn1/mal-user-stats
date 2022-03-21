export interface AnimeStats {
  overview: {
    total_anime: number;
    episodes_watched: number;
    time_watched: number;
    mean_score: number;
    standard_deviation: number;
  };
  episodes_counts: StatArray[];
  formats: StatArray[];
  release_years: StatArray[];
  scores: StatArray[];
  statuses: StatArray[];
  watch_years: StatArray[];
  genres: StatArray[];
  studios: StatArray[];
  animes: {
    id: number;
    title: string;
    image_url_id: string;
    title_en: string;
    title_ja: string;
  }[];
}

export interface StatArray {
  id: string | number;
  name: string;
  count: number;
  mean_score: number;
  time_watched: number;
  animes: number[];
}

export type StatArraysOnly = Omit<AnimeStats, "overview" | "animes">;
