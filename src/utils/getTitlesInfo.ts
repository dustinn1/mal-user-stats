import type { AnimeManga } from "../interfaces/stats";

export function getTitlesInfo(
  titlesIds: number[],
  allTitles: { [k: string]: AnimeManga }
): AnimeManga[] {
  return titlesIds.map((id) => allTitles[id]);
}
