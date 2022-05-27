import type { MangaListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
import sortBy from "lodash/sortBy";
import sortedUniq from "lodash/sortedUniq";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function releaseYearsStats(mangaList: MangaListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  // get all release years in list
  let releaseYearsList: number[] = [];
  mangaList.map((manga) => {
    if (manga.node.start_date) {
      releaseYearsList.push(
        parseInt(manga.node.start_date.split("-")[0] as string)
      );
    }
  });
  releaseYearsList = sortedUniq(sortBy(releaseYearsList));
  for (const releaseYear of releaseYearsList) {
    const releaseYearStat: StatArray = {
      id: releaseYear,
      name: releaseYear.toString(),
      count: 0,
      length: 0,
      mean_score: 0,
      titles: [],
    };
    const mangas = mangaList.filter(
      (manga) =>
        manga.node.start_date &&
        parseInt(manga.node.start_date.split("-")[0] as string) === releaseYear
    );
    if (mangas.length === 0) {
      continue;
    }
    // count
    releaseYearStat.count = mangas.length;
    // chapters read
    releaseYearStat.length = mangas.reduce(
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
    if (!Number.isNaN(meanScore)) releaseYearStat.mean_score = meanScore;
    // all animes with release year
    orderBy(mangas, "node.title", "asc").map((manga) =>
      releaseYearStat.titles.push(manga.node.id)
    );
    stats.push(releaseYearStat);
  }
  return stats;
}
