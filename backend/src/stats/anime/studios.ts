import type { AnimeListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
import sortBy from "lodash/sortBy";
import sortedUniqBy from "lodash/sortedUniqBy";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function studiosStats(animeList: AnimeListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  // get all unique studios in list
  let studiosList: { id: number; name: string }[] = [];
  animeList.map((anime) => {
    if (anime.node.studios) {
      anime.node.studios.map((studio) =>
        studiosList.push({
          id: studio.id,
          name: studio.name,
        })
      );
    }
  });
  studiosList = sortedUniqBy(
    sortBy(studiosList, function (n) {
      return n.id;
    }),
    function (n) {
      return n.id;
    }
  );
  for (const studio of studiosList) {
    const studioStat: StatArray = {
      id: studio.id,
      name: studio.name,
      count: 0,
      mean_score: 0,
      length: 0,
      titles: [],
    };
    const animes = animeList.filter(
      (anime) =>
        anime.node.studios &&
        anime.node.studios.some(
          (animeStudio) =>
            animeStudio.id === studio.id && animeStudio.name === studio.name
        )
    );
    if (animes.length === 0) {
      continue;
    }
    // count
    studioStat.count = animes.length;
    // time watched
    studioStat.length = animes.reduce(
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
    if (!Number.isNaN(meanScore)) studioStat.mean_score = meanScore;
    // all animes in studio
    orderBy(animes, "node.title", "asc").map((anime) =>
      studioStat.titles.push(anime.node.id)
    );
    stats.push(studioStat);
  }
  return stats;
}
