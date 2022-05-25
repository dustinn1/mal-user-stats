import type { AnimeListObject } from "../../interfaces/fetchList";
import type { AnimeStatArray } from "../../interfaces/animeStats";
import sortBy from "lodash/sortBy";
import sortedUniq from "lodash/sortedUniq";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function startWatchYearsStats(
  animeList: AnimeListObject[]
): AnimeStatArray[] {
  const stats: AnimeStatArray[] = [];
  // get all start watch years in list
  let startWatchYearsList: number[] = [];
  animeList.map((anime) => {
    if (anime.list_status.start_date)
      startWatchYearsList.push(
        parseInt(anime.list_status.start_date.split("-")[0] as string)
      );
  });
  startWatchYearsList = sortedUniq(sortBy(startWatchYearsList));
  for (const startWatchYear of startWatchYearsList) {
    const startWatchYearstat: AnimeStatArray = {
      id: startWatchYear,
      name: startWatchYear.toString(),
      count: 0,
      time_watched: 0,
      mean_score: 0,
      animes: [],
    };
    const animes = animeList.filter(
      (anime) =>
        anime.list_status.start_date &&
        parseInt(anime.list_status.start_date.split("-")[0] as string) ===
          startWatchYear
    );
    if (animes.length === 0) {
      continue;
    }
    // count
    startWatchYearstat.count = animes.length;
    // time watched
    startWatchYearstat.time_watched = animes.reduce(
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
    if (!Number.isNaN(meanScore)) startWatchYearstat.mean_score = meanScore;
    // all animes with start watch year
    orderBy(animes, "node.title", "asc").map((anime) =>
      startWatchYearstat.animes.push(anime.node.id)
    );
    stats.push(startWatchYearstat);
  }
  return stats;
}
