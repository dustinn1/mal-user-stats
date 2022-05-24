import type { MangaListObject } from "../../interfaces/fetchList";
import type { MangaStatArray } from "../../interfaces/mangaStats";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function scoresStats(mangaList: MangaListObject[]): MangaStatArray[] {
  const stats: MangaStatArray[] = [];
  for (let i = 0; i <= 10; i++) {
    const scoreStat: MangaStatArray = {
      id: i,
      name: i.toString(),
      count: 0,
      chapters_read: 0,
      mean_score: 0,
      mangas: [],
    };
    const mangas = mangaList.filter((manga) => manga.list_status.score === i);
    if (mangas.length === 0) {
      continue;
    }
    // count
    scoreStat.count = mangas.length;
    // chapters read
    scoreStat.chapters_read = mangas.reduce(
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
    if (!Number.isNaN(meanScore)) scoreStat.mean_score = meanScore;
    // all animes with score
    orderBy(mangas, "node.title", "asc").map((manga) =>
      scoreStat.mangas.push(manga.node.id)
    );
    stats.push(scoreStat);
  }
  return stats;
}
