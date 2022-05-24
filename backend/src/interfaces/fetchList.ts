export interface AnimeListObject {
  node: {
    id: number;
    title: string;
    main_picture?: {
      medium: string;
      large: string;
    };
    alternative_titles?: {
      synonyms: string[];
      en: string;
      ja: string;
    };
    start_date?: string;
    end_date?: string;
    mean?: number;
    genres?: {
      id: number;
      name: string;
    }[];
    media_type:
      | "unknown"
      | "tv"
      | "ova"
      | "movie"
      | "special"
      | "ona"
      | "music";
    status: "currently_airing" | "finished_airing" | "not_yet_aired";
    num_episodes: number;
    start_season?: {
      year: number;
      season: "fall" | "winter" | "spring" | "summer";
    };
    broadcast?: {
      day_of_the_week: string;
      start_time?: string;
    };
    source?: string;
    average_episode_duration?: number;
    studios?: {
      id: number;
      name: string;
    }[];
    image_url_id: string;
    title_en: string;
    title_ja: string;
  };
  list_status: {
    status: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
    score: number;
    num_episodes_watched: number;
    is_rewatching: boolean;
    updated_at: string;
    start_date?: string;
    finish_date?: string;
    num_times_rewatched: number;
    time_watched: number;
  };
}

export interface MangaListObject {
  node: {
    id: number;
    title: string;
    main_picture?: {
      medium: string;
      large: string;
    };
    alternative_titles?: {
      synonyms: string[];
      en: string;
      ja: string;
    };
    start_date?: string;
    end_date?: string;
    mean?: number;
    genres?: {
      id: number;
      name: string;
    }[];
    media_type:
      | "unknown"
      | "manga"
      | "light_novel"
      | "novel"
      | "one_shot"
      | "doujinshi"
      | "manhwa"
      | "manhua"
      | "oel";
    status: "currently_publishing" | "finished" | "not_yet_published";
    num_volumes: number;
    num_chapters: number;
    authors?: {
      node: {
        id: number;
        first_name: string;
        last_name: string;
      };
      role: string;
    }[];
    image_url_id: string;
    title_en: string;
    title_ja: string;
  };
  list_status: {
    status: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
    score: number;
    num_volumes_read: number;
    num_chapters_read: number;
    is_rereading: boolean;
    updated_at: string;
    start_date?: string;
    finish_date?: string;
    num_times_reread: number;
  };
}

export type FetchType<T> = T extends "anime"
  ? AnimeListObject[]
  : MangaListObject[];
