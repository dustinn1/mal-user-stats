import type { MangaListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function scoresStats(mangaList: MangaListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  for (let i = 0; i <= 10; i++) {
    const scoreStat: StatArray = {
      id: i,
      name: i.toString(),
      count: 0,
      length: 0,
      mean_score: 0,
      titles: [],
    };
    const mangas = mangaList.filter((manga) => manga.list_status.score === i);
    if (mangas.length === 0) {
      continue;
    }
    // count
    scoreStat.count = mangas.length;
    // chapters read
    scoreStat.length = mangas.reduce(
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
    if (!Number.isNaN(meanScore)) scoreStat.mean_score = meanScore;
    // all animes with score
    orderBy(mangas, "node.title", "asc").map((manga) =>
      scoreStat.titles.push(manga.node.id)
    );
    stats.push(scoreStat);
  }
  return stats;
}
