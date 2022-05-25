export interface MangaStats {
  chapters_counts: MangaStatArray[];
  volumes_counts: MangaStatArray[];
  formats: MangaStatArray[];
  release_years: MangaStatArray[];
  scores: MangaStatArray[];
  statuses: MangaStatArray[];
  start_years: MangaStatArray[];
  genres: MangaStatArray[];
  authors: MangaStatArray[];
}

export interface MangaStatArray {
  id: string | number;
  name: string;
  count: number;
  mean_score: number;
  chapters_read: number;
  mangas: number[];
}

export interface Manga {
  id: number;
  title: string;
  title_en: string;
  title_ja: string;
  image_url_id: string;
  genres: string[];
  authors: {
    name: string;
    role: string;
  };
  chapters_count: number;
  volumes_count: number;
  format: { id: string; name: string };
  release_year: number | undefined;
  watch_year: number | undefined;
  score: number;
  status: { id: string; name: string };
}
