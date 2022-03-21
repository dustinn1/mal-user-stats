import { allAnimes } from "./allAnimes";
import { episodesCountsStats } from "./episodesCounts";
import { formatsStats } from "./formats";
import { genresStats } from "./genres";
import { overviewStats } from "./overview";
import { releaseYearsStats } from "./releaseYears";
import { scoresStats } from "./scores";
import { statusesStats } from "./statuses";
import { studiosStats } from "./studios";
import { watchYearsStats } from "./watchYears";
import type { AnimeListObject } from "../../interfaces/fetchList";
import type { AnimeStats } from "../../interfaces/animeStats";

export function generateAnimeStats(animelist: AnimeListObject[]): AnimeStats {
  return {
    overview: overviewStats(animelist),
    episodes_counts: episodesCountsStats(animelist),
    formats: formatsStats(animelist),
    release_years: releaseYearsStats(animelist),
    scores: scoresStats(animelist),
    statuses: statusesStats(animelist),
    watch_years: watchYearsStats(animelist),
    genres: genresStats(animelist),
    studios: studiosStats(animelist),
    animes: allAnimes(animelist),
  };
}
