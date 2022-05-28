import type { AnimeListObject } from "../../interfaces/fetchList";
import round from "lodash/round";

interface OverviewObject {
  total_anime: number;
  watched_readed: number;
  length: number;
  mean_score: number;
  standard_deviation: number;
}

export function overviewStats(animeList: AnimeListObject[]): OverviewObject {
  const animesWithScores = animeList.filter((anime) => anime.list_status.score);
  return {
    total_anime: animeList.length,
    watched_readed: animeList.reduce(
      (val, anime) => val + anime.list_status.num_episodes_watched,
      0
    ),
    length: animeList.reduce((val, anime) => val + anime.list_status.length, 0),
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
