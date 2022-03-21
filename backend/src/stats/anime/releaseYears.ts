import type { AnimeListObject } from "../../interfaces/fetchList";
import sortBy from "lodash/sortBy";
import sortedUniq from "lodash/sortedUniq";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

interface ReleaseYearObject {
  year: number;
  count: number;
  time_watched: number;
  mean_score: number;
  animes: number[];
}

export function releaseYearsStats(
  animeList: AnimeListObject[]
): ReleaseYearObject[] {
  const stats: ReleaseYearObject[] = [];
  // get all release years in list
  let releaseYearsList: number[] = [];
  animeList.map((anime) =>
    releaseYearsList.push(
      anime.node.start_season
        ? anime.node.start_season.year
        : parseInt(anime.node.start_date.split("-")[0] as string)
    )
  );
  releaseYearsList = sortedUniq(sortBy(releaseYearsList));
  for (const releaseYear of releaseYearsList) {
    const releaseYearStat: ReleaseYearObject = {
      year: releaseYear,
      count: 0,
      time_watched: 0,
      mean_score: 0,
      animes: [],
    };
    const animes = animeList.filter(
      (anime) =>
        (anime.node.start_season &&
          anime.node.start_season.year === releaseYear) ||
        (anime.node.start_date &&
          parseInt(anime.node.start_date.split("-")[0] as string) ===
            releaseYear)
    );
    if (animes.length === 0) {
      continue;
    }
    // count
    releaseYearStat.count = animes.length;
    // time watched
    releaseYearStat.time_watched = animes.reduce(
      (val, anime) => val + anime.list_status.time_watched,
      0
    );
    // mean score
    const watchedFiltered = animes.filter((anime) => anime.list_status.score);
    const meanScore = round(
      watchedFiltered.reduce((val, anime) => val + anime.list_status.score, 0) /
        watchedFiltered.length,
      2
    );
    if (!Number.isNaN(meanScore)) releaseYearStat.mean_score = meanScore;
    // all animes with release year
    orderBy(animes, "node.title", "asc").map((anime) =>
      releaseYearStat.animes.push(anime.node.id)
    );
    stats.push(releaseYearStat);
  }
  return stats;
}
