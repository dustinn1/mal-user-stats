import type { MangaListObject } from "../../interfaces/fetchList";
import round from "lodash/round";
import meanBy from "lodash/meanBy";

interface OverviewObject {
  total: number;
  watched_readed: number;
  length: number;
  mean_score: number;
  standard_deviation: number;
}

export function overviewStats(mangaList: MangaListObject[]): OverviewObject {
  const mangasWithScores = mangaList.filter((anime) => anime.list_status.score);
  const mean_score = round(
    mangasWithScores.reduce((val, manga) => val + manga.list_status.score, 0) /
      mangasWithScores.length,
    2
  );
  return {
    total: mangaList.length,
    watched_readed: mangaList.reduce(
      (val, anime) => val + anime.list_status.num_chapters_read,
      0
    ),
    length: 0,
    mean_score: mean_score,
    standard_deviation: round(
      Math.sqrt(
        meanBy(mangasWithScores, function (n) {
          return Math.pow(n.list_status.score - mean_score, 2);
        })
      ),
      2
    ),
  };
}
