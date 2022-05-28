import type { MangaListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

const formats = [
  {
    id: "manga",
    name: "Manga",
  },
  {
    id: "light_novel",
    name: "Light Novel",
  },
  {
    id: "novel",
    name: "Novel",
  },
  {
    id: "one_shot",
    name: "One Shot",
  },
  {
    id: "doujinshi",
    name: "Doujinshi",
  },
  {
    id: "manhwa",
    name: "Manhwa",
  },
  {
    id: "manhua",
    name: "Manhua",
  },
  {
    id: "oel",
    name: "OEL",
  },
  {
    id: "unknown",
    name: "Unknown",
  },
];

export function formatsStats(mangaList: MangaListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  for (const format of formats) {
    const formatStat: StatArray = {
      id: format.id,
      name: format.name,
      count: 0,
      length: 0,
      mean_score: 0,
      titles: [],
    };
    const mangas = mangaList.filter(
      (manga) => manga.node.media_type == format.id
    );
    if (mangas.length === 0) {
      continue;
    }
    // count
    formatStat.count = mangas.length;
    // chapters read
    formatStat.length = mangas.reduce(
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
    if (!Number.isNaN(meanScore)) formatStat.mean_score = meanScore;
    // all mangas with format
    orderBy(mangas, "node.title", "asc").map((manga) =>
      formatStat.titles.push(manga.node.id)
    );
    stats.push(formatStat);
  }
  return stats;
}
