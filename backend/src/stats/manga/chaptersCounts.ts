import type { MangaListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
import sortBy from "lodash/sortBy";
import sortedUniq from "lodash/sortedUniq";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function chaptersCountsStats(mangaList: MangaListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  // get all chapter counts in list
  const chaptersCountsList: number[] = sortedUniq(
    sortBy(mangaList.map((manga) => manga.node.num_chapters))
  );
  for (const chapterCount of chaptersCountsList) {
    const chapterCountStat: StatArray = {
      id: chapterCount,
      name: chapterCount.toString(),
      count: 0,
      length: 0,
      mean_score: 0,
      titles: [],
    };
    const mangas = mangaList.filter(
      (manga) => manga.node.num_chapters === chapterCount
    );
    if (mangas.length === 0) {
      continue;
    }
    // count
    chapterCountStat.count = mangas.length;
    // chapters read
    chapterCountStat.length = mangas.reduce(
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
    if (!Number.isNaN(meanScore)) chapterCountStat.mean_score = meanScore;
    // all mangas with chapter count
    orderBy(mangas, "node.title", "asc").map((manga) =>
      chapterCountStat.titles.push(manga.node.id)
    );
    stats.push(chapterCountStat);
  }
  return stats;
}
