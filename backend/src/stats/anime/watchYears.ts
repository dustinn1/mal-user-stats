import type { AnimeListObject } from "../../interfaces/fetchList";
import type { AnimeStatArray } from "../../interfaces/animeStats";
import sortBy from "lodash/sortBy";
import sortedUniq from "lodash/sortedUniq";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function watchYearsStats(
  animeList: AnimeListObject[]
): AnimeStatArray[] {
  const stats: AnimeStatArray[] = [];
  // get all watch years in list
  let watchYearsList: number[] = [];
  animeList.map((anime) => {
    if (anime.list_status.start_date)
      watchYearsList.push(
        parseInt(anime.list_status.start_date.split("-")[0] as string)
      );
  });
  watchYearsList = sortedUniq(sortBy(watchYearsList));
  for (const watchYear of watchYearsList) {
    const watchYearStat: AnimeStatArray = {
      id: watchYear,
      name: watchYear.toString(),
      count: 0,
      time_watched: 0,
      mean_score: 0,
      animes: [],
    };
    const animes = animeList.filter(
      (anime) =>
        anime.list_status.start_date &&
        parseInt(anime.list_status.start_date.split("-")[0] as string) ===
          watchYear
    );
    if (animes.length === 0) {
      continue;
    }
    // count
    watchYearStat.count = animes.length;
    // time watched
    watchYearStat.time_watched = animes.reduce(
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
    if (!Number.isNaN(meanScore)) watchYearStat.mean_score = meanScore;
    // all animes with watch year
    orderBy(animes, "node.title", "asc").map((anime) =>
      watchYearStat.animes.push(anime.node.id)
    );
    stats.push(watchYearStat);
  }
  return stats;
}
