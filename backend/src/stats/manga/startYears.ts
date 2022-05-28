import type { MangaListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
import sortBy from "lodash/sortBy";
import sortedUniq from "lodash/sortedUniq";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function startYearsStats(mangaList: MangaListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  // get all start years in list
  let startYearsList: number[] = [];
  mangaList.map((manga) => {
    if (manga.list_status.start_date)
      startYearsList.push(
        parseInt(manga.list_status.start_date.split("-")[0] as string)
      );
  });
  startYearsList = sortedUniq(sortBy(startYearsList));
  for (const startYear of startYearsList) {
    const startYearStat: StatArray = {
      id: startYear,
      name: startYear.toString(),
      count: 0,
      length: 0,
      mean_score: 0,
      titles: [],
    };
    const mangas = mangaList.filter(
      (manga) =>
        manga.list_status.start_date &&
        parseInt(manga.list_status.start_date.split("-")[0] as string) ===
          startYear
    );
    if (mangas.length === 0) {
      continue;
    }
    // count
    startYearStat.count = mangas.length;
    // chapters read
    startYearStat.length = mangas.reduce(
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
    if (!Number.isNaN(meanScore)) startYearStat.mean_score = meanScore;
    // all mangas with start year
    orderBy(mangas, "node.title", "asc").map((manga) =>
      startYearStat.titles.push(manga.node.id)
    );
    stats.push(startYearStat);
  }
  return stats;
}
