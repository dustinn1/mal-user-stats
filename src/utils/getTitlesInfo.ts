import type { Anime, Manga } from "../interfaces/stats";

export function getTitlesInfo(
  titlesIds: number[],
  allTitles: { [k: string]: Anime | Manga }
): (Anime | Manga)[] {
  return titlesIds.map((id) => allTitles[id]);
}
