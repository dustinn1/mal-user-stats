import type { MangaListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
import sortBy from "lodash/sortBy";
import sortedUniq from "lodash/sortedUniq";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function volumesCountsStats(mangaList: MangaListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  // get all volume counts in list
  const volumesCountsList: number[] = sortedUniq(
    sortBy(mangaList.map((manga) => manga.node.num_volumes))
  );
  for (const volumeCount of volumesCountsList) {
    const volumeCountStat: StatArray = {
      id: volumeCount,
      name: volumeCount.toString(),
      count: 0,
      length: 0,
      mean_score: 0,
      titles: [],
    };
    const mangas = mangaList.filter(
      (manga) => manga.node.num_volumes === volumeCount
    );
    if (mangas.length === 0) {
      continue;
    }
    // count
    volumeCountStat.count = mangas.length;
    // chapters read
    volumeCountStat.length = mangas.reduce(
      (val, manga) => val + manga.list_status.num_length,
      0
    );
    // mean score
    const watchedFiltered = mangas.filter((manga) => manga.list_status.score);
    const meanScore = round(
      watchedFiltered.reduce((val, manga) => val + manga.list_status.score, 0) /
        watchedFiltered.length,
      2
    );
    if (!Number.isNaN(meanScore)) volumeCountStat.mean_score = meanScore;
    // all mangas with volume count
    orderBy(mangas, "node.title", "asc").map((manga) =>
      volumeCountStat.titles.push(manga.node.id)
    );
    stats.push(volumeCountStat);
  }
  return stats;
}
