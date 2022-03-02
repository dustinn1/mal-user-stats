import type { AnimeListObject } from "../../interfaces/fetchList";
import round from "lodash/round";

interface StatusObject {
  status: string;
  count: number;
  time_watched: number;
  mean_score: number;
}

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

export function statusesStats(animeList: AnimeListObject[]): StatusObject[] {
  const stats: StatusObject[] = [];
  for (const status of statuses) {
    const statusStat: StatusObject = {
      status: status.name,
      count: 0,
      time_watched: 0,
      mean_score: 0,
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
    stats.push(statusStat);
  }
  return stats;
}
