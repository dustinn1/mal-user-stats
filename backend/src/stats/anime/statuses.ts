import type { AnimeListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/animeStats";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

const statuses = [
  {
    id: "watching",
    name: "Watching",
  },
  {
    id: "completed",
    name: "Completed",
  },
  {
    id: "on_hold",
    name: "On Hold",
  },
  {
    id: "dropped",
    name: "Dropped",
  },
  {
    id: "plan_to_watch",
    name: "Plan To Watch",
  },
];

export function statusesStats(animeList: AnimeListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  for (const status of statuses) {
    const statusStat: StatArray = {
      id: status.id,
      name: status.name,
      count: 0,
      time_watched: 0,
      mean_score: 0,
      animes: [],
    };
    const animes = animeList.filter(
      (anime) => anime.list_status.status == status.id
    );
    if (animes.length === 0) {
      continue;
    }
    // count
    statusStat.count = animes.length;
    // time watched
    statusStat.time_watched = animes.reduce(
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
    if (!Number.isNaN(meanScore)) statusStat.mean_score = meanScore;
    // all animes with status
    orderBy(animes, "node.title", "asc").map((anime) =>
      statusStat.animes.push(anime.node.id)
    );
    stats.push(statusStat);
  }
  return stats;
}
