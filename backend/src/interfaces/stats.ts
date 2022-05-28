export interface StatArray {
  id: string | number;
  name: string;
  count: number;
  mean_score: number;
  length: number;
  titles: number[];
}
interface CommonStats {
  genres: StatArray[];
  creators: StatArray[];
  formats: StatArray[];
  statuses: StatArray[];
  release_years: StatArray[];
  start_years: StatArray[];
  scores: StatArray[];
}

export interface AnimeStats extends CommonStats {
  overview: {
    total_anime: number;
    episodes_watched: number;
    length: number;
    mean_score: number;
    standard_deviation: number;
  };
  episodes_counts: StatArray[];
  animes: { [k: string]: Anime };
}

export interface MangaStats extends CommonStats {
  chapters_counts: StatArray[];
  volumes_counts: StatArray[];
  release_years: StatArray[];
  mangas: { [k: string]: Manga };
}

export interface CommonAnimeMangaStats {
  genres: string[];
  creators: string[];
  format: { id: string; name: string };
  status: { id: string; name: string };
  release_year: number | undefined;
  start_year: number | undefined;
  score: number;
  count: number;
}

export interface Anime extends CommonAnimeMangaStats {
  id: number;
  title: string;
  title_en: string;
  title_ja: string;
  image_url_id: string;
}

export interface Manga extends CommonAnimeMangaStats {
  id: number;
  title: string;
  title_en: string;
  title_ja: string;
  image_url_id: string;
  volumes_count: number;
}
