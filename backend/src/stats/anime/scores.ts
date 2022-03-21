import type { AnimeListObject } from "../../interfaces/fetchList";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

interface ScoreObject {
  score: number;
  count: number;
  time_watched: number;
  mean_score: number;
  animes: number[];
}

export function scoresStats(animeList: AnimeListObject[]): ScoreObject[] {
  const stats: ScoreObject[] = [];
  for (let i = 0; i <= 10; i++) {
    const scoreStat: ScoreObject = {
      score: i,
      count: 0,
      time_watched: 0,
      mean_score: 0,
      animes: [],
    };
    const animes = animeList.filter((anime) => anime.list_status.score === i);
    if (animes.length === 0) {
      continue;
    }
    // count
    scoreStat.count = animes.length;
    // time watched
    scoreStat.time_watched = animes.reduce(
      (val, anime) => val + anime.list_status.time_watched,
      0
    );
    // mean score
    const watchedFiltered = animes.filter((anime) => anime.list_status.score);
    const meanScore = round(
      watchedFiltered.reduce((val, anime) => val + anime.list_status.score, 0) /
        watchedFiltered.length,
      2
    );
    if (!Number.isNaN(meanScore)) scoreStat.mean_score = meanScore;
    // all animes with score
    orderBy(animes, "node.title", "asc").map((anime) =>
      scoreStat.animes.push(anime.node.id)
    );
    stats.push(scoreStat);
  }
  return stats;
}
