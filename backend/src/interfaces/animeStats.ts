export interface AnimeStats {
  overview: {
    total_anime: number;
    episodes_watched: number;
    time_watched: number;
    mean_score: number;
    standard_deviation: number;
  };
  episodes_counts: AnimeStatArray[];
  formats: AnimeStatArray[];
  release_years: AnimeStatArray[];
  scores: AnimeStatArray[];
  statuses: AnimeStatArray[];
  watch_years: AnimeStatArray[];
  genres: AnimeStatArray[];
  studios: AnimeStatArray[];
  animes: { [k: string]: Anime };
}

export interface AnimeStatArray {
  id: string | number;
  name: string;
  count: number;
  mean_score: number;
  time_watched: number;
  animes: number[];
}

export interface Anime {
  id: number;
  title: string;
  title_en: string;
  title_ja: string;
  image_url_id: string;
  genres: string[];
  studios: string[];
  episodes_count: number;
  format: { id: string; name: string };
  release_year: number | undefined;
  watch_year: number | undefined;
  score: number;
  status: { id: string; name: string };
}
