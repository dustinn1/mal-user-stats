import { creatorsStats } from "./creators";
import { formatsStats } from "./formats";
import { genresStats } from "./genres";
import { scoresStats } from "./scores";
import { statusesStats } from "./statuses";
import { chaptersCountsStats } from "./chaptersCounts";
import { startYearsStats } from "./startYears";
import { releaseYearsStats } from "./releaseYears";
import { allMangas } from "./allMangas";
import type { MangaListObject } from "../../interfaces/fetchList";
import type { Stats } from "../../interfaces/stats";
import { overviewStats } from "./overview";

export function generateMangaStats(mangalist: MangaListObject[]): Stats {
  return {
    overview: overviewStats(mangalist),
    counts: chaptersCountsStats(mangalist),
    formats: formatsStats(mangalist),
    release_years: releaseYearsStats(mangalist),
    scores: scoresStats(mangalist),
    statuses: statusesStats(mangalist),
    start_years: startYearsStats(mangalist),
    genres: genresStats(mangalist),
    creators: creatorsStats(mangalist),
    titles: Object.fromEntries(allMangas(mangalist)),
  };
}
