import { authorsStats } from "./authors";
import { formatsStats } from "./formats";
import { genresStats } from "./genres";
import { scoresStats } from "./scores";
import { statusesStats } from "./statuses";
import { chaptersCountsStats } from "./chaptersCounts";
import { volumesCountsStats } from "./volumesCounts";
import { startYearsStats } from "./startYears";
import { releaseYearsStats } from "./releaseYears";
import type { MangaListObject } from "../../interfaces/fetchList";
import type { MangaStats } from "../../interfaces/mangaStats";

export function generateMangaStats(mangalist: MangaListObject[]): MangaStats {
  return {
    chapters_counts: chaptersCountsStats(mangalist),
    volumes_counts: volumesCountsStats(mangalist),
    formats: formatsStats(mangalist),
    release_years: releaseYearsStats(mangalist),
    scores: scoresStats(mangalist),
    statuses: statusesStats(mangalist),
    start_years: startYearsStats(mangalist),
    genres: genresStats(mangalist),
    authors: authorsStats(mangalist),
  };
}
