import type { AnimeListObject } from "../../interfaces/fetchList";
import type { StatArray } from "../../interfaces/stats";
import sortBy from "lodash/sortBy";
import sortedUniq from "lodash/sortedUniq";
import round from "lodash/round";
import orderBy from "lodash/orderBy";

export function episodesCountsStats(animeList: AnimeListObject[]): StatArray[] {
  const stats: StatArray[] = [];
  // get all episode counts in list
  const episodesCountsList: number[] = sortedUniq(
    sortBy(animeList.map((anime) => anime.node.num_episodes))
  );
  for (const episodeCount of episodesCountsList) {
    const episodeCountStat: StatArray = {
      id: episodeCount,
      name: episodeCount.toString(),
      count: 0,
      length: 0,
      mean_score: 0,
      titles: [],
    };
    const animes = animeList.filter(
      (anime) => anime.node.num_episodes === episodeCount
    );
    if (animes.length === 0) {
      continue;
    }
    // count
    episodeCountStat.count = animes.length;
    // time watched
    episodeCountStat.length = animes.reduce(
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
    if (!Number.isNaN(meanScore)) episodeCountStat.mean_score = meanScore;
    // all animes with episode count
    orderBy(animes, "node.title", "asc").map((anime) =>
      episodeCountStat.titles.push(anime.node.id)
    );
    stats.push(episodeCountStat);
  }
  return stats;
}
