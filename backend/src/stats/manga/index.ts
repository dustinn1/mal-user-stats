import { authorsStats } from "./authors";
import { formatsStats } from "./formats";
import { genresStats } from "./genres";
import { scoresStats } from "./scores";
import { statusesStats } from "./statuses";
import type { MangaListObject } from "../../interfaces/fetchList";
import type { MangaStats } from "../../interfaces/mangaStats";

export function generateMangaStats(mangalist: MangaListObject[]): MangaStats {
  return {
    formats: formatsStats(mangalist),
    scores: scoresStats(mangalist),
    statuses: statusesStats(mangalist),
    genres: genresStats(mangalist),
    authors: authorsStats(mangalist),
  };
}
