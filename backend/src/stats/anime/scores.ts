import type { AnimeListObject } from "../../interfaces/fetchList";
import type { AnimeStatArray } from "../../interfaces/animeStats";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function scoresStats(animeList: AnimeListObject[]): AnimeStatArray[] {
  const stats: AnimeStatArray[] = [];
  for (let i = 0; i <= 10; i++) {
    const scoreStat: AnimeStatArray = {
      id: i,
      name: i.toString(),
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
