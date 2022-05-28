export interface StatArray {
  id: string | number;
  name: string;
  count: number;
  mean_score: number;
  length: number;
  titles: number[];
}
export interface Stats {
  overview: {
    total_anime: number;
    watched_readed: number;
    length: number;
    mean_score: number;
    standard_deviation: number;
  };
  counts: StatArray[];
  genres: StatArray[];
  creators: StatArray[];
  formats: StatArray[];
  statuses: StatArray[];
  release_years: StatArray[];
  start_years: StatArray[];
  scores: StatArray[];
  titles: { [k: string]: AnimeManga };
}

export interface AnimeManga {
  id: number;
  title: string;
  title_en: string;
  title_ja: string;
  image_url_id: string;
  genres: string[];
  creators: string[];
  format: { id: string; name: string };
  status: { id: string; name: string };
  release_year: number | undefined;
  start_year: number | undefined;
  score: number;
  count: number;
}
