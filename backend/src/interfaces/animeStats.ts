export interface AnimeStats {
  overview: {
    total_anime: number;
    episodes_watched: number;
    time_watched: number;
    mean_score: number;
    standard_deviation: number;
  };
  episodes_counts: {
    length: string;
    count: number;
    time_watched: number;
    mean_score: number;
  }[];
  formats: {
    format: string;
    count: number;
    time_watched: number;
    mean_score: number;
  }[];
  release_years: {
    year: number;
    count: number;
    time_watched: number;
    mean_score: number;
  }[];
  scores: {
    score: number;
    count: number;
    time_watched: number;
    mean_score: number;
  }[];
  statues: {
    status: string;
    count: number;
    time_watched: number;
    mean_score: number;
  }[];
  watch_years: {
    year: number;
    count: number;
    time_watched: number;
    mean_score: number;
  }[];
  genres: {
    id: number;
    name: string;
    count: number;
    mean_score: number;
    time_watched: number;
    animes: number[];
  }[];
  studios: {
    id: number;
    name: string;
    count: number;
    mean_score: number;
    time_watched: number;
    animes: number[];
  }[];
  animes: {
    id: number;
    title: string;
    image_url_id: string;
    title_en: string;
    title_ja: string;
  }[];
}
