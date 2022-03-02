import type { AnimeListObject } from "../../interfaces/fetchList";
import sortBy from "lodash/sortBy";
import sortedUniqBy from "lodash/sortedUniqBy";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

interface StudioObject {
  id: number;
  name: string;
  count: number;
  mean_score: number;
  time_watched: number;
  animes: number[];
}

export function studiosStats(animeList: AnimeListObject[]): StudioObject[] {
  const stats: StudioObject[] = [];
  // get all unique studios in list
  let studiosList: { id: number; name: string }[] = [];
  animeList.map((anime) =>
    anime.node.studios.map((studio) =>
      studiosList.push({
        id: studio.id,
        name: studio.name,
      })
    )
  );
  studiosList = sortedUniqBy(
    sortBy(studiosList, function (n) {
      return n.id;
    }),
    function (n) {
      return n.id;
    }
  );
  for (const studio of studiosList) {
    const studioStat: StudioObject = {
      id: studio.id,
      name: studio.name,
      count: 0,
      mean_score: 0,
      time_watched: 0,
      animes: [],
    };
    const animes = animeList.filter((anime) =>
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
    studioStat.time_watched = animes.reduce(
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
    if (!Number.isNaN(meanScore)) studioStat.mean_score = meanScore;
    // all animes in studio
    orderBy(animes, "node.title", "asc").map((anime) =>
      studioStat.animes.push(anime.node.id)
    );
    stats.push(studioStat);
  }
  return stats;
}
