import type { AnimeManga } from "../interfaces/stats";

export function getTitlesInfo(
  allTitles: { [k: string]: AnimeManga },
  titlesIds?: number[]
): AnimeManga[] {
  return titlesIds
    ? titlesIds.map((id) => allTitles[id])
    : Object.values(allTitles);
}
