import type { AnimeListObject } from "../../interfaces/fetchList";
import round from "lodash/round";
import meanBy from "lodash/meanBy";

interface OverviewObject {
  total: number;
  watched_readed: number;
  length: number;
  mean_score: number;
  standard_deviation: number;
}

export function overviewStats(animeList: AnimeListObject[]): OverviewObject {
  const animesWithScores = animeList.filter((anime) => anime.list_status.score);
  const mean_score = round(
    animesWithScores.reduce((val, anime) => val + anime.list_status.score, 0) /
      animesWithScores.length,
    2
  );
  return {
    total: animeList.length,
    watched_readed: animeList.reduce(
      (val, anime) => val + anime.list_status.num_episodes_watched,
      0
    ),
    length: animeList.reduce((val, anime) => val + anime.list_status.length, 0),
    mean_score: mean_score,
    standard_deviation: round(
      Math.sqrt(
        meanBy(animesWithScores, function (n) {
          return Math.pow(n.list_status.score - mean_score, 2);
        })
      ),
      2
    ),
  };
}
