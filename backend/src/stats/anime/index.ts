import { allAnimes } from "./allAnimes";
import { episodesCountsStats } from "./episodesCounts";
import { formatsStats } from "./formats";
import { genresStats } from "./genres";
import { overviewStats } from "./overview";
import { releaseYearsStats } from "./releaseYears";
import { scoresStats } from "./scores";
import { statusesStats } from "./statuses";
import { studiosStats } from "./studios";
import { startYearsStats } from "./startYears";
import type { AnimeListObject } from "../../interfaces/fetchList";
import type { Stats } from "../../interfaces/stats";

export function generateAnimeStats(animelist: AnimeListObject[]): Stats {
  return {
    overview: overviewStats(animelist),
    counts: episodesCountsStats(animelist),
    formats: formatsStats(animelist),
    release_years: releaseYearsStats(animelist),
    scores: scoresStats(animelist),
    statuses: statusesStats(animelist),
    start_years: startYearsStats(animelist),
    genres: genresStats(animelist),
    creators: studiosStats(animelist),
    titles: Object.fromEntries(allAnimes(animelist)),
  };
}
