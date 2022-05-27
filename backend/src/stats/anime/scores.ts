import type { AnimeListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function scoresStats(animeList: AnimeListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  for (let i = 0; i <= 10; i++) {
    const scoreStat: StatArray = {
      id: i,
      name: i.toString(),
      count: 0,
      length: 0,
      mean_score: 0,
      titles: [],
    };
    const animes = animeList.filter((anime) => anime.list_status.score === i);
    if (animes.length === 0) {
      continue;
    }
    // count
    scoreStat.count = animes.length;
    // time watched
    scoreStat.length = animes.reduce(
      (val, anime) => val + anime.list_status.length,
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
      scoreStat.titles.push(anime.node.id)
    );
    stats.push(scoreStat);
  }
  return stats;
}
