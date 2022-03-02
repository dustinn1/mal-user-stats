import type { AnimeListObject } from "../../interfaces/fetchList";
import round from "lodash/round";

interface OverviewObject {
  total_anime: number;
  episodes_watched: number;
  time_watched: number;
  mean_score: number;
  standard_deviation: number;
}

export function overviewStats(animeList: AnimeListObject[]): OverviewObject {
  const animesWithScores = animeList.filter((anime) => anime.list_status.score);
  return {
    total_anime: animeList.length,
    episodes_watched: animeList.reduce(
      (val, anime) => val + anime.list_status.num_episodes_watched,
      0
    ),
    time_watched: animeList.reduce(
      (val, anime) => val + anime.list_status.time_watched,
      0
    ),
    mean_score: round(
      animesWithScores.reduce(
        (val, anime) => val + anime.list_status.score,
        0
      ) / animesWithScores.length,
      2
    ),
    standard_deviation: 0,
  };
}
