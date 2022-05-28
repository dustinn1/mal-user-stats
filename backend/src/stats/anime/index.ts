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
import type { AnimeStats } from "../../interfaces/stats";

export function generateAnimeStats(animelist: AnimeListObject[]): AnimeStats {
  return {
    overview: overviewStats(animelist),
    episodes_counts: episodesCountsStats(animelist),
    formats: formatsStats(animelist),
    release_years: releaseYearsStats(animelist),
    scores: scoresStats(animelist),
    statuses: statusesStats(animelist),
    start_years: startYearsStats(animelist),
    genres: genresStats(animelist),
    creators: studiosStats(animelist),
    animes: Object.fromEntries(allAnimes(animelist)),
  };
}
