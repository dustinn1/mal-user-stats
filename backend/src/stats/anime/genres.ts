import type { AnimeListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
import sortBy from "lodash/sortBy";
import sortedUniqBy from "lodash/sortedUniqBy";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function genresStats(animeList: AnimeListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  // get all unique genres in list
  let genresList: { id: number; name: string }[] = [];
  animeList.map((anime) => {
    if (anime.node.genres) {
      anime.node.genres.map((genre) =>
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
    const animes = animeList.filter(
      (anime) =>
        anime.node.genres &&
        anime.node.genres.some(
          (animeGenre) =>
            animeGenre.id === genre.id && animeGenre.name === genre.name
        )
    );
    if (animes.length === 0) {
      continue;
    }
    // count
    genreStat.count = animes.length;
    // time watched
    genreStat.length = animes.reduce(
      (val, anime) => val + anime.list_status.length,
      0
    );
    // mean score
    const watchedFiltered = animes.filter((anime) => anime.list_status.score);
    const meanScore = round(
      watchedFiltered.reduce((val, anime) => val + anime.list_status.score, 0) /
        watchedFiltered.length,
      2
    );
    if (!Number.isNaN(meanScore)) genreStat.mean_score = meanScore;
    // all animes in genre
    orderBy(animes, "node.title", "asc").map((anime) =>
      genreStat.titles.push(anime.node.id)
    );
    stats.push(genreStat);
  }
  return stats;
}
