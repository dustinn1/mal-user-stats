export interface Stats {
  overview: Overview;
  episodes_counts: EpisodesCount[];
  formats: Format[];
  release_years: ReleaseYear[];
  scores: Score[];
  statues: Status[];
  watch_years: WatchYear[];
  genres: Genre[];
  studios: Studio[];
  animes: Anime[];
}

export interface Overview {
  total_anime: number;
  episodes_watched: number;
  time_watched: number;
  mean_score: number;
  standard_deviation: number;
}

export interface EpisodesCount {
  length: string;
  count: number;
  time_watched: number;
  mean_score: number;
}

export interface Format {
  format: string;
  count: number;
  time_watched: number;
  mean_score: number;
}

export interface ReleaseYear {
  year: number;
  count: number;
  time_watched: number;
  mean_score: number;
}

export interface Score {
  score: number;
  count: number;
  time_watched: number;
  mean_score: number;
}

export interface Status {
  status: string;
  count: number;
  time_watched: number;
  mean_score: number;
}

export interface WatchYear {
  year: number;
  count: number;
  time_watched: number;
  mean_score: number;
}

export interface Genre {
  id: number;
  name: string;
  count: number;
  mean_score: number;
  time_watched: number;
  animes: number[];
}

export interface Studio {
  id: number;
  name: string;
  count: number;
  mean_score: number;
  time_watched: number;
  animes: number[];
}
export interface Anime {
  id: number;
  title: string;
  image_url_id: string;
  title_en: string;
  title_ja: string;
}
