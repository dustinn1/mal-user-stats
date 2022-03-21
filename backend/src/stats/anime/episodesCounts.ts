import type { AnimeListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/animeStats";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

const lengths = [
  { min: 0, max: 0, id: "unknown", name: "Unknown" },
  { min: 1, max: 1, id: "1", name: "1" },
  { min: 2, max: 6, id: "2_6", name: "2-6" },
  { min: 7, max: 16, id: "7_16", name: "7-16" },
  { min: 17, max: 28, id: "17_28", name: "17-28" },
  { min: 29, max: 55, id: "29_55", name: "29-55" },
  { min: 56, max: 100, id: "56_100", name: "56-100" },
  { min: 101, max: 10000, id: "100_+", name: "101+" },
];

export function episodesCountsStats(animeList: AnimeListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  for (const length of lengths) {
    const lengthStat: StatArray = {
      id: length.id,
      name: length.name,
      count: 0,
      time_watched: 0,
      mean_score: 0,
      animes: [],
    };
    const animes = animeList.filter(
      (anime) =>
        anime.node.num_episodes >= length.min &&
        anime.node.num_episodes <= length.max
    );
    if (animes.length === 0) {
      continue;
    }
    // count
    lengthStat.count = animes.length;
    // time watched
    lengthStat.time_watched = animes.reduce(
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
    if (!Number.isNaN(meanScore)) lengthStat.mean_score = meanScore;
    // all animes with episode count
    orderBy(animes, "node.title", "asc").map((anime) =>
      lengthStat.animes.push(anime.node.id)
    );
    stats.push(lengthStat);
  }
  return stats;
}
