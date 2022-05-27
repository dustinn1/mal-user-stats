import type { MangaListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
import sortBy from "lodash/sortBy";
import sortedUniqBy from "lodash/sortedUniqBy";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function genresStats(mangaList: MangaListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  // get all unique genres in list
  let genresList: { id: number; name: string }[] = [];
  mangaList.map((manga) => {
    if (manga.node.genres) {
      manga.node.genres.map((genre) =>
        genresList.push({
          id: genre.id,
          name: genre.name,
        })
      );
    }
  });
  genresList = sortedUniqBy(
    sortBy(genresList, function (n) {
      return n.id;
    }),
    function (n) {
      return n.id;
    }
  );
  for (const genre of genresList) {
    const genreStat: StatArray = {
      id: genre.id,
      name: genre.name,
      count: 0,
      mean_score: 0,
      length: 0,
      titles: [],
    };
    const mangas = mangaList.filter(
      (manga) =>
        manga.node.genres &&
        manga.node.genres.some(
          (mangaGenre) =>
            mangaGenre.id === genre.id && mangaGenre.name === genre.name
        )
    );
    if (mangas.length === 0) {
      continue;
    }
    // count
    genreStat.count = mangas.length;
    // chapters read
    genreStat.length = mangas.reduce(
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
    if (!Number.isNaN(meanScore)) genreStat.mean_score = meanScore;
    // all mangas in genre
    orderBy(mangas, "node.title", "asc").map((manga) =>
      genreStat.titles.push(manga.node.id)
    );
    stats.push(genreStat);
  }
  return stats;
}
