import type { MangaListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
import sortBy from "lodash/sortBy";
import sortedUniqBy from "lodash/sortedUniqBy";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function creatorsStats(mangaList: MangaListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  // get all unique authors in list
  let authorsList: { id: number; name: string }[] = [];
  mangaList.map((manga) => {
    if (manga.node.authors) {
      manga.node.authors.map((author) =>
        authorsList.push({
          id: author.node.id,
          name: author.node.first_name + " " + author.node.last_name,
        })
      );
    }
  });
  authorsList = sortedUniqBy(
    sortBy(authorsList, function (n) {
      return n.id;
    }),
    function (n) {
      return n.id;
    }
  );
  for (const author of authorsList) {
    const authorStat: StatArray = {
      id: author.id,
      name: author.name,
      count: 0,
      mean_score: 0,
      length: 0,
      titles: [],
    };
    const mangas = mangaList.filter(
      (manga) =>
        manga.node.authors &&
        manga.node.authors.some(
          (mangaAuthor) =>
            mangaAuthor.node.id === author.id &&
            mangaAuthor.node.first_name + " " + mangaAuthor.node.last_name ===
              author.name
        )
    );
    if (mangas.length === 0) {
      continue;
    }
    // count
    authorStat.count = mangas.length;
    // chapters read
    authorStat.length = mangas.reduce(
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
    if (!Number.isNaN(meanScore)) authorStat.mean_score = meanScore;
    // all mangas by author
    orderBy(mangas, "node.title", "asc").map((manga) =>
      authorStat.titles.push(manga.node.id)
    );
    stats.push(authorStat);
  }
  return stats;
}
