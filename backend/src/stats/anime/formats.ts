import type { AnimeListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/animeStats";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

const formats = [
  {
    id: "tv",
    name: "TV",
  },
  {
    id: "ova",
    name: "OVA",
  },
  {
    id: "movie",
    name: "Movie",
  },
  {
    id: "special",
    name: "Special",
  },
  {
    id: "ona",
    name: "ONA",
  },
  {
    id: "music",
    name: "Music",
  },
];

export function formatsStats(animeList: AnimeListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  for (const format of formats) {
    const formatStat: StatArray = {
      id: format.id,
      name: format.name,
      count: 0,
      time_watched: 0,
      mean_score: 0,
      animes: [],
    };
    const animes = animeList.filter(
      (anime) => anime.node.media_type == format.id
    );
    if (animes.length === 0) {
      continue;
    }
    // count
    formatStat.count = animes.length;
    // time watched
    formatStat.time_watched = animes.reduce(
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
    if (!Number.isNaN(meanScore)) formatStat.mean_score = meanScore;
    // all animes with format
    orderBy(animes, "node.title", "asc").map((anime) =>
      formatStat.animes.push(anime.node.id)
    );
    stats.push(formatStat);
  }
  return stats;
}
