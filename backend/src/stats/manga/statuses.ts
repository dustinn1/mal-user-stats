import type { MangaListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
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

export function statusesStats(mangaList: MangaListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  for (const status of statuses) {
    const statusStat: StatArray = {
      id: status.id,
      name: status.name,
      count: 0,
      length: 0,
      mean_score: 0,
      titles: [],
    };
    const mangas = mangaList.filter(
      (manga) => manga.list_status.status == status.id
    );
    if (mangas.length === 0) {
      continue;
    }
    // count
    statusStat.count = mangas.length;
    // chapters read
    statusStat.length = mangas.reduce(
      (val, manga) => val + manga.list_status.num_chapters_read,
      0
    );
    // mean score
    const watchedFiltered = mangas.filter((manga) => manga.list_status.score);
    const meanScore = round(
      watchedFiltered.reduce((val, manga) => val + manga.list_status.score, 0) /
        watchedFiltered.length,
      2
    );
    if (!Number.isNaN(meanScore)) statusStat.mean_score = meanScore;
    // all mangas with status
    orderBy(mangas, "node.title", "asc").map((manga) =>
      statusStat.titles.push(manga.node.id)
    );
    stats.push(statusStat);
  }
  return stats;
}
