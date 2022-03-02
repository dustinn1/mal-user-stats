import type { AnimeListObject } from "../../interfaces/fetchList";
import round from "lodash/round";

interface EpisodeCountObject {
  length: string;
  count: number;
  time_watched: number;
  mean_score: number;
}

const lengths = [
  { min: 0, max: 0, length: "Unknown" },
  { min: 1, max: 1, length: "1" },
  { min: 2, max: 6, length: "2-6" },
  { min: 7, max: 16, length: "7-16" },
  { min: 17, max: 28, length: "17-28" },
  { min: 29, max: 55, length: "29-55" },
  { min: 56, max: 100, length: "56-100" },
  { min: 101, max: 10000, length: "101+" },
];

export function episodesCountsStats(
  animeList: AnimeListObject[]
): EpisodeCountObject[] {
  const stats: EpisodeCountObject[] = [];
  for (const length of lengths) {
    const lengthStat: EpisodeCountObject = {
      length: length.length,
      count: 0,
      time_watched: 0,
      mean_score: 0,
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
    stats.push(lengthStat);
  }
  return stats;
}
