export interface StatArray {
  id: string | number;
  name: string;
  count: number;
  mean_score: number;
  length: number;
  titles: number[];
}

export interface AnimeStats {
  overview: {
    total_anime: number;
    episodes_watched: number;
    length: number;
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
  animes: { [k: string]: Anime };
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

export interface MangaStats {
  chapters_counts: StatArray[];
  volumes_counts: StatArray[];
  formats: StatArray[];
  release_years: StatArray[];
  scores: StatArray[];
  statuses: StatArray[];
  start_years: StatArray[];
  genres: StatArray[];
  authors: StatArray[];
  mangas: { [k: string]: Manga };
}

export interface Manga {
  id: number;
  title: string;
  title_en: string;
  title_ja: string;
  image_url_id: string;
  genres: string[];
  authors: string[];
  chapters_count: number;
  volumes_count: number;
  format: { id: string; name: string };
  release_year: number | undefined;
  start_year: number | undefined;
  score: number;
  status: { id: string; name: string };
}
